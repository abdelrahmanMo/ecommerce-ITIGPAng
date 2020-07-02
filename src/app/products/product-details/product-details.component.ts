import { Component, OnInit , OnDestroy } from '@angular/core';
import { BackendApiService } from '../../services/backend-api/backend-api.service' ;
import { ProfileService } from '../../profile/profile.service' ;  // new
import { Subscription , BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit , OnDestroy {
  submittedProduct : boolean = false ;
  unsubscribeProduct : Subscription ;
  productInterface : any = {};
  productId : number ;
  message : string = '' ;
  updatedImg = false ;

  unsubscribeCategory : Subscription ;
  categoryList : any =[];

  imgList : any =[] ; 

  categoryInterface : any = {};
  supplierInterface : any = {};
  supplierName : string = null ;

  //new
  current_user: any;
  fullname: string;
  // new 

  constructor(public backendApi : BackendApiService ,private profileService: ProfileService, private  route: ActivatedRoute,
    private  router: Router) { }

  ngOnInit(): void {
    if(!localStorage.getItem('id')){
      this.router.navigate(["/login"]);
    }    
    this.profileService.getCurrentUser().subscribe(
      response => {
        this.current_user = response;
        this.fullname = this.current_user['user']['first_name'] + " " + this.current_user['user']['last_name']
        console.log(this.current_user)   // new
      }
    )

    this.unsubscribeProduct = this.route.params.subscribe(data => { this.productId = parseInt(data['id'], 10); 
        console.log(data['id'])
      });
    this.unsubscribeCategory = this.backendApi.getAllCategory().subscribe((data:[])=>{
        this.categoryList = data ;
      });
    this.getOneProduct(this.productId)  
  }

  ngOnDestroy(): void {
    this.unsubscribeProduct.unsubscribe() ;
    this.unsubscribeCategory.unsubscribe() ;
  }

  getOneProduct(id) {
    this.backendApi.getOneProduct(id)
      .subscribe(
        data => {
          this.productInterface = data;
          console.log(data);
          console.log(this.productInterface.photo);
          this.getOneCategory(this.productInterface.category)
          this.getOneSupplier(this.productInterface.supplier)
        },
        error => {
          console.log(this.productInterface);
          console.log(error);
        });
    this.backendApi.findByProductImgs(id)
      .subscribe(
        data => {
          this.imgList = data;
          console.log(data);
          // console.log(data[0].photos)
          // console.log(this.imgList[0].id)
        },
        error => {
          console.log(error);
        });
    // this.imgList = [{m:'m'}]
    console.log(this.imgList)
  }

  deleteProduct() {
    this.backendApi.deleteProduct(this.productInterface.id)
      .subscribe(
        response => {
          console.log(this.productInterface.id);
          console.log(this.productInterface);
          console.log(response);
          alert("The Product was deleted successfully!")
          this.router.navigate(['/products']);
        },
        error => {
          console.log(this.productInterface.id);
          console.log(error);
        });
  }

  onImgChanged(event : any ){
    this.productInterface.photo = event.target.files[0] ;
    this.updatedImg = true ;
  }

  updateProduct() { 
    this.productInterface.supplier = this.current_user.id ;
    const fd = new FormData ;

      if (this.updatedImg === true){fd.append('photo', this.productInterface.photo,this.productInterface.photo.name)
    }
      if (this.productInterface.desc !== ""){fd.append('desc',this.productInterface.desc)}
      fd.append('name',this.productInterface.name)
      fd.append('quantity',this.productInterface.quantity)
      fd.append('price',this.productInterface.price)
      // fd.append('created_date',this.productInterface.created_date)
      fd.append('in_stock',this.productInterface.in_stock)
      fd.append('supplier',this.productInterface.supplier)
      fd.append('category',this.productInterface.category)

    this.backendApi.updateProduct(this.productInterface.id, fd)
      .subscribe(
        response => {
          console.log(response);
          alert('The Product was updated successfully!')
          this.message = 'The Product was updated successfully!';
          this.submittedProduct = false ;
        },
        error => {
          console.log(error);
        });
  }

  editProduct(){
    if (this.current_user.id === this.productInterface.supplier){
      this.submittedProduct = true ;
    }
    else{
      alert(this.fullname + "has No-Permition to Edit this Product")
    }
    
  }

  getOneCategory(id){
    this.backendApi.getOneCategory(id)
      .subscribe(
        data => {
          this.categoryInterface = data;
          console.log(data);
          console.log(this.categoryInterface.name);

        },
        error => {
          console.log(this.categoryInterface);
          console.log(error);
        });
  }
  getOneSupplier(id){
    this.backendApi.getOneSupplier(id)
      .subscribe(
        data => {
          this.supplierInterface = data;
          this.supplierName = this.supplierInterface['user']['first_name'] + " " + this.supplierInterface['user']['last_name']
          console.log(data);
          console.log(this.supplierName);

        },
        error => {
          console.log(this.supplierInterface);
          console.log(error);
        });
  }
}
