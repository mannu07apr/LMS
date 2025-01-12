import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SitebarComponent } from './sitebar/sitebar.component';
import { ContactusComponent } from './contactus/contactus.component';
import { SchoolComponent } from './school/school.component';
import { ServicesComponent } from './services/services.component';
import { MponlineComponent } from './mponline/mponline.component';
import { CounslingComponent } from './counsling/counsling.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserlistComponent } from './userlist/userlist.component';
import { HttpClientModule } from '@angular/common/http';
import { TempComponent } from './temp/temp.component';
import { CourseComponent } from './course/course.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { CourseplayerComponent } from './courseplayer/courseplayer.component';
import { UploadComponent } from './upload/upload.component';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { ProfileComponent } from './profile/profile.component';
import { AddcoursecontentComponent } from './addcoursecontent/addcoursecontent.component';
import { SortPipe } from './pipes/sort.pipe';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { VideoPlaylistComponent } from './video-playlist/video-playlist.component';
import { MediaComponent } from './media/media.component';
import { MediaService } from './media.service';
import { MembershiphomeComponent } from './membershiphome/membershiphome.component';
import { CouponComponent } from './coupon/coupon.component';
import { UserpanelComponent } from './userpanel/userpanel.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { ToastrModule } from 'ngx-toastr';
import { NotifierComponent } from './notifier/notifier.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CoursecontentComponent } from './coursecontent/coursecontent.component';
import { ProgressBarComponentComponent } from './progress-bar-component/progress-bar-component.component';
import { RateThisCourseComponent } from './rate-this-course/rate-this-course.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FileUploadModalComponent } from './file-upload-modal/file-upload-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ContentResourceComponent } from './content-resource/content-resource.component';
import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SitebarComponent,
    ContactusComponent,
    SchoolComponent,
    ServicesComponent,
    MponlineComponent,
    CounslingComponent,
    SignupComponent,
    DashboardComponent,
    UserlistComponent,
    TempComponent,
    CourseComponent,
    LoginComponent,
    AboutComponent,
    CourseplayerComponent,
    UploadComponent,
    AdminpanelComponent,
    LandingpageComponent,
    ProfileComponent,
    AddcoursecontentComponent,
    SortPipe,
    VideoPlayerComponent,
    VideoPlaylistComponent,
    MediaComponent,
    MembershiphomeComponent,
    CouponComponent,
    UserpanelComponent,
    UserHeaderComponent,
    NotifierComponent,
    CoursecontentComponent,
    ProgressBarComponentComponent,
    RateThisCourseComponent,
    FileUploadModalComponent,
    ContentResourceComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,  
    QuillModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: "toast-center-center",
      preventDuplicates: true,
      timeOut:3000,
      easing: 'ease-in',
      easeTime :1000
    })
  ],
  providers: [MediaService, { provide: LOCALE_ID, useValue: 'en-IN' }, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
