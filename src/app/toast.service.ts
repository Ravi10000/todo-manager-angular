import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
enum Type {
  success, error, warning, info
}
interface Toast {
  message: string
  status: string
}
@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toast$ = new BehaviorSubject<Toast | null>(null);
  // toast$ = this.toastSource.asObservable();
  constructor() { }
  clear() {
    this.toast$.next(null)
  }
  pushToast(toast: Toast) {
    this.toast$.next(toast);
    setTimeout(() => {
      this.clear()
    }, 3_000)
  }
}
