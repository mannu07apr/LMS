import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesComponent } from './services/services.component';
import { ContactusComponent } from './contactus/contactus.component';
import { HomeComponent } from './home/home.component';
import { SchoolComponent } from './school/school.component';
import { MponlineComponent } from './mponline/mponline.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserlistComponent } from './userlist/userlist.component';
import { TempComponent } from './temp/temp.component';
import { CourseComponent } from './course/course.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';
import { AboutComponent } from './about/about.component';
import { ImgcrationComponent } from './imgcration/imgcration.component';
import { UploadComponent } from './upload/upload.component';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { ProfileComponent } from './profile/profile.component';
import { SitebarComponent } from './sitebar/sitebar.component';
import { AddcoursecontentComponent } from './addcoursecontent/addcoursecontent.component';
import { MembershiphomeComponent } from './membershiphome/membershiphome.component';
import { CouponComponent } from './coupon/coupon.component';
import { UserpanelComponent } from './userpanel/userpanel.component';
import { NotifierComponent } from './notifier/notifier.component';
import { CoursecontentComponent } from './coursecontent/coursecontent.component';


const routes: Routes = [
  { path: '', component: CourseComponent },
  { path: 'services', component: ServicesComponent, canActivate: [authGuard] },
  { path: 'contact', component: ContactusComponent },
  { path: 'home', component: HomeComponent },
  { path: 'school', component: SchoolComponent, canActivate: [authGuard] },
  { path: 'mponline', component: MponlineComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'temp', component: TempComponent },
  { path: 'course', component: CourseComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'imgcration', component: ImgcrationComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'adminpanel', component: AdminpanelComponent },
  { path: 'landingpage', component: LandingpageComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'sitebar', component: SitebarComponent },
  { path: 'coursecontent', component: AddcoursecontentComponent },
  { path: 'adminpanel', component: AdminpanelComponent },
  { path: 'users', component: UserlistComponent },
  { path: 'membershipcard', component: MembershiphomeComponent },
  { path: 'coupon', component: CouponComponent },
  { path: 'userpanel', component: UserpanelComponent },
  { path: 'coursecontentlist', component: CoursecontentComponent },
  { path: 'toastr', component: NotifierComponent }

];

@NgModule({
  imports: [

    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


