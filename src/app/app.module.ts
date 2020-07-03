
import { NgModule } from '@angular/core';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductItemComponent } from './products/product-list/product-item/product-item.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './footer/footer.component';
import { CartComponent } from './cart/cart.component';

import { OrderComponent } from './order/order.component';
import { ItemListComponent } from './cart/item-list/item-list.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { MyProductComponent } from './products/my-product/my-product.component';
import { ItemDetailsComponent } from './cart/item-list/item-details/item-details.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component'
import { CartService } from './services/backend-api/cart.service';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ModalModule} from 'ngx-bootstrap/modal'
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertModule } from 'ngx-bootstrap/alert';
@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductListComponent,
    ProductItemComponent,
    ProductDetailsComponent,
    MyProductComponent,
 
    HeaderComponent,
    FooterComponent,
    CartComponent,
    OrderComponent,
    ItemListComponent,
    ItemDetailsComponent,
    SignupComponent,
    LoginComponent,
    AddProductComponent,
    ProfileComponent,
   
    
  ],
  imports: [
   
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule, 
    CommonModule,
    BrowserAnimationsModule,
    NgbModalModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 10000,
      preventDuplicates: true,
   
    }),
     ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger', // set defaults here
    }),

  ],
  providers: [CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
