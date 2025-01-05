import { Component } from '@angular/core';
import { Iservice } from '../../assets/model/Iservice';
// import { Iservice} from 'src/assets/model/Iservice';
interface Istudent {
  studentname: string;
  age: number;
  totalFee: number;
}

@Component({
  selector: 'app-mponline',
  templateUrl: './mponline.component.html',
  styleUrl: './mponline.component.css',
})
export class MponlineComponent {
  servicesicon: Iservice[] = [
    { icon: '1', file: '1.pdf', desc: 'Nice to Meet You' },
    { icon: '2', file: '1.pdf', desc: 'Nice 2 to Meet You' },
    { icon: '3', file: '1.pdf', desc: 'Nice 3to Meet You' },
    { icon: '4', file: '1.pdf', desc: 'Nice 4to Meet You' },
  ];
  listofstudent: Istudent[] = [
    {
      studentname: 'shai',
      age: 40,
      totalFee: 5550,
    },
    {
      studentname: 'deepi',
      age: 45,
      totalFee: 5543,
    },
  ];

  // student:string='ravi';
  // age:number=20;
  // totalFee:number=5000;
}
