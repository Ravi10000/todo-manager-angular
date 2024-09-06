import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../toast.service';
interface User {
  email: string
}
interface Response {
  authToken: string
  user: User
  status: string
}
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isAttempted = false;
  formData: FormGroup = new FormGroup({});

  ngOnInit() {
    console.log({ is: this.isAttempted });
    this.formData = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  constructor(private http: HttpClient, private authService: AuthService, private router: Router, private toastService: ToastService) { }
  onSubmit() {
    this.isAttempted = true;
    console.log(this.formData);
    this.http.post<Response>('http://localhost:3040/api/user/login', this.formData.value).subscribe({
      next: data => {
        console.log({ data });
        localStorage.setItem('accessToken', data.authToken);
        this.authService.userSource.next(data.user);
        this.toastService.toastSource.next({
          message: "Logged in successfully",
          type: 'success'
        })
        this.router.navigate(["/todos"])
      },
      error: error => {
        console.log({ error });
        this.toastService.toastSource.next({
          message: "Invalid Email or Password",
          type: 'error'
        })
      }
    });
  }

  // toggleAttempted(){
  //   this.isAttempted = true;
  // }
}
