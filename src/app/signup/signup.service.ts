import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  registerUrl = 'http://127.0.0.1:8000/profile/api/pusers/';
  constructor(private http: HttpClient) { }

  registerPUser(userData): Observable<any> {
    return this.http.post(this.registerUrl, userData)
  }
}
