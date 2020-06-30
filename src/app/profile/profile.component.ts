import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { ProfileService } from './profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  constructor(private profileService: ProfileService, private router: Router) { }

  current_user: any;
  fullname: string;
  ngOnInit(): void {
    if(!localStorage.getItem('id')){
      this.router.navigate(["/login"]);
    }    
    this.profileService.getCurrentUser().subscribe(
      response => {
        this.current_user = response;
        this.fullname = this.current_user['user']['first_name'] + " " + this.current_user['user']['last_name']
        
      }
    )
  }

}
