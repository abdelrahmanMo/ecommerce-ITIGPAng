import { Component, OnInit , OnDestroy } from '@angular/core';
import { BackendApiService } from '../../services/backend-api/backend-api.service' ;
import { ProfileService } from '../../profile/profile.service' ;  // new
import { Subscription , BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from "@angular/router";

import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit ,OnDestroy {


  categoryList : any =[];
  unsubscribeCategory : Subscription ;

  productInterface = {
    name: '',
    desc : '',
    quantity : null,
    photo : null ,
    price : null ,
    in_stock : null ,
    supplier : null  ,
    category : null
   };
  submittedProduct = false;


  //new
  current_user: any;
  fullname: string;
  // new 


   // new imgs
   images  : any = [];
   imgList : any = [];
   coverView : any = null; 

   productId : any;
  //  productImgsForm = new FormGroup  ;
  //  ({
  //   product: new FormControl(2, [Validators.required]),
  //   file: new FormControl('', [Validators.required]),
  //   fileSource: new FormControl('', [Validators.required])
  // });
   // end new 
  constructor(public backendApi : BackendApiService ,private profileService: ProfileService, private  route: ActivatedRoute,
    private  router: Router) { } //new

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
    // list categories
    this.unsubscribeCategory = this.backendApi.getAllCategory().subscribe((data:[])=>{
      this.categoryList = data ;
      console.log(data)
      console.log(this.categoryList)
      })
    
}

ngOnDestroy(): void {
  this.unsubscribeCategory.unsubscribe() ;
}
  
    // creating Product
    onImgChanged(event : any ){
      this.productInterface.photo = event.target.files[0] ;
      // new
      let reader = new FileReader();
      reader.onload = (event:any) => {
        console.log(event.target.result);
        this.coverView=event.target.result; 
      }
      reader.readAsDataURL(event.target.files[0]);
      // new
    }

    saveProduct() {
     
      // const data = {
      //   name : this.productInterface.name,
      //   desc: this.productInterface.desc ,
      //   quantity : this.productInterface.quantity,
      //   // photo : this.productInterface.photo ,
      //   price : this.productInterface.price,
      //   created_date : this.productInterface.created_date,
      //   in_stock : this.productInterface.in_stock,
      //   supplier : 1,
      //   category : this.productInterface.category
      // };
      this.productInterface.supplier = this.current_user.id ; // need to modify 

      const fd = new FormData ;
      if (this.productInterface.photo !== null){fd.append('photo', this.productInterface.photo,this.productInterface.photo.name)
    }
      if (this.productInterface.desc !== ""){fd.append('desc',this.productInterface.desc)}
      fd.append('name',this.productInterface.name)
      fd.append('quantity',this.productInterface.quantity)
      fd.append('price',this.productInterface.price)
      // fd.append('created_date',this.productInterface.created_date)
      if(this.productInterface.photo !== null){fd.append('in_stock',this.productInterface.in_stock)}
      
      fd.append('supplier',this.productInterface.supplier)
      fd.append('category',this.productInterface.category)
     
      console.log(fd)
      this.backendApi.createProduct(fd)
        .subscribe(
          response => {
            console.log(JSON.parse(JSON.stringify(response)).id);
            this.productId = JSON.parse(JSON.stringify(response)).id ;
            this.newProductImgs() ;
            this.submittedProduct = true;
            // this.router.navigate(['/api-service']);
            // this.refreshCategoryList();
            // this.refreshProductList();
          },
          error => {
            console.log(error);
            alert("( InValid-Input ) Please Try Again ... ")
          });
    }
  
    newProduct() {
      this.submittedProduct = false;
      this.productInterface = {
        name: '',
        desc : '',
        quantity :null ,
        photo : null ,
        price : null,
        // created_date : '',
        in_stock : null,
        supplier : null ,
        category : null
      };
      this.imgList = [] ;
      this.coverView =null ;
    } 

    // End Creating Product 
    //Product Imgs Create 
         
    onProductImgChange(event) {
      this.images = [] ;
      this.imgList = [] ;
      if (event.target.files && event.target.files[0]) {
          var filesAmount = event.target.files.length;
          for (let i = 0; i < filesAmount; i++) {
            this.images.push(event.target.files[i])
            var reader = new FileReader();
   
            reader.onload = (event:any) => {
              console.log(event.target.result);
               this.imgList.push(event.target.result); 
            }
            reader.readAsDataURL(event.target.files[i]);
          }
      }
    }
      
    newProductImgs(){
      const productImgsForm = new FormData  ;
      // this.productId = 1;
      for (let i = 0; i < this.images.length; i++) {
        productImgsForm.append('product', this.productId)
        productImgsForm.append('photos',this.images[i])
        console.log(productImgsForm);
        this.backendApi.createProductImg(productImgsForm)
          .subscribe(res => {
            console.log(res);
            console.log('Uploaded Successfully.');
            productImgsForm.delete('product')
            productImgsForm.delete('photos')
          },
          error => {
            console.log(error);
            productImgsForm.delete('product')
            productImgsForm.delete('photos')
          });
          
      }
    }

}