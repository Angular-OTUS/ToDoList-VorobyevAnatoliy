import {Injectable, signal} from '@angular/core';
import {Toast, ToastData} from '../models/toast';
import {getNextId} from '../helpers/generator-id';

@Injectable({
  providedIn: 'root',
})
export class ToastService {

  readonly toasts = signal<Toast[]>([])

  showInfo(message: string): void {
    this.showToast({type: "info", message, durationMillis: 1500})
  }

  showSuccess(message: string): void {
    this.showToast({type: "success", message, durationMillis: 3000})
  }

  showWarning(message: string): void {
    this.showToast({type: "warning", message, durationMillis: 5000})
  }

  showError(message: string): void {
    this.showToast({type: "error", message, durationMillis: 5000})
  }

  showToast(toastData: ToastData): void {
    const newToast: Toast = {...toastData, id: getNextId(this.toasts())}
    this.toasts.update((toasts) => [...toasts, newToast])
    setTimeout(() => {
      this.toasts.update((toasts) => toasts.filter(t => t.id !== newToast.id))
    }, newToast.durationMillis)
  }
}
