import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

export interface NotificationOptions {
  duration?: number;
  action?: string;
  horizontalPosition?: 'start' | 'center' | 'end' | 'left' | 'right';
  verticalPosition?: 'top' | 'bottom';
  panelClass?: string | string[];
}

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private snackBar = inject(MatSnackBar);

  private readonly DEFAULT_CONFIG: MatSnackBarConfig = {
    duration: 4000,
    horizontalPosition: 'end',
    verticalPosition: 'top',
    panelClass: ['notification-snackbar']
  };

  private readonly TYPE_CONFIGS: Record<NotificationType, Partial<MatSnackBarConfig>> = {
    success: {
      panelClass: ['notification-snackbar', 'notification-success'],
      duration: 3000
    },
    error: {
      panelClass: ['notification-snackbar', 'notification-error'],
      duration: 6000
    },
    warning: {
      panelClass: ['notification-snackbar', 'notification-warning'],
      duration: 5000
    },
    info: {
      panelClass: ['notification-snackbar', 'notification-info'],
      duration: 4000
    }
  };

  success(message: string, options?: NotificationOptions): Observable<void> {
    return this.show(message, 'success', options);
  }

  error(message: string, options?: NotificationOptions): Observable<void> {
    return this.show(message, 'error', options);
  }

  warning(message: string, options?: NotificationOptions): Observable<void> {
    return this.show(message, 'warning', options);
  }

  info(message: string, options?: NotificationOptions): Observable<void> {
    return this.show(message, 'info', options);
  }

  private show(
    message: string, 
    type: NotificationType = 'info', 
    options?: NotificationOptions
  ): Observable<void> {
    const config = this.buildConfig(type, options);
    
    const snackBarRef = this.snackBar.open(message, options?.action || 'Close', config);
    
    return new Observable(observer => {
      snackBarRef.afterDismissed().subscribe(() => {
        observer.next();
        observer.complete();
      });
    });
  }

  private buildConfig(type: NotificationType, options?: NotificationOptions): MatSnackBarConfig {
    const baseConfig = { ...this.DEFAULT_CONFIG };
    const typeConfig = { ...this.TYPE_CONFIGS[type] };
    const userConfig = options ? this.mapOptionsToConfig(options) : {};

    return {
      ...baseConfig,
      ...typeConfig,
      ...userConfig
    };
  }

  private mapOptionsToConfig(options: NotificationOptions): Partial<MatSnackBarConfig> {
    const config: Partial<MatSnackBarConfig> = {};

    if (options.duration !== undefined) {
      config.duration = options.duration;
    }

    if (options.horizontalPosition) {
      config.horizontalPosition = options.horizontalPosition;
    }

    if (options.verticalPosition) {
      config.verticalPosition = options.verticalPosition;
    }

    if (options.panelClass) {
      config.panelClass = options.panelClass;
    }

    return config;
  }

  // Convenience methods for common scenarios
  showSaveSuccess(itemName: string = 'Item'): Observable<void> {
    return this.success(`${itemName} saved successfully!`);
  }

  showDeleteSuccess(itemName: string = 'Item'): Observable<void> {
    return this.success(`${itemName} deleted successfully!`);
  }

  showUpdateSuccess(itemName: string = 'Item'): Observable<void> {
    return this.success(`${itemName} updated successfully!`);
  }

  showNetworkError(): Observable<void> {
    return this.error('Network error. Please check your connection and try again.');
  }

  showValidationError(fieldName?: string): Observable<void> {
    const message = fieldName 
      ? `Please check the ${fieldName} field.`
      : 'Please check the form for errors.';
    return this.error(message);
  }

  showPermissionError(): Observable<void> {
    return this.error('You don\'t have permission to perform this action.');
  }

  showLoadingMessage(message: string = 'Loading...'): Observable<void> {
    return this.info(message, { duration: 0 }); // No auto-dismiss
  }

  // Method to dismiss all notifications
  dismissAll(): void {
    this.snackBar.dismiss();
  }

  // Method to show a notification with custom action
  showWithAction(
    message: string, 
    actionText: string, 
    actionCallback: () => void,
    type: NotificationType = 'info',
    options?: NotificationOptions
  ): Observable<void> {
    const config = this.buildConfig(type, options);
    const snackBarRef = this.snackBar.open(message, actionText, config);
    
    snackBarRef.onAction().subscribe(() => {
      actionCallback();
    });

    return new Observable(observer => {
      snackBarRef.afterDismissed().subscribe(() => {
        observer.next();
        observer.complete();
      });
    });
  }
} 