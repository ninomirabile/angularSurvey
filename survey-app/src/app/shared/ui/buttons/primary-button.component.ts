import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-primary-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      mat-raised-button
      [color]="variant === 'primary' ? 'primary' : variant === 'secondary' ? 'accent' : 'basic'"
      [disabled]="disabled"
      [class]="buttonClasses()"
      (click)="onClick.emit($event)"
    >
      @if (icon) {
        <mat-icon [class]="iconClasses()">{{ icon }}</mat-icon>
      }
      @if (loading) {
        <mat-icon class="animate-spin">{{ loadingIcon }}</mat-icon>
      }
      <span>{{ label }}</span>
    </button>
  `,
  styles: [`
    :host {
      display: inline-block;
    }

    button {
      @apply transition-all duration-200;
    }

    .btn-sm {
      @apply px-3 py-1.5 text-sm;
    }

    .btn-md {
      @apply px-4 py-2 text-base;
    }

    .btn-lg {
      @apply px-6 py-3 text-lg;
    }

    .btn-outline {
      @apply border-2 bg-transparent;
    }

    .btn-ghost {
      @apply bg-transparent hover:bg-gray-100;
    }

    .icon-left {
      @apply mr-2;
    }

    .icon-right {
      @apply ml-2;
    }

    .animate-spin {
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `]
})
export class PrimaryButtonComponent {
  @Input() label: string = '';
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() icon?: string;
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() loading: boolean = false;
  @Input() loadingIcon: string = 'refresh';
  @Input() disabled: boolean = false;
  @Output() onClick = new EventEmitter<MouseEvent>();

  buttonClasses(): string {
    const sizeClasses: { [key in ButtonSize]: string } = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg'
    };

    const variantClasses: { [key in ButtonVariant]: string } = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700',
      secondary: 'bg-gray-600 text-white hover:bg-gray-700',
      outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
      ghost: 'text-gray-700 hover:bg-gray-100'
    };

    return `inline-flex items-center gap-2 rounded-lg font-medium transition-colors duration-200 ${sizeClasses[this.size]} ${variantClasses[this.variant] || ''}`.trim();
  }

  iconClasses(): string {
    return this.iconPosition === 'left' ? 'icon-left' : 'icon-right';
  }
} 