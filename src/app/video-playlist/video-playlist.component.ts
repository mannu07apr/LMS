import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { icoursecontent } from '../../assets/model/icoursecontent';
import { CourseService } from '../course.service';
import { ImageUploadService } from '../image-upload.service';
import { MediaService } from '../media.service';

@Component({
  selector: 'app-video-playlist',
  templateUrl: './video-playlist.component.html',
  styleUrl: './video-playlist.component.css'
})
export class VideoPlaylistComponent {


  @Output() videoSelected = new EventEmitter<icoursecontent>();
  contenttext: string = '';

  constructor(private http: HttpClient, private router: Router, private imageUploadService: ImageUploadService,
    private courseService: CourseService, public mediaservice: MediaService) {

  }
  vidofilename: any = '';
  courseid: number = 0;  
  userid: number = 0;
  coursetitle: string = "";
  coursedata: icoursecontent = {
    courseContentID: 0,
    courseID: 0,
    sectionName: '',
    contentName: '',
    userId: 0,
    completed: false,
    courseName: '',
    videoFileName: '',
    createdDate: new Date(),
    order: 0,
    duration: 0,
    totalTime: 0,
    watchedTime: 0,
    totalCourseTime: '',
    totalWatchedTime: '',
    totalProgress: '',
    progressId: 0,
    description:''
  };
  courseContents: icoursecontent[] = [];
  sectionlist: string[] = [];
  selectedcontent: number = 0;

  ngOnInit(): void {
    this.coursetitle = localStorage['coursetitle'];
    this.courseid = localStorage['courseid'];
    this.userid = localStorage['userid'];
    this.GetCourseList();
  }

  GetCourseList() {
    this.courseService.getcourscontentbyid(this.userid, this.courseid)
      .subscribe(
        (data: icoursecontent[]) => {
          this.courseContents = data.filter(d => d.courseID == this.courseid).sort((a, b) => a.order - b.order);
          
          this.sectionlist = this.courseContents.map(item => item.sectionName)
            .filter((__values, index, self) => self.indexOf(__values) === index);
            this.contenttext = 'Total Sections : ' + this.sectionlist.length.toString() +  ' Total Lessons : ' + this.courseContents.length.toString();
          const toaltime = this.courseContents.reduce((sum, item) => sum + item.duration, 0);          
          this.contenttext += ' Total Time : '+this.mediaservice.convertSeconds(toaltime);
          
        }
      );
  }
  setCurrentVideo(selectedvideofilename: icoursecontent) {
    this.selectedcontent = selectedvideofilename.courseContentID;
    console.log(" this.selectedcontent : " + selectedvideofilename.videoFileName);
    this.videoSelected.emit(selectedvideofilename);
  }

  
}
