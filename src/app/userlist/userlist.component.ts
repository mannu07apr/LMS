import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { UserprofileService } from '../userprofile.service';
import { iuser } from '../../assets/model/Iuser';


@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.css'
})
export class UserlistComponent implements OnInit {
  message: string = "";
  users: iuser[] = [];
  updateuser: iuser | undefined;
  // DevApiUrl: string = "https://192.168.1.4:5555";
  //private ProdApiUrl: string = "http://localhost:5555";
   ProdApiUrl: string = "http://learn.excelonlineservices.com/";

  constructor(private http: HttpClient, private userService: UserprofileService) {

  }
  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    let headers = new HttpHeaders();

    headers = headers.append("Authorization", `Bearer ${localStorage['token']}`);
    this.http.get<iuser[]>(this.ProdApiUrl + "api/Users", { headers }).subscribe(
      (response) => {

        this.users = response;
      },
      (errors) => {
        console.log(errors.message);
        this.message = "Unauthorized access, Please login with valid credentials.";
      }
    );

  }



  onChangeTypeClick(updateuserId: string, updatedUserType: string): void {

    const newUserType = updatedUserType === 'Paid' ? 'Free' : 'Paid';

    let updateuser = this.users.filter(c => c.userId === updateuserId);
    updateuser[0].type = newUserType;
   
    this.userService.updateUserType(updateuserId, newUserType, updateuser[0]).subscribe(
      (data: iuser) => {
         console.log(data);
      }
    );;
  }

  onclick(): void {
    this.exportToExcel();
    this.message = "Data exports";
  }
  exportToExcel(): void {
    const data = this.users; // Replace with your data retrieval logic
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'exported_data.xlsx');
  }

}

