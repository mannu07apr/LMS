import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IUserProfile } from '../../assets/model/iuserprofile';
import { UserprofileService } from '../userprofile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageUploadService } from '../image-upload.service';
import { NotifierService } from '../notifier.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  userprofile: IUserProfile = {
    id: 0,
    userid: 0,
    fullName: '',
    fathersName: '',
    dob: new Date(),
    mobileNo: '',
    email: '',
    personalEmail: '',
    address: '',
    state: '',
    city: '',
    pincode: '',
    profilePhoto: ''

  };
  islogged: boolean = false;
  loggedinuser: string = '';
  selecteduser: any;
  usertype: any;
  message: string = "";
  selectedfiles!: FileList;
  imgURL: string = '';
  isProfileExist: boolean = false;
  userName: string = '';

  constructor(private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private userprofileservice: UserprofileService,
    private imageUploadService: ImageUploadService,
    private notifyservice: NotifierService) { }

  ngOnInit(): void {
    this.islogged = localStorage['islogged'] === 'true';
    this.usertype = localStorage['usertype'];
    this.loggedinuser = localStorage['userid'];
    this.userName = localStorage['loggedinuser'];

    if (this.userName === 'Shailendra Jethiwal') {

      this.route.queryParamMap.subscribe(params => {
        this.selecteduser = params.get('userid')?.toString(); // Get 'id' from query parameters
       
      });

      this.GetUserProfile( this.selecteduser);
    }
    else {
      this.GetUserProfile(this.loggedinuser);
    }
    console.log('loggedinuser User ID:', this.loggedinuser);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedfiles = event.target.files;
    if (file) {
      if (file.size > 1048576) {
        this.notifyservice.ShowError("Error in payment", 'File size exceeds 1 MB. Please select a smaller file.');

        event.target.value = ''; // Clear the file input
        return;
      }
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.imgURL = e.target.result;
        this.userprofile.profilePhoto = file.name;

      }
      reader.readAsDataURL(file);
    }
  }

  GetUserProfile(userid: string) {
    console.log(userid + "  PRofile ");
    this.userprofileservice.getUserProfile(userid)
      .subscribe(
        (data: IUserProfile) => {
          this.userprofile = data;
          this.isProfileExist = true;
          this.imgURL = '/assets/course/' + this.userprofile.profilePhoto;
          console.log(data);
        }
      );

  }
  onNameInput() {
    this.userprofile.fullName = this.userprofile.fullName.toUpperCase();
  }

  CreateUserProfile() {

    if (this.isProfileExist) {
      this.upload();
      this.userprofileservice.updateUserProfile(this.userprofile, this.userprofile.id)
        .subscribe(
          (data: IUserProfile) => {
            this.message = 'Profile updated';
          }
        );
    }
    else {
      this.userprofile.userid = localStorage['userid'];
      this.userprofileservice.createUserProfile(this.userprofile)
        .subscribe(
          (data: IUserProfile) => {
            this.message = 'Profile created';
          }
        );
    }

  }
  upload(): void {
    const formData: FormData = new FormData;
    let newfilename = this.loggedinuser + '_' + this.selectedfiles[0].name;
    formData.append('postedFiles', this.selectedfiles[0], newfilename);
    this.userprofile.profilePhoto = newfilename;
    this.imageUploadService.uploadImage(formData).subscribe((data: any) => {

    },
      (error) => {
        console.log('upload error : ', error);
      })
  }

}


