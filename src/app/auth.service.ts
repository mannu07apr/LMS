import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userType: string = '';
  private loginStatus = new BehaviorSubject<boolean>(localStorage.getItem('islogged') === 'true');
  loginStatusChanged = this.loginStatus.asObservable();

  constructor() { }
  
  
  setLoginStatus(isLogged: boolean): void {
    localStorage.setItem('islogged', isLogged.toString());
    this.loginStatus.next(isLogged);
  }

  // login() {
  //   this.loginStatus = true;
  // }

  // logout() {
  //   this.loginStatus = false;
  // }

  isloggedin(): boolean {
   return localStorage['islogged'] === 'true'
    
  }
  setUserType(type: string): void {
    this.userType = type;
  }

  getUserType(): string {
    return this.userType;
  }
}
