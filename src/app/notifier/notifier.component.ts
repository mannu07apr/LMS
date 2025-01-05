import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NotifierService } from '../notifier.service';
@Component({
  selector: 'app-notifier',
  templateUrl: './notifier.component.html',
  styleUrl: './notifier.component.css'
})
export class NotifierComponent implements OnInit {


  /**
   *
   */
  constructor(private toastservice:NotifierService) {
    
  }
  ngOnInit(): void {
      
  }

  ShowSuccess(msg:string){
    this.toastservice.ShowSuccess(msg,"SUCCESS");
  }
  ShowError(msg: string) {
    this.toastservice.ShowError(msg,"ERROR");
    }
}
