import { Component, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() isChecking = false;
  user: any = null;
  constructor(protected authService: AuthService, protected router: Router, protected toastService: ToastService) { }
  ngOnInit() {
    this.authService.user$.subscribe(user => {
      console.log({ user });
      this.user = user
    })
  }

  logout() {
    this.toastService.pushToast({
      status: "success",
      message: "Logout out successfully"
    })
  }
}
