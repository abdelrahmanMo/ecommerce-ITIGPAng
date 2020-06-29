import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  getUserDataUrl = 'http://127.0.0.1:8000/profile/api/loggedin/';
  currentUser: any;
  userToken: string;
  userId: string;
  constructor(private http: HttpClient) { 
    this.userToken = localStorage.getItem("token");
    this.userId = localStorage.getItem("id");
  }

  getUserData(){
    this.http.get(`${this.getUserDataUrl}${this.userId}`).subscribe(
      response =>{
        this.currentUser = response;
        console.log(this.currentUser);
      },
      error => console.log('error', error)
    );
  }
  
  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.getUserDataUrl}${this.userId}`);
  }
}
