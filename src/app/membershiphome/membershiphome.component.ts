import { Component, OnInit } from '@angular/core';
import { CouponService } from '../coupon.service';
import { icoupon } from '../../assets/model/icoupon';

@Component({
  selector: 'app-membershiphome',
  templateUrl: './membershiphome.component.html',
  styleUrl: './membershiphome.component.css'
})
export class MembershiphomeComponent implements OnInit {

  coupon: icoupon = {
    couponId: 0,
    couponCode: '',
    membershipID: 0,
    active: false,
    amount: 0,
    startDate: new Date(),
    endDate: new Date()
  };
  coupons: icoupon[] = [];
  constructor(private couponservice: CouponService) {

  }

  ngOnInit(): void {
    this.GetCoupon();
  }
  public GetCoupon() {
    this.couponservice.getcoupon()
      .subscribe(
        (data: icoupon[]) => {
          this.coupons = data;
          //this.coupons = data.filter(d => d.active == true);
          if (this.coupons.length > 0) {
            this.coupon = this.coupons[0];
            console.log(this.coupon);
          }
        }
      );
  }
}
