import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { icoursecontent } from '../../assets/model/icoursecontent';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { CourseService } from '../course.service';
import { ImageUploadService } from '../image-upload.service';
import { DataTablesModule } from 'angular-datatables';
import DataTables from 'datatables.net';
import { Subject, takeUntil } from 'rxjs';
import { MediaService } from '../media.service';
import { NotifierService } from '../notifier.service';

@Component({
  selector: 'app-addcoursecontent',
  templateUrl: './addcoursecontent.component.html',
  styleUrl: './addcoursecontent.component.css'
})
export class AddcoursecontentComponent implements OnInit {

  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  videoDuration: number = 0;
  message: string = '';
  selectedfiles!: FileList;
  formData = new FormData();
  imgURL: string[] = [];
  files: File[] = [];
  pid: string = "0";
  courseid: number = 0;
  userid: number = 0;
  selectedcourse: string = '';
  images: '';
  uploaded: boolean = false;
  progress: number = -1;
  btntext: string = 'Add Content';

  coursedata: icoursecontent = {
    courseContentID: 0,
    courseID: 0,
    sectionName: '',
    contentName: '',
    videoFileName: '',
    createdDate: new Date,
    duration: 0.00,
    order: 0,
    userId: 0,
    completed: false,
    courseName: '',
    totalTime: 0,
    watchedTime: 0,
    totalCourseTime: '',
    totalWatchedTime: '',
    totalProgress: '',
    progressId: 0
  };
  courseContents: icoursecontent[] = [];
  selectedItem: icoursecontent | null = null;
  ccoursedata: icoursecontent | undefined;

  constructor(private http: HttpClient, private router: Router, private imageUploadService: ImageUploadService,
    private courseService: CourseService, public mediaService: MediaService, private notifyservice: NotifierService) {
    this.images = '';

  }

  ngOnInit(): void {
    this.selectedcourse = localStorage['coursetitle'];
    this.courseid = localStorage['courseid'];
    this.userid = localStorage['userid'];
    this.coursedata.courseID = this.courseid;
    this.coursedata.order = 1;
    this.GetCourseList();
  }

  DeleteCourseContent(ccntid: number) {
    
    this.courseService.deleteCourseContent(ccntid).subscribe(() => {
      this.courseContents = this.courseContents.filter(course => course.courseID !== ccntid);
      this.GetCourseList();
      this.notifyservice.ShowSuccess("Course Content Upload", "Content successfully deleted.");
    });
  }

  EditCourseContent(arg0: number) {
    this.ccoursedata = this.courseContents.find(x => x.courseContentID == arg0);
    this.coursedata = this.ccoursedata as icoursecontent;
    this.btntext = 'Update Content';
    this.selectedItem = this.coursedata;
    this.videoDuration = this.coursedata.duration;
  }

  GetCourseList() {
    this.courseService.getcourscontentbyid(this.userid, this.courseid)
      .subscribe(
        (data: icoursecontent[]) => {
          this.courseContents = data.sort((a, b) => a.order - b.order);

        }
      );
  }

  CreatCourseContent() {
    
    //update existing content
    if (this.btntext == 'Update Content' && this.coursedata.contentName != "" && this.coursedata.sectionName != "") {
      if (!(this.selectedfiles)) {
        this.message = 'Select video for content';
        this.notifyservice.ShowError("Upload", this.message);
      }
      else {
        this.courseService.updtaecoursecontent(this.coursedata.courseContentID, this.coursedata)
          .subscribe(
            (data: icoursecontent) => {
              this.uploaded = true;
              if (this.selectedfiles) {
                this.upload();
              }
              else if (!(this.selectedfiles)) {
                this.message = 'Select video for content';
                this.notifyservice.ShowError("Upload", this.message);
              }
              else {
                this.uploaded = false;
                this.progress = 0;
                if (!this.uploaded) {
                  this.message = 'Content updated';
                  this.notifyservice.ShowSuccess("Upload", this.message);
                }
              }
            }
          );
      }
    }
    /// add new content
    else {
      if (this.coursedata.contentName != "" && this.coursedata.sectionName != "") {
        if (!(this.selectedfiles)) {
          this.message = 'Select video for content';
          this.notifyservice.ShowError("Upload", this.message);
        }
        else {
          this.courseService.newcoursecontent(this.coursedata)
            .subscribe(
              (data: icoursecontent) => {
                if (this.selectedfiles) {
                  this.uploaded = true;
                  this.upload();
                }
                else if (!this.selectedfiles) {
                  this.message = 'Select video for content';
                  this.notifyservice.ShowError("Upload", this.message);
                }
                else {
                  this.message = 'Select video for content';
                  this.notifyservice.ShowError("Upload", this.message);
                }
              }
            );
        }
      } else {
        this.notifyservice.ShowError("Upload", "Fill all required fields.");
      }
    }


  }
  onChange(event: any) {

    this.selectedfiles = event.target.files;
    const input = event.target as HTMLInputElement;

    if (this.selectedfiles) {
      for (let i = 0; i < this.selectedfiles.length; i++) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.imgURL.push(e.target.result);
        }
        reader.readAsDataURL(this.selectedfiles[i]);
        var newfilename = this.selectedfiles[i].name.replace(/ /g, "_");
        this.coursedata.videoFileName = 'assets/course/' + newfilename;
        const url = URL.createObjectURL(this.selectedfiles[i]);

        // Load the video file into the video element
        this.videoElement.nativeElement.src = url;
        // Add an event listener to get the duration once metadata is loaded
        this.videoElement.nativeElement.onloadedmetadata = () => {
          this.videoDuration = Math.fround(this.videoElement.nativeElement.duration);
          URL.revokeObjectURL(url); // Clean up the object URL
          this.coursedata.duration = this.videoDuration;
        };
      }

    }
  }


  upload(): void {
    if (!(this.selectedfiles.length > 0)) {
      return;
    }
    const formData: FormData = new FormData();
    let newfilename: string = '';
    this.images = ''; // Ensure `this.images` is initialized properly.    
    for (let i = 0; i < this.selectedfiles.length; i++) {
      // Replace spaces in the filename with underscores.
      newfilename = this.selectedfiles[i].name.replace(/ /g, "_");
      // Add to `formData` with the updated filename.
      formData.append('postedFiles', this.selectedfiles[i], newfilename);
      // Update `this.images` with the sanitized filename.
      this.images += newfilename + (i < this.selectedfiles.length - 1 ? "," : "");
      this.coursedata.videoFileName = newfilename;
    }

    this.imageUploadService.uploadImage(formData)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total) {
            this.progress = Math.round(100 * (event.loaded / event.total));
          }
        } else if (event.type === HttpEventType.Response) {

          this.uploaded = false;
          this.message = 'File successfully uploaded!';
          this.progress = 0; // Reset the progress bar after upload
        }
        if (this.progress > 99) {
          this.GetCourseList();
          this.notifyservice.ShowSuccess("Upload", "File successfully uploaded.");
        }
      },
        (error) => {
          this.notifyservice.ShowError("Upload", "Error in File uploading.");
        })
  }

  clearForm() {
    this.coursedata = {
      courseContentID: 0,
      courseID: 0,
      sectionName: '',
      contentName: '',
      videoFileName: '',
      createdDate: new Date,
      duration: 0.00,
      order: 0,
      userId: 0,
      completed: false,
      courseName: '',
      totalTime: 0,
      watchedTime: 0,
      totalCourseTime: '',
      totalWatchedTime: '',
      totalProgress: '',
      progressId: 0
    };
    this.btntext = 'Add Content';
    this.selectedItem = null;
  }

}
