import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from "@angular/router";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private router: Router ,private  route: ActivatedRoute) { 
    
  }

  ngOnInit(): void {
    if(!localStorage.getItem('id')){
      this.router.navigate(["/login"]);
    }
    
  }

 

}
