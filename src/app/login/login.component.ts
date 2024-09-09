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
  isLoading = false;
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
    this.isLoading = true;
    console.log(this.formData);
    this.http.post<Response>('http://localhost:3040/api/user/login', this.formData.value).subscribe({
      next: data => {
        console.log({ data });
        localStorage.setItem('accessToken', data.authToken);
        this.authService.user$.next(data.user);
        this.toastService.pushToast({
          message: "Logged in successfully",
          status: 'success'
        })
        this.router.navigate(["/todos"])
      },
      error: error => {
        console.log({ error });
        this.toastService.pushToast({
          message: "Invalid Email or Password",
          status: 'error'
        })
      }, complete: () => {
        this.isLoading = false;
      }
    });
  }

  // toggleAttempted(){
  //   this.isAttempted = true;
  // }
}
