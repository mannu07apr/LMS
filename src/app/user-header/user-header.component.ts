import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.css'
})
export class UserHeaderComponent implements OnInit, OnDestroy {
  islogged: boolean = false;
  menuActive: boolean = true;
  loggedinuser: any;
  usertype: any = '';
  subscription!: Subscription;
  
  buttonText: string = 'Login';
  buttonImage: string = '/assets/login.png';

  constructor(private router: Router,    
    private authService: AuthService
  ) {
    
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

  ngOnInit(): void {
    // this.islogged = localStorage['islogged'] === 'true';
    // this.loggedinuser = localStorage['loggedinuser'];
     this.usertype = localStorage['usertype'];
    this.updateButton();
    // Subscribe to changes in login state
    this.authService.loginStatusChanged.subscribe(() => {
      this.updateButton();
    });
  }
  isAdmin(): boolean {
    return this.usertype === "Admin";
  }
  updateButton(): void {
    const isLogged = localStorage.getItem('islogged') === 'true';
    this.buttonText = isLogged ? 'Logout' : 'Login/Signup';
    this.buttonImage = isLogged ? '/assets/logout.png' : '/assets/login.png';
    console.log(this.buttonText);
  }

  toggleLogin(): void {
    const isLogged = localStorage.getItem('islogged') === 'true';
       this.authService.setLoginStatus(!isLogged);
       if(!this.islogged){this.logout();}
  }

  login() {
    this.router.navigate(['/signup']);
  }
  logout() {
    localStorage.removeItem('islogged');
    localStorage.removeItem('loggedinuser');
    localStorage.removeItem('token');
    localStorage.removeItem('usertype');
    this.islogged = false;
    // this.sharedservice.changetext('Login/Signup');
    // this.sharedservice.changeUserType('Free');
    this.router.navigate(['/signup']);
  }
  Joinwhatsapp() {

  }
  isopen: boolean = false;
  clikevent() {
    this.isopen = !this.isopen;
  }
}
