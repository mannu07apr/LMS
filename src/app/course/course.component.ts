import { Component, OnInit } from '@angular/core';
import { Iservice } from '../../assets/model/Iservice';
import { icourse } from '../../assets/model/icourse';
import { Router } from '@angular/router';
import { CourseService } from '../course.service';
import { icoursemaster } from '../../assets/model/icoursemaster';
import { icoursecontent } from '../../assets/model/icoursecontent';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../shared.service';
import { NotifierService } from '../notifier.service';

interface Istudent {
  coursename: string;
  age: number;
  totalFee: number;
}

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrl: './course.component.css',
})
export class CourseComponent implements OnInit {

  courseContents: icoursecontent[] = [];
  courselist: icourse[] = [];
  coursemasterlist: icoursemaster[] = [];
  sectionlist: string[] = [];
  usertype: any;

  gotocourse(arg0: string, arg1: string,imgnmae:string) {
    localStorage['coursetitle'] = arg0;
    localStorage['courseid'] = arg1;
    localStorage['thumbimg'] = imgnmae;
    this.router.navigate(['/coursecontentlist']);

 //   this.router.navigate(['/imgcration']);
  }

  ngOnInit(): void {
    this.loggedinuser = localStorage['loggedinuser'];
    this.usertype = localStorage['usertype'];
     this.sharedService.changeUserType(localStorage['usertype']);

    if (this.loggedinuser == null) {
      this.router.navigate(['/signup']);
    }
    else {
      this.courseservice.getcourselist().subscribe((response: icourse[]) => {
        this.courselist = response;
      });

      this.courseservice.getcoursemaster().subscribe((response: icoursemaster[]) => {
        this.coursemasterlist = response;

      });
    }

  }

  constructor(private router: Router, private courseservice: CourseService, private sharedService: SharedService, private notifyservice: NotifierService) { }
  loggedinuser: any = '';


}
