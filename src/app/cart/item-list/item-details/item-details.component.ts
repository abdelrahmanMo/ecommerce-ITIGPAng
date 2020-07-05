import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { CartService } from 'src/app/services/backend-api/cart.service';
import { ProfileService } from 'src/app/profile/profile.service';
import { BackendApiService } from 'src/app/services/backend-api/backend-api.service';
import { Routes, Router } from '@angular/router';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
  popoverTitle = 'Remove Item';
  popoverMessage = 'Are you sure you want to Remove this item ?';
  confirmClicked = false;
  cancelClicked = false;
  
  @Input() itemDetail;
  public productitem:any = {'name':''};
  constructor(private product:BackendApiService,
    private cartservice:CartService,
    private router:Router) { }

  ngOnInit(): void {

    this.product.getOneProduct(this.itemDetail.product).subscribe(
      pro => {this.productitem = pro; }
    )
  }
  removeConfirem(){
    console.log(this.itemDetail.id);  
    this.cartservice.removeCartItem(this.itemDetail.id).subscribe(
      remove=>{
        this.product.getOneProduct(this.itemDetail.product).subscribe(
          product =>{
            console.log(product);
        const newQuantity = (+product['quantity']) + (this.itemDetail.quantatiy);
        console.log("helllp")
        console.log(newQuantity)
        console.log("newQuantity")
        console.log(+product['quantity']);
        const newStock = +product['quantity'] == 0? false : true;
        const newProduct = {
        name: product['name'],
        quantity: newQuantity,
        price: product['price'],
        in_stock: newStock,
        supplier: product['supplier'],
        category: product['category'],
        desc: product['desc'],
        created_date: product['created_date'],
      };
    this.product.updateProduct(this.itemDetail.product,newProduct).subscribe(
      update => {
        console.log(update);
        this.refreshPage();
      }
    )      
    
    }
        )
      }
    );
    

}
refreshPage(){
  // this.router.navigate(['/productList']);
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate(['/cart']);
  }); 
}
}
