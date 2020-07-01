import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    form_username: new FormControl('', Validators.required),
    form_password: new FormControl('', Validators.required),
  });
  user: any;
  id: number;
  dataValid: boolean;
  
  constructor(private loginService: LoginService, private router: Router) { 
    this.user = {
      username: "",
      password: "",
    }
    this.dataValid = false;
    this.id = 0;
  }

  ngOnInit(): void {
    if(localStorage.getItem('id')){
      this.router.navigate(["/products"]);
    } 
  }

  login() {
    this.user.username = this.loginForm.controls.form_username.value;
    this.user.password = this.loginForm.controls.form_password.value;
    this.loginService.loginUser(this.user).subscribe(
      response => {
        this.dataValid = false;
        this.loginService.userToken = response;
        localStorage.setItem("token", this.loginService.userToken['token']);
        localStorage.setItem("id", this.loginService.userToken['id']);
        this.router.navigate(["/products"]);
      },
      error => {
        this.dataValid = true;
      }
    );
  }

  getUserData(){
    this.loginService.getUserData();
  }

}
