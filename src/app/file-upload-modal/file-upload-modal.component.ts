import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CourseService } from '../course.service';
import { ImageUploadService } from '../image-upload.service';
import { NotifierService } from '../notifier.service';
import { icoursemaster } from '../../assets/model/icoursemaster';
import { icoursecontent } from '../../assets/model/icoursecontent';
@Component({
  selector: 'app-file-upload-modal',
  templateUrl: './file-upload-modal.component.html',
  styleUrl: './file-upload-modal.component.css'
})
export class FileUploadModalComponent {

  contentdetail: icoursecontent;
  selectedFiles: File[] = [];
  progress: number = -1;
  contentid: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FileUploadModalComponent>,
    private imageUploadService: ImageUploadService,    
    private notifyservice: NotifierService,) {
    this.contentdetail = data.contentdetail;
   this.contentid =  this.contentdetail.courseContentID.toString();
  }

  // Handle file selection
  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files); // Convert FileList to an array
    }
  }

  // View the file in a new tab
  viewFile(file: File): void {
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL, '_blank');
  }

  // Remove a file from the list
  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
  }

  // Close the dialog without uploading
  onClose(): void {
    this.dialogRef.close();
  }

  // Handle file upload logic
  onUpload(): void {
    if (this.selectedFiles.length > 0) {
      // Simulate file upload process
      const formData = new FormData();
      
      // Append each file to FormData
      this.selectedFiles.forEach((file) => {
        formData.append('postedFiles', file); // Replace 'files' with the field name expected by your backend
      });

      this.imageUploadService.uploadFiles(formData,this.contentid).subscribe((data: any) => {        
      },
        (error) => {
          console.log('upload error : ', error);
        });
        this.notifyservice.ShowSuccess('Upload', 'Uploading files done:');
      this.dialogRef.close(this.selectedFiles); // Pass the files back to the parent
    }
  }
}
