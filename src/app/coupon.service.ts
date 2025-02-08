import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { icourse } from '../assets/model/icourse';
import { icoupon } from '../assets/model/icoupon';
import { ipayment } from '../assets/model/ipayment';
import { NotifierService } from './notifier.service';

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  //private ProdApiUrl: string = "http://localhost:5555";
   private ProdApiUrl: string = "http://learn.excelonlineservices.com";
  private getcouponnurl: string = '/api/coupon';
  private paymenturl: string = '/api/payment';

  constructor(private http: HttpClient,private notifyService:NotifierService) {}
 
  getcoupon(): Observable<icoupon[]> {
    let courselist = this.http.get<icoupon[]>(this.ProdApiUrl+this.getcouponnurl);
    return courselist.pipe(catchError((error) => of<icoupon[]>([])));
  }
  createcoupon(coupondata:icoupon): Observable<icoupon> {
    let courselist = this.http.post<icoupon>(this.ProdApiUrl+this.getcouponnurl+'/create',coupondata);
    return courselist.pipe(catchError((error) => of<icoupon>()));
  }
  editcoupon(couponid:number,coupondata:icoupon): Observable<icoupon> {
    let courselist = this.http.post<icoupon>(this.ProdApiUrl+this.getcouponnurl+'/edit?id='+couponid,coupondata);
    return courselist.pipe(catchError((error) => of<icoupon>()));
  }

  createpayment(paymentdata:ipayment) {
    // let payment = this.http.post<ipayment>(this.ProdApiUrl+this.paymenturl,paymentdata);
    // return payment.pipe(catchError((error) => of<ipayment>()));
    return this.http.post<any>(this.ProdApiUrl+this.paymenturl, paymentdata);

  }

  getPayment(): Observable<ipayment[]> {
    let courselist = this.http.get<ipayment[]>(this.ProdApiUrl+this.paymenturl);
    return courselist.pipe(catchError((error) => of<ipayment[]>([])));
  }
}
