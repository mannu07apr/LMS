import { Component } from '@angular/core';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.css'
})
export class ContactusComponent {
  contact = {
    name: '',
    email: '',
    message: ''
  };

  onSubmit() {
    if (this.contact.name && this.contact.email && this.contact.message) {
      // Handle form submission, e.g., send the contact information to a server.
      console.log('Contact Us form submitted:', this.contact);
      alert('Thank you for your message!');
      
      // Optionally, reset the form after submission
      this.contact = {
        name: '',
        email: '',
        message: ''
      };
    }
  }
}

