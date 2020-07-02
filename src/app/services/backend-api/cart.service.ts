import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { from } from 'rxjs';

import {Cart} from '../../shared/cart/cart.modal'

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItemApi = 'http://127.0.0.1:8000/CartItem/apis/';
  cartApi = 'http://127.0.0.1:8000/Cart/apis/';

  constructor(private http:HttpClient) { }

  getAllCart(){
    return this.http.get(this.cartApi);
  }
  getCartbyID(id){
    return this.http.get(`${this.cartApi}${id}/`);
  }
  CreateCart(data){
    this.http.post(this.cartApi,data);
  }
  removeCart(id){
    this.http.delete(`${this.cartApi}${id}/`);
  }
  findCartByUserId(id){
    return this.http.get(`${this.cartApi}?user=${id}`);
  }
  getorderdCart(){
    const sta =true;
    return this.http.get(`${this.cartApi}?orderd=${sta}`);
  }
  getunorderdCartByuser(id){
    const sta =false;
    return this.http.get(`${this.cartApi}?orderd=${sta}&user=${id}`);
  }

  getCartItem(cartId){
    return this.http.get(`${this.cartItemApi}?cart=${cartId}`);
  }
  removeCartItem(id){
    return this.http.delete(`${this.cartItemApi}${id}/`);
  }
}
