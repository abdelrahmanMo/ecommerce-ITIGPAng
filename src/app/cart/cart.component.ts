import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef,BsModalService } from 'ngx-bootstrap/modal'
import { ToastrService } from 'ngx-toastr';
import { NotificationToastService } from '../shared/notification-toast.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private notification:NotificationToastService) { }

  ngOnInit(): void {
  }
  showToaster(){
    this.notification.showInfo('well don','success')
  }
}
