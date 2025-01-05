import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { icoursemaster } from '../../assets/model/icoursemaster';
import { ImageUploadService } from '../image-upload.service';
import { CourseService } from '../course.service';
import localeIn from '@angular/common/locales/en-IN';
import { NotifierService } from '../notifier.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'

})
export class UploadComponent implements OnInit {


  message: string = '';
  selectedfiles!: FileList;
  formData = new FormData();
  imgURL: string[] = [];
  files: File[] = [];
  images: '';
  pid: string = "0";
  coursedata: icoursemaster = {
    courseID: 0,
    courseName: '',
    imageName: '',
    type: '',
    price: 0,
    createdDate: new Date()
  };
  courses: icoursemaster[] = [];

  constructor(private http: HttpClient, private router: Router, private imageUploadService: ImageUploadService,
    private courseService: CourseService, private notifyservice: NotifierService
  ) {
    this.images = '';
  }

  ngOnInit(): void {
    this.GetCourseList();
  }

  GetCourseList() {
    this.courseService.getcoursemaster()
      .subscribe(
        (data: icoursemaster[]) => {
          this.courses = data;
        }
      );
  }
  CreatCourseMaster() {
    
    var msg: String = "";
    if (this.coursedata.courseName != "" && this.coursedata.price > 0 && this.coursedata.type != "" && this.coursedata.imageName != "") {
      this.courseService.newcoursemaster(this.coursedata)
        .subscribe(
          (data: icoursemaster) => {
            this.upload();
            this.notifyservice.ShowSuccess("Upload", "Course created successfully.");
          }
        );
    }
    else {

      msg += this.coursedata.courseName == "" ? " [Course Name ]" : "";
      msg += this.coursedata.price <= 0 ? " [Course Price]" : "";
      msg += this.coursedata.type == "" ? " [Course Type]" : "";
      msg += this.coursedata.imageName == "" ? " [Course Image]" : "";
      this.notifyservice.ShowError("Upload", "Fill all required  " + msg + " fields. ");
    }
  }
  onChange(event: any) {
    this.selectedfiles = event.target.files;
    if (this.selectedfiles) {
      for (let i = 0; i < this.selectedfiles.length; i++) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.imgURL.push(e.target.result);
        }
        reader.readAsDataURL(this.selectedfiles[i]);
        this.coursedata.imageName = this.selectedfiles[i].name;
        console.log(this.coursedata.imageName + this.coursedata.courseName);
      }
    }
  }
  upload(): void {
 
    var msg: String = "";
    const formData: FormData = new FormData;

    for (let i = 0; i < this.selectedfiles.length; i++) {
      let newfilename = this.selectedfiles[i].name.replace(/ /g, "_");
      this.images += this.selectedfiles[i].name.replace(/ /g, "_") + ",";
      formData.append('postedFiles', this.selectedfiles[i], newfilename);
    }

    this.imageUploadService.uploadImage(formData).subscribe((data: any) => {
      this.GetCourseList();
    },
      (error) => {
        console.log('upload error : ', error);
      })

  }

  deleteCourse(crsid: number) {
    this.courseService.deleteCourse(crsid).subscribe(() => {
      this.courses = this.courses.filter(course => course.courseID !== crsid);
    });
  }

  AddCourseContent(coursetitle: string, crsid: number) {
    localStorage['coursetitle'] = coursetitle;
    localStorage['courseid'] = crsid;
    this.router.navigate(["/coursecontent"]);
  }
  ViewourseContent(arg0: number) {
    this.router.navigate(["/imgcration"]);
  }
}
