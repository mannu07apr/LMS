import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private sharedservice: SharedService,private authService:AuthService) {
    
    
  }
  ngOnInit(): void {
    localStorage.setItem('usertype', 'Free');
  //  this.sharedservice.changeUserType("Free");
  }

}
interface Course {
  id: number;
  title: string;
  description: string;
}

const courses: Course[] = [
  { id: 1, title: "Course 1", description: "Siver Membership" },
  { id: 2, title: "Course 2", description: "Gold Membership" },
  { id: 3, title: "Course 3", description: "Platinum Membership" },
];


function handleCourseClick(courseId: number): void {
  // Navigate to the course page
  alert(`Navigating to Course ${courseId}`);
  // window.location.href = `/course/${courseId}`;
}
