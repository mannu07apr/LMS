import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { AuthService } from '../auth.service';

interface user {
  userId: number;
  userName: string;
  mobile: string;
  userEmail: string;
  password: string;
  type: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  message: string = '';

  userdata: user = {
    userId: 0,
    userName: '',
    mobile: '',
    userEmail: '',
    password: '',
    type: 'Free',
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private sharedService: SharedService,
    private authService: AuthService

  ) { }

  userLogin() {
    this.checkLogin(this.userdata.userEmail, this.userdata.password);

  }
  checkLogin(userEmail: string, pswd: string) {
  //  let DevApiUrl: string = "https://192.168.1.4:5555";
    //let   ProdApiUrl: string = "http://localhost:5555";
     let ProdApiUrl: string = "http://learn.excelonlineservices.com/";
    this.http
      .get<user>(
        ProdApiUrl + 'api/Users/CheckLogin?useremail=' +
        userEmail +
        '&pswd=' +
        pswd
      )
      .subscribe(
        (response: any) => {

          //localStorage.setItem('islogged', 'true');
          localStorage.setItem('loggedinuser', response.name);
          localStorage.setItem('usertype', response.userType);
          localStorage.setItem('token', response.token);
          localStorage.setItem('userid', response.userID);
          localStorage.setItem('usercode', response.userCode);
          console.log('usercode :', response);
          this.authService.setLoginStatus(true);
          //this.sharedService.changetext('Logout');
          this.sharedService.changeUserType(response.userType);
        
          if (response.userType == "Admin") {
            this.router.navigate(['/adminpanel']);
          }
          else
          {
            this.router.navigate(['/course']);
          }
          
        },
        (error) => {
          console.log(error);
          this.message = 'Incorrect Id or password';
        }
      );
  }
}

