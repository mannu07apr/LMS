import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpEventType } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class MediaService {
  fileSizeUnit: number = 1024;
  public isApiSetup = false;

  constructor(private http: HttpClient) {}

  getFileSize(fileSize: number): number {
    if (fileSize > 0) {
      if (fileSize < this.fileSizeUnit * this.fileSizeUnit) {
        fileSize = parseFloat((fileSize / this.fileSizeUnit).toFixed(2));
      } else if (
        fileSize <
        this.fileSizeUnit * this.fileSizeUnit * this.fileSizeUnit
      ) {
        fileSize = parseFloat(
          (fileSize / this.fileSizeUnit / this.fileSizeUnit).toFixed(2)
        );
      }
    }

    return fileSize;
  }

  getFileSizeUnit(fileSize: number) {
    let fileSizeInWords = 'bytes';

    if (fileSize > 0) {
      if (fileSize < this.fileSizeUnit) {
        fileSizeInWords = 'bytes';
      } else if (fileSize < this.fileSizeUnit * this.fileSizeUnit) {
        fileSizeInWords = 'KB';
      } else if (
        fileSize <
        this.fileSizeUnit * this.fileSizeUnit * this.fileSizeUnit
      ) {
        fileSizeInWords = 'MB';
      }
    }

    return fileSizeInWords;
  }

  uploadMedia(formData: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    // const API_BASE_URL= 'http://learn.excelonlineservices.com/';
    const API_BASE_URL= 'http://learn.excelonlineservices.com/';
    //const API_BASE_URL:  string = "http://localhost:5555";
    const uploadURL = API_BASE_URL+'api/Image/UploadImage';

    return this.http
      .post(uploadURL, formData, {
        headers,
        reportProgress: true,
        observe: 'events',
      })
      .pipe(
        map((event) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:            
            const progress = Math.round((100 * event.loaded) / (event.total || 1));
              return { status: 'progress', message: progress };

            case HttpEventType.Response:
              return event.body;
            default:
              return `Unhandled event: ${event.type}`;
          }
        })
      );
  }
  convertSeconds(seconds: number): string {
    
    const hrs = seconds>0 ? Math.floor(seconds/ 3600) :0;
    const mins =seconds>0 ? Math.floor((seconds % 3600) / 60) :0;
    const secs = seconds>0 ?Math.floor(seconds % 60) :0;

    return `${this.pad(hrs)}:${this.pad(mins)}:${this.pad(secs)}`;
  }
  pad(value: number): string {
    return value < 10 ? '0' + value : value.toString();
  }
}
