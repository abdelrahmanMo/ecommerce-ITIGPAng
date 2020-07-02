import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CartService } from 'src/app/services/backend-api/cart.service';
import { ProfileService } from 'src/app/profile/profile.service';
import { CartItem } from '../../shared/cart/cartItem.modal'

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  public cartitemlist:any=[]
  public TotalPrice = 0;
  constructor(private cartservice:CartService,
    private profile:ProfileService) { }

  ngOnInit(): void {

      
  this.profile.getCurrentUser().subscribe(
    user =>{
     
      this.cartservice.getunorderdCartByuser(user['id']).subscribe(
        cart => {
          this.cartservice.getCartItem(cart[0]['id']).subscribe(
            itemlist =>{
              this.cartitemlist = itemlist;
              this.getTotalPrice();
              console.log(this.TotalPrice)
            }
          )
        }
      )
    }
  )

  }

 getTotalPrice() {
  this.cartitemlist.forEach(element => {
    this.TotalPrice +=  +element['proOrderdPrice']
 }); 
}


}
