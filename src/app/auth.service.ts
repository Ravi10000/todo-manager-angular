import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
interface Response {
  status: string;
  message: string;
  user: null | User
}
interface User {
  email: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user: User | null = null;
  constructor(private http: HttpClient) { }
  fetchProfile() {
    return this.http.get<Response>('http://localhost:3040/api/auth/profile', { headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` } })
      // .subscribe({
      //   next: response => {
      //     this.user = response.user;
      //     console.log({ response });
      //   },
      //   error: error => {
      //     console.log({ error });
      //   }
      // })
  }
}
