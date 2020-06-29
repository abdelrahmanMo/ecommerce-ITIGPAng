import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { AddProductComponent } from './products/add-product/add-product.component';


const routes: Routes = [
  {path : 'products', component : ProductsComponent } ,
  {path : 'productList', component : ProductListComponent } ,
  {path : 'product/:id', component : ProductDetailsComponent } ,
  {path : 'addProduct', component : AddProductComponent } ,

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
