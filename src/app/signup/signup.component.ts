import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { authGuard } from '../auth.guard';
import { AuthService } from '../auth.service';
import { SharedService } from '../shared.service';
import { NotifierService } from '../notifier.service';

interface user {
  userId: number;
  userName: string;
  mobile: string;
  userEmail: string;
  password: string;
  type: string;
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  
  message: string = '';

  userdata: user = {
    userId: 0,
    userName: '',
    mobile: '',
    userEmail: '',
    password: '',
    type: 'Free',
  };
  /**
   *
   */
  constructor(private http: HttpClient,private router:Router,private shareService: SharedService, private notifyservice: NotifierService) {}
  ngOnInit(): void {
    localStorage.setItem('usertype', 'Free');
    //this.shareService.changeUserType('Free');
   // this.shareService.changetext('Login/Signup');
  }

  chekemail(userEmail:string){
    this.http.get("http://learn.excelonlineservices.com/api/Users/Details?useremail="+userEmail,{responseType:'text'}).subscribe(
      (response)=>{
        // console.log(response);
        if(response=='No User'){
          this.createlogin();
          this.notifyservice.ShowSuccess("Register User", "You have registered successfully.Please login for free courses.");
          this.router.navigate(['/login']);
        }
        else{this.message="This Email is Already Exist.";}
        
      }
    );

  }

  createuser() {
    this.chekemail(this.userdata.userEmail);

  }
  createlogin(){
   
    this.http
      .post<user[]>(
        'http://learn.excelonlineservices.com/api/Users/Create',
        this.userdata
      )
      .subscribe((response) => {
        this.message = 'Login Created';
        this.userdata = {
          userId: 0,
          userName: '',
          mobile: '',
          userEmail: '',
          password: '',
          type: '',
        };
      });

    console.warn(this.userdata);
  }
 // input function for name upper case //
  onNameInput(){
    this.userdata.userName=this.userdata.userName.toUpperCase();
  }
  gotologin(){
    this.router.navigate(['/course']);
  }

}
