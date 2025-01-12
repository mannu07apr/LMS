import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { icourse } from '../assets/model/icourse';
import { icoursemaster } from '../assets/model/icoursemaster';
import { icoursecontent } from '../assets/model/icoursecontent';
import { iUserProgress } from '../assets/model/iUserProgress';
import { iUpdateProgress } from '../assets/model/iUpdateProgress';



@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private coursejsonurl: string = './assets/course.json';
  private coursecontentjsonurl: string = './assets/coursecontent.json';
//ourseMaster
private coursemasterurl: string = '/api/CourseMaster';
private coursecontentrurl: string = '/api/CourseContent';
private ProgressDetailsrurl: string = '/api/UsersProgress/GetUserProgress';
private ProgressUpdateurl: string = '/api/UsersProgress';
private coursecontentbyidurl: string = '/api/CourseContent/CourseContentByID';
private createcoursemasternurl: string = '/api/CourseMaster/Create';
private editcoursemasternurl: string = '/api/CourseMaster/Edit';
private contentdetailurl: string = '/api/CourseContent/Details';
// private DevApiUrl: string = "http://localhost/";
//private ProdApiUrl: string = "http://localhost:5555";
 private ProdApiUrl: string = "http://learn.excelonlineservices.com";

  constructor(private http: HttpClient) {}

  getcourselist(): Observable<icourse[]> {
    let courselist = this.http.get<icourse[]>(this.coursejsonurl);
    return courselist.pipe(catchError((error) => of<icourse[]>([])));
  }
  getcoursemaster(): Observable<icoursemaster[]> {
    let courselist = this.http.get<icoursemaster[]>(this.ProdApiUrl+this.coursemasterurl);
    return courselist.pipe(catchError((error) => of<icoursemaster[]>([])));
  }
  newcoursemaster(newproduct :  icoursemaster){
    let productObservale = this.http.post<icoursemaster>(this.ProdApiUrl+this.createcoursemasternurl,newproduct);
    return productObservale.pipe(catchError(error => of<icoursemaster>()));
  }
  editcoursemaster(newproduct :  icoursemaster){
    let productObservale = this.http.post<icoursemaster>(this.ProdApiUrl+this.editcoursemasternurl,newproduct);
    return productObservale.pipe(catchError(error => of<icoursemaster>()));
  }

  deleteCourse(courseID: number): Observable<any> {
    const url =this.ProdApiUrl+this.coursemasterurl+"/Delete?id="+courseID;
    return this.http.post(url, { courseID });
  }

  getcourscontent(courseID: number): Observable<icoursecontent[]> {
    let courselist = this.http.get<icoursecontent[]>(this.ProdApiUrl+this.coursecontentrurl);
    return courselist.pipe(catchError((error) => of<icoursecontent[]>([])));
  }
  getcourscontentbyid(userID:number, courseID: number): Observable<icoursecontent[]> {
    let courselist = this.http.get<icoursecontent[]>(this.ProdApiUrl+this.coursecontentbyidurl+"?userId="+userID+"&courseId="+courseID);
    return courselist.pipe(catchError((error) => of<icoursecontent[]>([])));
  }
  getcontentdetailbyid(userID:number, contentID: number): Observable<icoursecontent> {
    let courselist = this.http.get<icoursecontent>(this.ProdApiUrl+this.contentdetailurl+"?coursecontentid="+contentID);
    return courselist.pipe(catchError((error) => of<icoursecontent>()));
  }


  getUserProgressbyid(userID:number, courseID: number): Observable<iUserProgress[]> {
    let courselist = this.http.get<iUserProgress[]>(this.ProdApiUrl+this.ProgressDetailsrurl+"?userid="+userID+"&courseid="+courseID);
    return courselist.pipe(catchError((error) => of<iUserProgress[]>([])));
  }
  newcoursecontent(newproduct :  icoursecontent){
    let productObservale = this.http.post<icoursecontent>(this.ProdApiUrl+this.coursecontentrurl+"/Create",newproduct);
    return productObservale.pipe(catchError(error => of<icoursecontent>()));
  }
  updtaecoursecontent(coursecontentID: number,newproduct :  icoursecontent){
    let productObservale = this.http.post<icoursecontent>(this.ProdApiUrl+this.coursecontentrurl+"/Edit?id="+coursecontentID,newproduct);
    return productObservale.pipe(catchError(error => of<icoursecontent>()));
  }
  deleteCourseContent(coursecontentID: number): Observable<any> {
    const url =this.ProdApiUrl+this.coursecontentrurl+"/Delete?id="+coursecontentID;
    return this.http.post(url, { coursecontentID });
  }

  updateProgress(userID: number,progress:iUpdateProgress): Observable<any> {
    let productObservale = this.http.post<icoursecontent>(this.ProdApiUrl+this.ProgressUpdateurl+"/Edit?UID="+userID,progress);
    return productObservale.pipe(catchError(error => of<icoursecontent>()));
  }
}
