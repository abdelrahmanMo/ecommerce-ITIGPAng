import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PUser } from '../shared/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginUrl = 'http://127.0.0.1:8000/profile/api/users-login/';
  getUserDataUrl = 'http://127.0.0.1:8000/profile/api/loggedin/';
  userToken: string;
  userId: string;
  currentUser: any;
  constructor(private http: HttpClient) {
    this.userToken = localStorage.getItem("token");
    this.userId = localStorage.getItem("id");
   }

  loginUser(userData): Observable<any> {
    return this.http.post(this.loginUrl, userData)
  }

  getUserData(){
    this.http.get(`${this.getUserDataUrl}${this.userId}`).subscribe(
      response =>{
        this.currentUser = response;
        // localStorage.setItem("current_user", this.currentUser);
        console.log(this.currentUser);
      },
      error => console.log('error', error)
    );
  }
}
