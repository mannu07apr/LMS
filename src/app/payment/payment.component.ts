import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ipayment } from '../../assets/model/ipayment';
import { NgModule } from '@angular/core';
import { CouponService } from '../coupon.service';
import { NotifierService } from '../notifier.service';
import { ImageUploadService } from '../image-upload.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {

  MembershipId!: string;
  formData = new FormData();
  userid: number = 0;
  formattedDate: String = '';
  paymentData: ipayment = {
    paymentId: 0,
    userid: 0,
    userCode:'',
    membershipid: 0,
    paidamount: 0,
    dateOfPayment: new Date(),
    paymentMode: '',
    partOrFull: '',
    transactionID: '',
    referenceNo: '',
    imageName: ''
  };
  selectedfiles!: FileList;
  imgURL: string = '';
  usercode: string='';


  constructor(
    private route: ActivatedRoute,
    private couponservice: CouponService,
    private notifyservice: NotifierService,
  private imageUploadService: ImageUploadService) { }

  ngOnInit(): void {
    // Retrieve the route parameter
    let today = new Date();
    // Format the date to 'YYYY-MM-DD' format
    this.formattedDate = today.toISOString().split('T')[0];
    this.MembershipId = this.route.snapshot.paramMap.get('id') || '';
    this.userid = localStorage['userid'];
    this.usercode = localStorage['usercode'];
    this.paymentData.userid = this.userid;
    this.paymentData.userCode = this.userid.toString();
    this.paymentData.membershipid = parseInt(this.MembershipId);
    this.paymentData.dateOfPayment = new Date();
    // If you expect the parameter to change while on the same component, use subscribe
    this.route.paramMap.subscribe(params => {
      this.MembershipId = params.get('id') || '';
      console.log('Selected MembershipId ID:', this.MembershipId);
    });


  }

  onSubmit() {
    this.upload();
    this.couponservice.createpayment(this.paymentData).subscribe(
      (response) => {
        console.log(response);
        if (response) {
        
          this.notifyservice.ShowSuccess("Upload", "Payment detail submitted.");
        }
      },
      (error) => {
        const errorMessage = error.error;
        // Handle error if needed, though error handling is already in the service
        console.error('An error occurred while submitting payment:', errorMessage);
        this.notifyservice.ShowError("Error in payment", errorMessage);
      }
    );

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
       
      }
      reader.readAsDataURL(file);
    }
  }
  
  upload(): void {
    const formData: FormData = new FormData;
    let newfilename = this.paymentData.transactionID + '_' + this.selectedfiles[0].name;
    formData.append('postedFiles', this.selectedfiles[0], newfilename);
    this.paymentData.imageName = newfilename;
    this.imageUploadService.uploadImage(formData).subscribe((data: any) => {
    },
      (error) => {
        console.log('upload error : ', error);
      })
  }

}
