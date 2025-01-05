import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }
  private headerBtnTextSubject = new BehaviorSubject<string>('Login/Signup');
  public headerbtntext$: Observable<string> = this.headerBtnTextSubject.asObservable();
  //private headerbtntext = new BehaviorSubject<string>('Login / Signup');
  private usertypetext = new BehaviorSubject<string>('Free');
  usertypetext$ = this.usertypetext.asObservable();

  changetext(newText: string) {
    this.headerBtnTextSubject.next(newText);
  }
  changeUserType(usertext: string) {
    this.usertypetext.next(usertext);
  }
}
