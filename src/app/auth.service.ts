import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
  // public userSource = new BehaviorSubject<User | null | undefined>(undefined);
  // user$ = this.userSource.asObservable();
  user$ = new BehaviorSubject<User | null | undefined>(undefined);
  constructor(private http: HttpClient) { }
  // ngOnInit() {
  //   this.http.get<Response>('http://localhost:3040/api/auth/profile',
  //     { headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` } })
  //     .subscribe({
  //       next: (response) => {
  //         if (!response.user) this.userSource.next(null)
  //         this.userSource.next(response.user);
  //         console.log({ response });
  //       },
  //       error: error => {
  //         this.userSource.next(null)
  //         console.log({ error });
  //       }
  //     })
  // }
}
