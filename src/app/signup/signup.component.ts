import { Component, OnInit } from '@angular/core';
import { PUser, User } from "../shared/User";
import { SignupService } from "./signup.service";
import {FormGroup, FormControl, ReactiveFormsModule, Validators} from "@angular/forms"
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  user = new User("", "", "", "", "");
  puser = new PUser(this.user, "", "")

  constructor(private signupService: SignupService, private router:Router) { 
    this.registerForm = new FormGroup({
      form_first_name: new FormControl('', Validators.required),
      form_last_name: new FormControl('', Validators.required),
      form_username: new FormControl('', Validators.required),
      form_email: new FormControl('', Validators.required),
      form_password: new FormControl('', Validators.required),
      form_address: new FormControl('', Validators.required),
      form_phone: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
  }

  registerUser() {
    this.puser.user.first_name = this.registerForm.controls.form_first_name.value;
    this.puser.user.last_name = this.registerForm.controls.form_last_name.value;
    this.puser.user.username = this.registerForm.controls.form_username.value;
    this.puser.user.email = this.registerForm.controls.form_email.value;
    this.puser.user.password = this.registerForm.controls.form_password.value;
    this.puser.address = this.registerForm.controls.form_address.value;
    this.puser.phone = this.registerForm.controls.form_phone.value;

    this.signupService.registerPUser(this.puser).subscribe(
      response => {
        alert("address " + this.puser.address + " Successfully");
        this.router.navigate(["/login"]);
      },
      error => console.log('error', error)
    );
  }
}
