import { Component, OnInit } from '@angular/core';
import { iresource } from '../../assets/model/iresource';
import { icoursecontent } from '../../assets/model/icoursecontent';
import { CourseService } from '../course.service';
import { ImageUploadService } from '../image-upload.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-content-resource',
  templateUrl: './content-resource.component.html',
  styleUrl: './content-resource.component.css'
})
export class ContentResourceComponent implements OnInit {
  tabs = [
    { label: 'Description' },
    { label: 'Resource' },
    { label: 'Q&A' }
  ];
  activeTabIndex = 0;
  htmlContent: SafeHtml | undefined;
  resourcelist: iresource[] = [];
  courseContents: icoursecontent | undefined;


  constructor(private courseService: CourseService, 
    private imageUploadService: ImageUploadService,
    private sanitizer: DomSanitizer
  ) {


  }
  activateTab(index: number): void {
    const contentId = localStorage['contentid'];
    const userid = localStorage['contentid'];
    this.currcontentid = contentId;

    this.activeTabIndex = index;
    this.GetResourceList(this.currcontentid);
    this.courseService.getcontentdetailbyid(userid, contentId)
      .subscribe(
        (data: icoursecontent) => {
          this.courseContents = data;
          this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(this.courseContents.description);
          
        }
      );
    

  }

  currcontentid: number = 0;

  ngOnInit(): void {


  }

  GetResourceList(courseid: number) {
    this.imageUploadService.getResourceFiles(courseid)
      .subscribe(
        (data: any) => {
          this.resourcelist = data.result;

        }
      );
  }

}
