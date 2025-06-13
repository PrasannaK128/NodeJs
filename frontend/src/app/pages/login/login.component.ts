import { Component } from '@angular/core';
import { Signup } from '../../signup';
import { ServicesService } from '../../services.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  standalone:true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
constructor(private service:ServicesService,private router:Router){}
  login:Signup=new Signup();
  onSubmit()
  {
       this.service.getData(this.login).subscribe({
        next:(res)=>{
          console.log("Response is=",res)
          localStorage.setItem('token',res.token);
          this.router.navigate(['/dashboard']);

        },
        error:(err)=>{
          console.log(err)
        }
       })
  }
}
