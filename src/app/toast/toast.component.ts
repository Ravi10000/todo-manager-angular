import { Component } from '@angular/core';
import { ToastService } from '../toast.service';
import { NgClass } from '@angular/common';

interface Toast {
  message: string
  status: string
}
@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [NgClass],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  toast: null | Toast = null;
  constructor(protected toastService: ToastService) { }
  ngOnInit() {
    this.toastService.toast$.subscribe(toast => {
      this.toast = toast;
      console.log({ toast });
    })
  }
}
