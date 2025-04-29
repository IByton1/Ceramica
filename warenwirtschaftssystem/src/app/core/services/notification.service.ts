import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
export type StringOrPromise = string | (() => Promise<string>);

export interface ErrNotificationHandler {
  notify?: StringOrPromise;
  messageType?: 'error' | 'warn' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  showSuccess(message: string, duration: number = 3000, title?: string): void {
    this.showNotification(message, 'success', duration, title);
  }

  showError(message: string, duration: number = 3000, title?: string): void {
    this.showNotification(message, 'error', duration, title);
  }

  showHint(message: string, duration: number = 3000, title?: string): void {
    this.showNotification(message, 'warn', duration, title);
  }


  private showNotification(message: string, type: string, duration: number, title?: string): void {
    const config = {
      progressBar: true,
      timeOut: duration,
      positionClass: 'toast-bottom-center',
    };
    switch (type) {
      case 'success':
        this.toastr.success(message, title, config);
        break;
      case 'error':
        this.toastr.error(message, title, config);
        break;
      case 'warn':
        this.toastr.warning(message, title, config);
        break;
      default:
        this.toastr.info(message, title, config);
        break;
    }
  }
}
