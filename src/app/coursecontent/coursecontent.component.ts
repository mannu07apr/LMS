import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../course.service';
import { ImageUploadService } from '../image-upload.service';
import { MediaService } from '../media.service';
import { icoursecontent } from '../../assets/model/icoursecontent';
import { iUserProgress } from '../../assets/model/iUserProgress';
import { iUpdateProgress } from '../../assets/model/iUpdateProgress';

@Component({
  selector: 'app-coursecontent',
  templateUrl: './coursecontent.component.html',
  styleUrl: './coursecontent.component.css'
})
export class CoursecontentComponent implements OnInit {
  coursetitle: string = "";
  courseid: number = 0;
  loggedinuser: string = "";
  userid: number = 0;
  courseContents: icoursecontent[] = [];
  courseProgress: iUserProgress[] = [];
  sectionlist: string[] = [];
  contenttext: string = '';
  progresstext: string = '';
  thumbimg: string = '';
  progressValue: string = '';
  watchedDuration: number = 0;

  constructor(private http: HttpClient, private router: Router, private imageUploadService: ImageUploadService,
    private courseService: CourseService, public mediaservice: MediaService) {

  }

  ngOnInit(): void {
    this.courseid = localStorage['courseid'];
    this.userid = localStorage['userid'];
    this.loggedinuser = localStorage['loggedinuser'];
    this.coursetitle = localStorage['coursetitle'];
    this.thumbimg = localStorage['thumbimg'];
    if (this.loggedinuser == null) {
      this.router.navigate(['/signup']);
    }
    else {
      this.GetCourseList(this.userid, this.courseid);
      this.GetCourseProgressList(this.userid, this.courseid);
    }
  }

  public GetCourseList(userid: number, courseid: number) {
    this.courseService.getcourscontentbyid(userid, courseid)
      .subscribe(
        (data: icoursecontent[]) => {
          this.courseContents = data.filter(d => d.courseID == courseid);
          console.log(this.courseContents);

          this.sectionlist = this.courseContents.map(item => item.sectionName)
            .filter((__values, index, self) => self.indexOf(__values) === index);

          this.contenttext = 'Total Sections : ' + this.sectionlist.length.toString() + '  ■ Total Lessons : ' + this.courseContents.length.toString() + ' ■';
          const toaltime = this.courseContents.reduce((sum, item) => sum + item.duration, 0);

        }
      );

  }

  resetProgress() {
    this.progressValue = '0%';
  }

  public GetCourseProgressList(userid: number, courseid: number) {
    this.courseService.getUserProgressbyid(userid, courseid)
      .subscribe(
        (data: iUserProgress[]) => {
          this.courseProgress = data.filter(d => d.courseID == courseid);

          const numericValue = parseFloat(this.courseProgress[0].totalProgress.replace('%', ''));

          if (numericValue < 100) {
            this.progressValue = `${(numericValue).toFixed(1)}%`;
          }

        }
      );
  }
  PlayContent(contenttext: string, contentfile: string, contentid: number){
    console.log(contentfile);
    localStorage.setItem('contenttext', contenttext);
    localStorage.setItem('currentvideofilename', contentfile);
    localStorage.setItem('contentid', contentid.toString());
    this.router.navigate(['/imgcration']);
  }

}
