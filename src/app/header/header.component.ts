import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faCoffee = 'faCoffee';
  constructor() { }

  ngOnInit(): void {
  }

  logout(){
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("id");
  }
}
