import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { icoupon } from '../../assets/model/icoupon';
import { CouponService } from '../coupon.service';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrl: './coupon.component.css'
})
export class CouponComponent  implements OnInit {
  
  coupon: icoupon = {
    couponId: 0,
    couponCode: '',
    membershipID: 0,
    active: true,
    amount: 0,
    startDate: new Date(),
    endDate:  new Date()
  };
coupons:icoupon[]=[];
  message: string='';

  constructor(private couponservice:CouponService) { }

  ngOnInit(): void {
   this.getCoupons();
  }

  onSubmit(): void {
    this.createcoupon();
  }
  getCoupons(){
       this.couponservice.getcoupon().subscribe(
        (data:icoupon[])=>{
          this.coupons=data;
        }
      );
  }
  createcoupon(){
    
    this.couponservice.editcoupon(this.coupon.couponId, this.coupon)
    .subscribe(
      (data: icoupon) => {
      //  this.uploaded = true;
        
        //  this.uploaded = false;
         // this.progress = 0;
          //if (!this.uploaded) {
            this.message = 'Content updated';
          //}
        
      }
    );
  }
}