import { Component, Input, Output, EventEmitter, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

export interface ToastConfig {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  showCloseButton?: boolean;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div 
      class="fixed z-50 flex items-center gap-3 p-4 rounded-lg shadow-medium max-w-sm animate-slide-up"
      [class]="toastClasses()"
      [class]="positionClasses()"
    >
      <!-- Icon -->
      <mat-icon class="flex-shrink-0" [class]="iconClasses()">
        {{ getIcon() }}
      </mat-icon>

      <!-- Message -->
      <div class="flex-1 min-w-0">
        <p class="text-sm font-medium" [class]="messageClasses()">
          {{ config().message }}
        </p>
      </div>

      <!-- Close Button -->
      @if (config().showCloseButton !== false) {
        <button
          type="button"
          class="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
          (click)="close()"
        >
          <mat-icon class="text-lg">close</mat-icon>
        </button>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ToastComponent implements OnInit, OnDestroy {
  @Input() config = signal<ToastConfig>({ message: '' });
  @Output() closeToast = new EventEmitter<void>();

  private timeoutId?: number;

  toastClasses = computed(() => {
    const config = this.config();
    const baseClasses = 'border-l-4';
    const typeClasses = {
      success: 'bg-green-50 border-green-400 text-green-800',
      error: 'bg-red-50 border-red-400 text-red-800',
      warning: 'bg-yellow-50 border-yellow-400 text-yellow-800',
      info: 'bg-blue-50 border-blue-400 text-blue-800'
    };
    return `${baseClasses} ${typeClasses[config.type || 'info']}`;
  });

  positionClasses = computed(() => {
    const config = this.config();
    const positionClasses = {
      'top-right': 'top-4 right-4',
      'top-left': 'top-4 left-4',
      'bottom-right': 'bottom-4 right-4',
      'bottom-left': 'bottom-4 left-4',
      'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
      'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2'
    };
    return positionClasses[config.position || 'top-right'];
  });

  iconClasses = computed(() => {
    const config = this.config();
    const iconClasses = {
      success: 'text-green-500',
      error: 'text-red-500',
      warning: 'text-yellow-500',
      info: 'text-blue-500'
    };
    return iconClasses[config.type || 'info'];
  });

  messageClasses = computed(() => {
    const config = this.config();
    const messageClasses = {
      success: 'text-green-800',
      error: 'text-red-800',
      warning: 'text-yellow-800',
      info: 'text-blue-800'
    };
    return messageClasses[config.type || 'info'];
  });

  ngOnInit(): void {
    const config = this.config();
    if (config.duration && config.duration > 0) {
      this.timeoutId = window.setTimeout(() => {
        this.close();
      }, config.duration);
    }
  }

  ngOnDestroy(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  getIcon(): string {
    const config = this.config();
    const icons = {
      success: 'check_circle',
      error: 'error',
      warning: 'warning',
      info: 'info'
    };
    return icons[config.type || 'info'];
  }

  close(): void {
    this.closeToast.emit();
  }
} 