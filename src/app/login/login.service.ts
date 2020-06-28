import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginUrl = 'http://127.0.0.1:8000/profile/api/users-login/';
  getUserDataUrl = 'http://127.0.0.1:8000/profile/api/loggedin/';
  userToken: any;
  constructor(private http: HttpClient) {
    this.userToken = "";
   }

  loginUser(userData): Observable<any> {
    return this.http.post(this.loginUrl, userData)
  }

  getUserData(){
    this.http.get(`${this.getUserDataUrl}${this.userToken['id']}`).subscribe(
      response =>{
        console.log(response);
      },
      error => console.log('error', error)
    );
  }

  // getData(){
  //   this.getUserData(this.userToken['id']).subscribe(
  //     response =>{
  //       console.log(response);
  //     },
  //     error => console.log('error', error)
  //   );
  // }
}
