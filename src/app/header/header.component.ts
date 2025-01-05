import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  islogged: boolean = false;
  menuActive: boolean = true;
  buttontext:string="";
  loggedinuser: any;
  usertype:any='';
  /**
   *
   */
  constructor(private router: Router) {


  }


  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

  ngOnInit(): void {
    this.islogged = localStorage['islogged'] == 'logged';
    this.loggedinuser = localStorage['loggedinuser'];
    this.usertype = localStorage['usertype'];
  }

  login() {
    this.router.navigate(['/signup']);
  }
  logout() {
    localStorage.removeItem('islogged');
    localStorage.removeItem('loggedinuser');
    localStorage.removeItem('token');
    localStorage.removeItem('usertype');
       this.router.navigate(['/signup']);
  }
  Joinwhatsapp() {

  }
  isopen: boolean = false;
  clikevent() {
    this.isopen = !this.isopen;
  }

}
