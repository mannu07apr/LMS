import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { iresource } from '../assets/model/iresource';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  private DevApiUrl: string = "https://192.168.1.4:5555";
  //private API_BASE_URL: string = "http://localhost:5555";
   private API_BASE_URL= 'http://learn.excelonlineservices.com/';
  private uploadURL = this.API_BASE_URL+'api/Image/UploadImage';
  private uploadFileURL = this.API_BASE_URL+'api/Image/UploadFiles';
  private getResourceURL = this.API_BASE_URL+'api/Image/GetFiles';
 
  constructor(private http: HttpClient) { }

  uploadImage(formData: FormData): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', `${this.uploadURL}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req)
  }
  uploadFiles(formData: FormData,contentId:string): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', `${this.uploadFileURL}?courseID=`+contentId, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req)
  }
 getResourceFiles(contentId:number):Observable<iresource[]> {
       let resourcelist = this.http.get<iresource[]>(`${this.getResourceURL}?courseID=`+contentId);
    return resourcelist.pipe(catchError((error) => of<iresource[]>([])));
     
  }
}
