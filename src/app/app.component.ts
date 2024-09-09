import { Component } from '@angular/core';
import { GuardsCheckEnd, GuardsCheckStart, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { ToastService } from './toast.service';
import { HeaderComponent } from './header/header.component';
import { ToastComponent } from './toast/toast.component';
import { CommonModule } from '@angular/common';

interface User {
  email: string;
}
interface Response {
  status: string;
  message: string;
  user: null | User
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, HeaderComponent, ToastComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'todo';
  isChecking = false;
  toast: any;
  constructor(private router: Router, private authService: AuthService, private http: HttpClient, private toastService: ToastService) {
  }
  ngOnInit() {
    this.toastService.toast$.subscribe(toast => {
      this.toast = toast
      // if (toast)
      //   setTimeout(() => {
      //     this.toastService.toast$.next(null)
      //   }, 3_000)
    });
    this.router.events.subscribe(event => {
      console.log({ event });
      if (event instanceof GuardsCheckStart)
        this.isChecking = true;

      if (event instanceof GuardsCheckEnd || event instanceof NavigationEnd)
        this.isChecking = false;
    })
    if (!localStorage.getItem("accessToken")) {
      this.authService.user$.next(null)
    } else {
      this.http.get<Response>('http://localhost:3040/api/user/profile',
        { headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` } })
        .subscribe({
          next: (response) => {
            if (!response.user) this.authService.user$.next(null)
            this.authService.user$.next(response.user);
            console.log({ response });
          },
          error: error => {
            this.authService.user$.next(null)
            console.log({ error });
          }
        })
    }
  }
}
