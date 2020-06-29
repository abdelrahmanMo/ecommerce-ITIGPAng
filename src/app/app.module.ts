import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//modules
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductItemComponent } from './products/product-list/product-item/product-item.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { HeaderComponent } from './header/header.component';


import { FooterComponent } from './footer/footer.component';
import { CartComponent } from './cart/cart.component';

import { OrderComponent } from './order/order.component';
import { ItemListComponent } from './cart/item-list/item-list.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { ItemDetailsComponent } from './cart/item-list/item-details/item-details.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductListComponent,
    ProductItemComponent,
    ProductDetailsComponent,
 
    HeaderComponent,
    FooterComponent,
    CartComponent,
    OrderComponent,
    ItemListComponent,
    ItemDetailsComponent,
    SignupComponent,
    LoginComponent,
    AddProductComponent,
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
