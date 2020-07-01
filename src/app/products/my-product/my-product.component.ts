import { Component, OnInit , OnDestroy } from '@angular/core';
import { BackendApiService } from '../../services/backend-api/backend-api.service' ;
import { ProfileService } from '../../profile/profile.service' ;  // new
import { Subscription , BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from "@angular/router";



@Component({
  selector: 'app-my-product',
  templateUrl: './my-product.component.html',
  styleUrls: ['./my-product.component.css']
})
export class MyProductComponent implements OnInit , OnDestroy {
// vars
productList : any =[];
// unsubscribeProduct : Subscription ;
productSearchName = '';

categoryList : any =[];
unsubscribeCategory : Subscription ;

cateId : number = null ;
currentStock :boolean = null;
userId : number = null ;

 //new
 current_user: any;
 
 fullname: string;
 // new 

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
      this.userId = parseInt(this.current_user.id, 10) ;  // new
      this.refreshProductList();
      console.log(this.userId)
    }
  )
  // list products
  
  // this.unsubscribeProduct = this.backendApi.findByProductSupplier(this.userId).subscribe((data:[])=>{
  //   this.productList = data ;
  //   this.refreshProductList();
  //   console.log(data)
  //   console.log(this.productList)
  // })
  
  // list categories
  this.unsubscribeCategory = this.backendApi.getAllCategory().subscribe((data:[])=>{
    this.categoryList = data ;
    console.log(data)
    console.log(this.categoryList)
  })

}

ngOnDestroy(): void {
  // this.unsubscribeProduct.unsubscribe() ;
  this.unsubscribeCategory.unsubscribe() ;
}

refreshProductList() {
  if (this.userId === null){
    // debugger ;
    // this.refreshProductList();
  }
  else{
    this.backendApi.findByProductSupplier(this.userId,'',null,null)
     .subscribe(
      data => {
        this.productList = data;
        console.log(data);
        console.log(this.productList);
      },
      error => {
        console.log(error);
        console.log(this.current_user.id)
        console.log(this.userId)
        
      });
  }
  
   this.productSearchName = '';
}

searchProduct() {
  this.backendApi.findByProductSupplier(this.userId,this.productSearchName,this.currentStock,this.cateId)
  .subscribe(
    data => {
      this.productList = data;
      console.log(data);
    },
    error => {
      console.log(error);
    });
      
} 

setActiveCategory(cateId) {
  this.productSearchName = '';
  if(cateId !== "null"){
    console.log("true")
    console.log(cateId)
    this.cateId = +cateId;
    // this.getOneCategory(id);      
  }
  else{
    console.log("false")
    this.cateId = null ;
  }
  console.log(cateId)
  console.log(this.cateId)
  
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
    this.backendApi.findByProductSupplier(this.userId,this.productSearchName,this.currentStock,this.cateId )
    .subscribe(
      data => {
        this.productList = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
    this.productSearchName = '';
  }

}

setActiveStock(availablity) {
  this.productSearchName = '';
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
    this.backendApi.findByProductSupplier(this.userId,this.productSearchName, availablity , this.cateId)
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
    this.router.navigate(['/myProduct']);
  }); 
}

}
