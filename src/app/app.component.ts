import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from './shared.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'myapp';
  islogged: boolean = false;
  loggedinuser: any;
  userType: string = '';

  constructor(private router: Router, private sharedService:SharedService) {
  // Subscribe to user type text updates
  this.sharedService.usertypetext$.subscribe((type) => {
    this.userType = type;
   // this.cdr.detectChanges();
  });
  }

  ngOnInit(): void {
    this.islogged = localStorage['islogged'] == 'true';
    this.loggedinuser = localStorage['loggedinuser'];
    this.userType =  localStorage['usertype'];
   // this.sharedService.changetext( this.userType);
    console.log("userType - "+ this.userType)
  }
  isAdmin(): boolean {
    return this.userType==="Admin";
  }
  isUser():boolean{
    return this.userType==='User'  ;
  }
  isPaidUser():boolean{
    return this.userType==='Paid' ;
  }
  isFreeUser():boolean{
    return  this.userType ==='Free';
  }
}

