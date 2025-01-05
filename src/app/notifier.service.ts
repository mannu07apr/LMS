import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  constructor(private tostr:ToastrService) { }

  ShowSuccess(title:string,msg:string){
    this.tostr.success(msg,title);
  }
  ShowError(title:string,msg: string) {
    this.tostr.error(msg,title);
    }
}
