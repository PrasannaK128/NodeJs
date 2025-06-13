import { Component } from '@angular/core';
import { Signup } from '../../signup';
import { FormsModule } from '@angular/forms';
import { ServicesService } from '../../services.service';

@Component({
  selector: 'app-signup',
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  standalone:true
})
export class SignupComponent {
  constructor(private services:ServicesService){

  }
    signup:Signup=new Signup();
    ngOnInit()
    {
      console.log("hello")
    }

     onSubmit() {
    this.services.postData(this.signup).subscribe({
      next: (res) => {
        console.log('Signup successful:', res);
        alert('Signup successful!');
      },
      error: (err) => {
        console.error('Signup failed:', err);
        alert('Signup failed. Please try again.');
      }
    });
  }





  }



