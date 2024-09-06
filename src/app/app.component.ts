import { Component } from '@angular/core';
import { GuardsCheckEnd, GuardsCheckStart, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

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
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'todo';
  isChecking = false;
  constructor(private router: Router, private authService: AuthService, private http: HttpClient) {
  }
  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof GuardsCheckStart)
        this.isChecking = true;

      if (event instanceof GuardsCheckEnd) {
        this.isChecking = false;
      }

    })
    this.authService.user$.subscribe(user => {
      console.log({ user });
    })
    console.log({ accessToken: localStorage.getItem("accessToken") });

    // ngOnInit() {
    this.http.get<Response>('http://localhost:3040/api/user/profile',
      { headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` } })
      .subscribe({
        next: (response) => {
          if (!response.user) this.authService.userSource.next(null)
          this.authService.userSource.next(response.user);
          console.log({ response });
        },
        error: error => {
          this.authService.userSource.next(null)
          console.log({ error });
        }
      })
    // }
  }
}
