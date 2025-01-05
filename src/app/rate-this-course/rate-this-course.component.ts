import { Component } from '@angular/core';

@Component({
  selector: 'app-rate-this-course',
  templateUrl: './rate-this-course.component.html',
  styleUrl: './rate-this-course.component.css'
})
export class RateThisCourseComponent {
  stars: number[] = [1, 2, 3, 4, 5]; // Array to represent stars
  currentRating = 0; // User's current rating
  tempRating = 0; // Temporary rating for hover effect

  rateCourse(rating: number) {
    this.currentRating = rating; // Set the selected rating
  }

  hoverRating(rating: number) {
    this.tempRating = rating; // Set temporary rating for hover effect
  }
}
