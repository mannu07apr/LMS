import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../course.service';
import { ImageUploadService } from '../image-upload.service';
import { icoursecontent } from '../../assets/model/icoursecontent';
import { __values } from 'tslib';
import { MediaService } from '../media.service';
import { iUpdateProgress } from '../../assets/model/iUpdateProgress';
import { iresource } from '../../assets/model/iresource';


@Component({
  selector: 'app-courseplayer',
  templateUrl: './courseplayer.component.html',
  styleUrl: './courseplayer.component.css'
})
export class CourseplayerComponent implements OnInit {

  //@Output() videoSelected = new EventEmitter<icoursecontent>();
  @ViewChild('videoPlayer', { static: false }) videoPlayer!: ElementRef<HTMLVideoElement>;
  showArrows = false;
  coursetitle: string = "";
  currentTime: string | undefined;
  progress: number = 0;
  totalTime: number | undefined;
  currentVideoSource: string = '';
  selectedcontentname: String = '';
  selectedOrder: number = 1;
  courseid: number = 0;
  userid: number = 0;
  maxOrder: number | undefined;
  minOrder: number | undefined;
  coursedata: icoursecontent = {
    courseContentID: 0,
    courseID: 0,
    sectionName: '',
    contentName: '',
    videoFileName: '',
    createdDate: new Date,
    userId: 0,
    completed: false,
    courseName: '',
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
  progressData: iUpdateProgress = {
    progressId: 0,
    userId: 0,
    contentId: 0,
    watchedDuration: 0,
    completed: false
  };
  courseContents: icoursecontent[] = [];
  sectionlist: string[] = [];
  contenttext: string = '';
  islogged: boolean = false;
  loggedinuser: any;
  userType: string = '';
  selectedcontent: number = 0;
  savedTimeKey = 'videoCurrentTime';
  iscompleted: boolean = false;
  resourcelist: iresource[] = [];
  isExpanded: boolean[] = [];
  private intervalId: any;

  constructor(private http: HttpClient, 
    private router: Router, 
    private imageUploadService: ImageUploadService,
    private courseService: CourseService,
     public mediaservice: MediaService) {

  }

  ngOnInit(): void {

    this.courseid = localStorage['courseid'];
    this.userid = localStorage['userid'];
    this.loggedinuser = localStorage['loggedinuser'];
    this.coursetitle = localStorage['coursetitle'];
    this.islogged = localStorage['islogged'] == 'true';
    this.userType = localStorage['usertype'];

    if (this.loggedinuser == null) {
      this.router.navigate(['/signup']);
    }
    else {

      this.GetCourseList(this.userid, this.courseid);
      this.startAutoSave();
    }
    this.isExpanded = new Array(this.sectionlist.length).fill(false);

  }
  ngOnDestroy() {
    this.stopAutoSave();
  }
  isPaidUser(): boolean {
    return this.userType === 'Paid';
  }
  isFreeUser(): boolean {
    return this.userType === 'Free';
  }
  onPause(event: Event): void {
    const videoPlayer = event.target as HTMLVideoElement;
    const currentTime = videoPlayer.currentTime;
    // Save the current playback time to localStorage
    localStorage.setItem(this.savedTimeKey, currentTime.toString());

    this.progressData.userId = this.userid;
    this.progressData.watchedDuration = Number.parseFloat(currentTime.toString());
    this.progressData.completed = false;
    console.log(typeof this.progressData.userId);
    this.UpdateProgress(this.userid, this.progressData);
  }
  markAsComplete() {

    this.progressData.userId = this.userid;
    this.progressData.completed = !this.iscompleted;
    this.progressData.watchedDuration = !this.iscompleted ? Number.parseFloat(this.totalTime?.toString() || '0') : 0.00;
    this.UpdateProgress(this.userid, this.progressData);

  }
  onPlay(event: Event): void {
    console.log('Video is playing');
  }


  GetResourceList(courseid: number) {
    this.imageUploadService.getResourceFiles(courseid)
      .subscribe(
        (data: any) => {
          this.resourcelist = data.result;
        }
      );
  }
  onVideoSelected(video: icoursecontent) {
    
    this.coursedata = video;
  }
  convertBytesToMB(bytes: number): string {
    return (bytes / (1024 * 1024)).toFixed(2); // Return as a string with 2 decimal places
  }

  public GetCourseList(userid: number, courseid: number) {

    this.courseService.getcourscontentbyid(userid, courseid)
      .subscribe(
        (data: icoursecontent[]) => {
          this.courseContents = data.filter(d => d.courseID == courseid);
          this.sectionlist = this.courseContents.map(item => item.sectionName)
            .filter((__values, index, self) => self.indexOf(__values) === index);
          this.contenttext = 'Total Sections : ' + this.sectionlist.length.toString() + ' Total Lessons : ' + this.courseContents.length.toString();
          const toaltime = this.courseContents.reduce((sum, item) => sum + item.duration, 0);
          this.contenttext += ' Total Time : ' + this.mediaservice.convertSeconds(toaltime);

        }
      );

    if (this.courseContents.length > 0) {
      this.minOrder = Math.min(...this.courseContents.map(content => content.order));
      this.changeVideoSource( this.minOrder );
    }
    else {

    }
  }
  PlayPrevious() {

    if (this.selectedOrder == 0) {
      this.selectedOrder = 1;
    } else {
      this.selectedOrder--;
    }

    this.changeVideoSource(this.selectedOrder);

  }
  PlayNext() {
    this.maxOrder = Math.max(...this.courseContents.map(content => content.order));
    if (this.selectedOrder >= this.maxOrder) {
      this.selectedOrder = this.maxOrder;
    } else {
      this.selectedOrder++;
    }

    this.changeVideoSource(this.selectedOrder);

  }

  setCurrentTime(data: any) {
    this.currentTime = data.target.currentTime;
  }

  disableRightClick(event: MouseEvent): void {
    event.preventDefault();
  }
  disableContextMenu(event: MouseEvent): void {
    event.preventDefault(); // Prevent the context menu
    //alert('Right-click is disabled on this video.');
  }

  initializeVideo() {
    const video = this.videoPlayer.nativeElement;
    this.progress = 0;
    this.totalTime = video.duration;
  }

  changeVideoSource(orderid: number) {
    const currCourse = this.courseContents.find(d => d.order === orderid) as icoursecontent;
    
    if (currCourse) {
      console.log('Start video' + currCourse.videoFileName);
      this.currentVideoSource = currCourse.videoFileName;
      this.selectedcontentname = currCourse.contentName;
      this.selectedcontent = currCourse.courseContentID;
      this.totalTime = currCourse.duration;
      this.iscompleted = currCourse.completed;
      // Reload the video after changing the source
      const videoElement = this.videoPlayer.nativeElement;
      this.progressData.contentId = currCourse.courseContentID;
      videoElement.load();
      videoElement.play();
    } else {
      console.error("No course content found for the selected orderid:", orderid);
    }

    // if ((this.isPaidUser()) || (this.isFreeUser() && currCourse.order == 1)) { }
    // else {
    //   this.router.navigateByUrl('membershipcard');
    // }
  }

  UpdateProgress(userID: number, progress: iUpdateProgress) {
    const serializedPayload = JSON.stringify(progress)
    this.courseService.updateProgress(userID, progress)
      .subscribe(
        (data: iUpdateProgress) => {
          console.log("Progress updated");
        }
      );

  }
  showButtons() {
    this.showArrows = true;
  }

  hideButtons() {
    this.showArrows = false;
  }

  startAutoSave() {
    const intervalTime = 120000; // 2 minutes in milliseconds

    this.intervalId = setInterval(() => {
      const videoPlayer = this.videoPlayer?.nativeElement;
      if (videoPlayer && !videoPlayer.paused) {
        const currentTimeNew = videoPlayer.currentTime;

        this.progressData.userId = this.userid;
        this.progressData.watchedDuration = Number.parseFloat(currentTimeNew.toString());
        this.progressData.completed = false;

        this.UpdateProgress(this.userid, this.progressData);
        console.log('Saved time:', currentTimeNew);
      }
    }, intervalTime);
  }
  stopAutoSave() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
  toggleSection(index: number): void {
    this.isExpanded[index] = !this.isExpanded[index]; // Toggle the state
  }
}


//changeVideoSource('assets/videos/video1.mp4')