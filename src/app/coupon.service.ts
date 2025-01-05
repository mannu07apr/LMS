import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { icourse } from '../assets/model/icourse';
import { icoupon } from '../assets/model/icoupon';

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  //private ProdApiUrl: string = "http://localhost:5555";
   private ProdApiUrl: string = "http://learn.excelonlineservices.com";
  private getcouponnurl: string = '/api/coupon';

  constructor(private http: HttpClient) {}

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


}
