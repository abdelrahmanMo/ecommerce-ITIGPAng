
import { Component, OnInit , OnDestroy } from '@angular/core';
import { BackendApiService } from '../../services/backend-api/backend-api.service' ;
import { Subscription , BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit , OnDestroy{
// vars
productList : any =[];
unsubscribeProduct : Subscription ;
productSearchName = '';

categoryList : any =[];
unsubscribeCategory : Subscription ;

cateId : number = null ;
currentStock :boolean = null;


 

constructor(public backendApi : BackendApiService , private  route: ActivatedRoute,
private  router: Router) { }


ngOnInit(): void {
  // list products
  this.unsubscribeProduct = this.backendApi.getAllProduct().subscribe((data:[])=>{
    this.productList = data ;
    // console.log(data)             //modify comment
    // console.log(this.productList)    //modify comment
  })
  // list categories
  this.unsubscribeCategory = this.backendApi.getAllCategory().subscribe((data:[])=>{
    this.categoryList = data ;
    // console.log(data)             //modify comment
    // console.log(this.categoryList) //modify comment
  })
}

ngOnDestroy(): void {
  this.unsubscribeProduct.unsubscribe() ;
  this.unsubscribeCategory.unsubscribe() ;
}

refreshProductList() {
  this.backendApi.getAllProduct()
  .subscribe(
    data => {
      this.productList = data;
      // console.log(data);  //modify comment
      // console.log(this.productList);     //modify comment
    },
    error => {
      console.log(error);
    });
   this.productSearchName = '';
}

searchProduct() {
  this.backendApi.findByProduct(this.productSearchName,this.currentStock,this.cateId)
  .subscribe(
    data => {
      this.productList = data;
      // console.log(data);        //modify comment
    },
    error => {
      console.log(error);
    });
      
} 

setActiveCategory(cateId) {
  // console.log(this.currentStock)    //modify comment
  if(cateId !== "null"){
    // console.log("true")       //modify comment
    // console.log(cateId)        //modify comment
    this.cateId = +cateId;
    // this.getOneCategory(id);      
  }
  else{
    // console.log("false")          //modify comment
    this.cateId = null ;
  }
  // console.log(cateId)             //modify comment
  // console.log(this.cateId)        //modify comment
  
  if(this.cateId === null){
    this.productSearchName = '';
    if (this.currentStock === null){
      this.refreshProductList() ;
    }
    else{
      this.setActiveStock(this.currentStock) ; 
    }
  }
  else{
    this.backendApi.findByProductCategory(this.cateId , this.currentStock)
    .subscribe(
      data => {
        this.productList = data;
        // console.log(data);         //modify comment
        // console.log(this.cateId)    //modify comment
        // console.log(this.currentStock)  //modify comment

      },
      error => {
        console.log(error);
      });
    this.productSearchName = '';
  }

}

setActiveStock(availablity) {
  
  this.currentStock =availablity ;
  if (this.currentStock === null){
    this.productSearchName = '';
    if (this.cateId === null){
      this.refreshProductList() ;
    }
    else{
      this.setActiveCategory(this.cateId) ; 
    }
  }
  else{
    this.backendApi.findByProductStock(availablity , this.cateId)
    .subscribe(
      data => {
        this.productList = data;
      },
      error => {
        console.log(error);
      });
    this.productSearchName = '';
  }
  
}

refreshPage(){
  // this.router.navigate(['/productList']);
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate(['/products']);
  }); 
}

}
