import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  private DevApiUrl: string = "https://192.168.1.4:5555";
  //private API_BASE_URL: string = "http://localhost:5555";
   private API_BASE_URL= 'http://learn.excelonlineservices.com/';
  private uploadURL = this.API_BASE_URL+'api/Image/UploadImage';
 
  constructor(private http: HttpClient) { }

  uploadImage(formData: FormData): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', `${this.uploadURL}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req)
  }
}
