import { Component, OnInit } from '@angular/core';
import { ipayment } from '../../assets/model/ipayment';
import { CouponService } from '../coupon.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-memberships',
  templateUrl: './memberships.component.html',
  styleUrl: './memberships.component.css'
})
export class MembershipsComponent implements OnInit {
  paymentData: ipayment[] = [];
  loggedinuser: any;
  loggedinusername: any;
  usertype:any='';
  userId: number=0;

  constructor(
    private cuponservice: CouponService,    
    private route: ActivatedRoute,) {  }

  ngOnInit(): void {

    this.loggedinuser = localStorage['userid'];    
    this.loggedinusername = localStorage['loggedinuser'];
    this.usertype = localStorage['usertype'];
    
    this.route.queryParams.subscribe(params => {
      this.userId = Number(this.route.snapshot.queryParamMap.get('userid')) ;
      console.log('Selected userId ID:', this.userId);
    });
    this.cuponservice.getPayment()
    .subscribe((data: ipayment[]) => {
      this.paymentData = ((this.loggedinusername === 'Shailendra Jethiwal' || this.usertype === 'Admin') && this.userId === 0)
        ? data
        : data.filter(d => d.userid === this.userId);
    });

  }
  
  getTotalPaidAmount(): number {
    return this.paymentData.reduce((sum, payment) => sum + (payment.paidamount || 0), 0);
  }
}
