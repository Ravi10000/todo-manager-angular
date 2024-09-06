import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
enum Type {
  success, error, warning, info
}
interface Toast {
  message: string
  type: string
}
@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toastSource = new BehaviorSubject<Toast | null>(null);
  toast$ = this.toastSource.asObservable();
  constructor() { }
}
