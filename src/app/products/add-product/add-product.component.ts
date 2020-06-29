import { Component, OnInit , OnDestroy } from '@angular/core';
import { BackendApiService } from '../../services/backend-api/backend-api.service' ;
import { Subscription , BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from "@angular/router";

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

  constructor(public backendApi : BackendApiService , private  route: ActivatedRoute,
    private  router: Router) { }

  ngOnInit(): void {
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
      this.productInterface.supplier = 1 ;
      const fd = new FormData ;
      if (this.productInterface.photo !== null){fd.append('photo', this.productInterface.photo,this.productInterface.photo.name)
    }
      if (this.productInterface.desc !== ""){fd.append('desc',this.productInterface.desc)}
      fd.append('name',this.productInterface.name)
      fd.append('quantity',this.productInterface.quantity)
      fd.append('price',this.productInterface.price)
      // fd.append('created_date',this.productInterface.created_date)
      fd.append('in_stock',this.productInterface.in_stock)
      fd.append('supplier',this.productInterface.supplier)
      fd.append('category',this.productInterface.category)
     
      console.log(fd)
      this.backendApi.createProduct(fd)
        .subscribe(
          response => {
            console.log(response);
            this.submittedProduct = true;
            // this.router.navigate(['/api-service']);
            // this.refreshCategoryList();
            // this.refreshProductList();
          },
          error => {
            console.log(error);
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
    } 

    // End Creating Product 

}
