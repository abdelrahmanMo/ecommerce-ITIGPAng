import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginService } from './login.service';

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
  
  constructor(private loginService: LoginService) { 
    this.user = {
      username: "",
      password: "",
    }
    this.id = 0;
  }

  ngOnInit(): void {
  }

  login() {
    this.user.username = this.loginForm.controls.form_username.value;
    this.user.password = this.loginForm.controls.form_password.value;
    this.loginService.loginUser(this.user).subscribe(
      response => {
        this.loginService.userToken = response
        alert(this.user.username + "Logged Successfully")
      },
      error => console.log('error', error)
    );
  }

  // getUserData(){
  //   this.loginService.getUserData();
  // }

}
