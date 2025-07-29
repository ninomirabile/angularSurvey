import { Component, Input, Output, EventEmitter, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface ModalConfig {
  title?: string;
  content?: string;
  showCloseButton?: boolean;
  showBackdrop?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnBackdropClick?: boolean;
  actions?: ModalAction[];
}

export interface ModalAction {
  label: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  action?: () => void;
}

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div 
      class="fixed inset-0 z-50 flex items-center justify-center"
      [class]="backdropClasses()"
      (click)="onBackdropClick($event)"
    >
      <div 
        class="bg-white rounded-lg shadow-strong max-h-[90vh] overflow-hidden"
        [class]="modalClasses()"
        (click)="$event.stopPropagation()"
      >
        <!-- Header -->
        @if (config().title) {
          <div class="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 class="text-xl font-semibold text-gray-900">{{ config().title }}</h2>
            @if (config().showCloseButton !== false) {
              <button
                type="button"
                class="text-gray-400 hover:text-gray-600 transition-colors"
                (click)="close()"
              >
                <mat-icon>close</mat-icon>
              </button>
            }
          </div>
        }

        <!-- Content -->
        <div class="p-6">
          @if (config().content) {
            <p class="text-gray-700">{{ config().content }}</p>
          }
          <ng-content></ng-content>
        </div>

        <!-- Actions -->
        @if (config().actions && config().actions!.length > 0) {
          <div class="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
            @for (action of config().actions!; track action.label) {
              <button
                type="button"
                class="px-4 py-2 rounded-lg font-medium transition-colors"
                [class]="getActionClasses(action.variant)"
                (click)="handleAction(action)"
              >
                {{ action.label }}
              </button>
            }
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ModalComponent {
  @Input() config = signal<ModalConfig>({});
  @Output() closeModal = new EventEmitter<void>();
  @Output() actionClicked = new EventEmitter<ModalAction>();

  backdropClasses = computed(() => {
    const config = this.config();
    return config.showBackdrop !== false 
      ? 'bg-black bg-opacity-50 backdrop-blur-sm' 
      : '';
  });

  modalClasses = computed(() => {
    const config = this.config();
    const sizeClasses = {
      sm: 'w-full max-w-sm',
      md: 'w-full max-w-md',
      lg: 'w-full max-w-lg',
      xl: 'w-full max-w-xl'
    };
    return sizeClasses[config.size || 'md'] || sizeClasses.md;
  });

  onBackdropClick(event: Event): void {
    const config = this.config();
    if (config.closeOnBackdropClick !== false) {
      this.close();
    }
  }

  close(): void {
    this.closeModal.emit();
  }

  handleAction(action: ModalAction): void {
    if (action.action) {
      action.action();
    }
    this.actionClicked.emit(action);
  }

  getActionClasses(variant?: string): string {
    const baseClasses = 'px-4 py-2 rounded-lg font-medium transition-colors';
    const variantClasses = {
      primary: 'bg-primary-500 text-white hover:bg-primary-600',
      secondary: 'bg-gray-500 text-white hover:bg-gray-600',
      danger: 'bg-red-500 text-white hover:bg-red-600',
      ghost: 'bg-transparent text-gray-700 hover:bg-gray-100'
    };
    return `${baseClasses} ${variantClasses[variant as keyof typeof variantClasses] || variantClasses.ghost}`;
  }
} 