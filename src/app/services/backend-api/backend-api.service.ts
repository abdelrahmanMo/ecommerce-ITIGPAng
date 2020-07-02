import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendApiService {

  //Urls
  catetoryUrl = "http://127.0.0.1:8000/Category/apis/" ;
  productUrl = "http://127.0.0.1:8000/Product/apis/" ;
  productImgsUrl = "http://127.0.0.1:8000/ProductImgs/apis/" ;
  supplierUrl = 'http://127.0.0.1:8000/profile/api/loggedin/';
  constructor(private apiHttp: HttpClient) { }

  //supplier methods
  getOneSupplier(id) {
    return this.apiHttp.get(`${this.supplierUrl}${id}`);
  }
  // category methods
  getAllCategory() {
    return this.apiHttp.get(this.catetoryUrl);
  }

  getOneCategory(id) {
    return this.apiHttp.get(`${this.catetoryUrl}${id}/`);
  }

  createCategory(data) {
    return this.apiHttp.post(this.catetoryUrl, data);
  }

  updateCategory(id, data) {
    return this.apiHttp.put(`${this.catetoryUrl}${id}/`, data);
  }

  deleteCategory(id) {
    return this.apiHttp.delete(`${this.catetoryUrl}${id}/`);
  }

  deleteAllCategory() {
    return this.apiHttp.delete(this.catetoryUrl);
  }

  findByCategory(name) {
    return this.apiHttp.get(`${this.catetoryUrl}?name=${name}`);
  }


  // product methods
  getAllProduct() {
    return this.apiHttp.get(this.productUrl);
  }

  getOneProduct(id) {
    return this.apiHttp.get(`${this.productUrl}${id}/`);
  }

  createProduct(data) {
    return this.apiHttp.post(this.productUrl, data);
  }

  updateProduct(id, data) {
    return this.apiHttp.put(`${this.productUrl}${id}/`, data);
  }

  deleteProduct(id) {
    return this.apiHttp.delete(`${this.productUrl}${id}/`);
  }

  deleteAllProduct() {
    return this.apiHttp.delete(this.productUrl);
  }

  findByProduct(name,stock,cateId) {
    if(stock === null && cateId === null){
      return this.apiHttp.get(`${this.productUrl}?name=${name}`);
    }
    else if(stock === null){
      // const cateId = category.id ;
      return this.apiHttp.get(`${this.productUrl}?name=${name}&category=${cateId}`);
    }
    else if(cateId === null){
      return this.apiHttp.get(`${this.productUrl}?name=${name}&in_stock=${stock}`);
    }
    else{
      // const cateId = category.id ;
      return this.apiHttp.get(`${this.productUrl}?name=${name}&category=${cateId}&in_stock=${stock}`);
    }
  }
  findByProductCategory(cateId,stock) {
    if(stock === null){
      return this.apiHttp.get(`${this.productUrl}?category=${cateId}`);
    }
    else if(stock === 'true'){    
      return this.apiHttp.get(`${this.productUrl}?category=${cateId}&in_stock=true`);
    }else{
      return this.apiHttp.get(`${this.productUrl}?category=${cateId}&in_stock=false`);
    }
  }
  findByProductSupplier(supplierId,name,stock,cateId) {
    if(stock === null && cateId === null && name === '' ){
      return this.apiHttp.get(`${this.productUrl}?supplier=${supplierId}`);
      // return this.apiHttp.get(`${this.productUrl}?name=${name}`);
    }
    else if(stock === null && name === ''){
      // const cateId = category.id ;
      return this.apiHttp.get(`${this.productUrl}?supplier=${supplierId}&category=${cateId}`);
      // return this.apiHttp.get(`${this.productUrl}?name=${name}&category=${cateId}`);
    }
    else if(cateId === null && name === ''){
      return this.apiHttp.get(`${this.productUrl}?supplier=${supplierId}&in_stock=${stock}`);
    }
    else{
      // const cateId = category.id ;
      if(cateId === null ){
        return this.apiHttp.get(`${this.productUrl}?supplier=${supplierId}&name=${name}&in_stock=${stock}`);
      }
      else if(stock === null){
        return this.apiHttp.get(`${this.productUrl}?supplier=${supplierId}&name=${name}&category=${cateId}`);
      }
      else{
        return this.apiHttp.get(`${this.productUrl}?supplier=${supplierId}&name=${name}&category=${cateId}&in_stock=${stock}`);
      }
      
    }

  }
  findByProductStock(stock,cateId) {
    if(cateId === null){
      return this.apiHttp.get(`${this.productUrl}?in_stock=${stock}`);
    }
    else{
      // const cateId = category.id ;
      return this.apiHttp.get(`${this.productUrl}?in_stock=${stock}&category=${cateId}`);
    }
  }

  // product-Imgs methods
  getAllProductsImgs() {
    return this.apiHttp.get(this.productImgsUrl);
  }

  
  getOneProductImg(id) {
    return this.apiHttp.get(`${this.productImgsUrl}${id}/`);
  }

  createProductImg(data) {
    return this.apiHttp.post(this.productImgsUrl, data);
  }

  updateProductImg(id, data) {
    return this.apiHttp.put(`${this.productImgsUrl}${id}/`, data);
  }

  deleteProductImg(id) {
    return this.apiHttp.delete(`${this.productImgsUrl}${id}/`);
  }

  findByProductImgs(proId) {
    return this.apiHttp.get(`${this.productImgsUrl}?product=${proId}`);
  }
}
