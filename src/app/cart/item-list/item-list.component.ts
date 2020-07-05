import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { CartService } from 'src/app/services/backend-api/cart.service';
import { ProfileService } from 'src/app/profile/profile.service';
import { CartItem } from '../../shared/cart/cartItem.modal'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NotificationToastService } from 'src/app/shared/notification-toast.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  modalRef: BsModalRef;
  public cartitemlist:any=[]
  public TotalPrice = 0;
  public cartId = 0;
  public userId=0;
  constructor(private cartservice:CartService,
    private profile:ProfileService,
    private modalService: BsModalService,
    private notitfication: NotificationToastService,
    private router: Router) { }

  ngOnInit(): void {

      
  this.profile.getCurrentUser().subscribe(
    user =>{
      this.userId = user['id'];
      this.cartservice.getunorderdCartByuser(user['id']).subscribe(
        cart => {
          this.cartId = cart[0]['id'];
          this.cartservice.getCartItem(cart[0]['id']).subscribe(
            itemlist =>{
              this.cartitemlist = itemlist;
              this.getTotalPrice();
            
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

openModal(template: TemplateRef<any>) {
  console.log(template);
  this.modalRef = this.modalService.show(template);
}
confirmOrder(ship_To){
  const address = ship_To.value
  const newOrder = {
    'ship_To':address,
    'totalPrice':this.TotalPrice,
    'cart':this.cartId,
    'user':this.userId
  }
  const newcart = {
    'user':this.userId,
    'orderd':true
  }
  if(address == ""){
    this.notitfication.showError("please enter Adress to Ship To ","order Canceld");
  }
  else{
    this.cartservice.createOrder(JSON.parse(JSON.stringify(newOrder))).subscribe(
      order =>{
        this.notitfication.showSuccess('Order Will send to you as soon as possible','success order');
        this.modalRef.hide();
        this.cartservice.updateCart(this.cartId,JSON.parse(JSON.stringify(newcart))).subscribe(
          cart =>{
            this.router.navigate(['/products'])
           
          }
            
        )
      }
    )
  }

console.log(ship_To.value);
console.log(this.cartId);

}

}
