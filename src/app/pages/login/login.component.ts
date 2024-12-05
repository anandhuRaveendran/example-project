import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient,HttpClientModule   } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,HttpClientModule,CommonModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  token: string | null | undefined;

  constructor(private http: HttpClient,private router: Router) {}

  loginForm = new FormGroup({
    email: new FormControl('',[
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('',[Validators.required]),
  });
  ngOnInit() {

    this.token = localStorage.getItem('token');
    if (this.token) {
      this.router.navigate(['/home']);
    }
  }
  handleSubmit() {
   console.log(this.loginForm.value, )
   const data = {
    'email': this.loginForm.value.email,
    'password':this.loginForm.value.password
   }
   const url='https://development.backend.viadots.com/auth/admin/login'
  this.http.post(url, data).subscribe((res:any) =>
  {
   
      console.log(res.data.token)
    localStorage.setItem('token', res.data.token)
    localStorage.setItem('name', res.data.name)

    if (res) {
      this.router.navigate(['/home']);
    }
     }
   );
  //  console.log('response',res)  
  }
 

}
