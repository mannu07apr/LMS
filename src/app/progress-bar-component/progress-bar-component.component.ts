import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar-component',
  templateUrl: './progress-bar-component.component.html',
  styleUrl: './progress-bar-component.component.css'
})
export class ProgressBarComponentComponent {
  @Input() percentage: string = '0%'; // Input property for percentage string

  /**
   * Parse the numeric value from the percentage string.
   */
  get numericPercentage(): number {
    const value = parseFloat(this.percentage.replace('%', ''));
    return isNaN(value) ? 0 : value; // Handle invalid input
  }
}
