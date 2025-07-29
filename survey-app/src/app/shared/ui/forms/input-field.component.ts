import { Component, Input, Output, EventEmitter, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

export interface InputFieldConfig {
  label?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  maxlength?: number;
  minlength?: number;
  pattern?: string;
  autocomplete?: string;
  icon?: string;
  iconPosition?: 'left' | 'right';
  errorMessage?: string;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
}

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule],
  template: `
    <div class="w-full">
      <mat-form-field 
        class="w-full"
        [class]="formFieldClasses()"
        [appearance]="'outline'"
      >
        <!-- Label -->
        @if (config().label) {
          <mat-label>{{ config().label }}</mat-label>
        }

        <!-- Input with Icon -->
        <input
          matInput
          [type]="config().type || 'text'"
          [placeholder]="config().placeholder || ''"
          [required]="config().required"
          [disabled]="config().disabled"
          [readonly]="config().readonly"
          [autocomplete]="config().autocomplete || ''"
          [value]="value()"
          (input)="onInput($event)"
          (blur)="onBlur()"
          (focus)="onFocus()"
        />

        <!-- Prefix Icon -->
        @if (config().icon && config().iconPosition !== 'right') {
          <mat-icon matPrefix [class]="iconClasses()">
            {{ config().icon }}
          </mat-icon>
        }

        <!-- Suffix Icon -->
        @if (config().icon && config().iconPosition === 'right') {
          <mat-icon matSuffix [class]="iconClasses()">
            {{ config().icon }}
          </mat-icon>
        }

        <!-- Helper Text -->
        @if (config().helperText) {
          <mat-hint>{{ config().helperText }}</mat-hint>
        }

        <!-- Error Message -->
        @if (config().errorMessage) {
          <mat-error>{{ config().errorMessage }}</mat-error>
        }
      </mat-form-field>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    ::ng-deep .mat-mdc-form-field {
      @apply w-full;
    }

    ::ng-deep .mat-mdc-text-field-wrapper {
      @apply bg-white;
    }

    ::ng-deep .mat-mdc-form-field-focus-overlay {
      @apply bg-transparent;
    }
  `]
})
export class InputFieldComponent {
  @Input() config = signal<InputFieldConfig>({});
  @Input() value = signal<string>('');
  @Output() valueChange = new EventEmitter<string>();
  @Output() blur = new EventEmitter<void>();
  @Output() focus = new EventEmitter<void>();

  formFieldClasses = computed(() => {
    const config = this.config();
    const sizeClasses = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg'
    };
    return sizeClasses[config.size || 'md'];
  });

  iconClasses = computed(() => {
    const config = this.config();
    return config.disabled ? 'text-gray-400' : 'text-gray-500';
  });

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const newValue = target.value;
    this.value.set(newValue);
    this.valueChange.emit(newValue);
  }

  onBlur(): void {
    this.blur.emit();
  }

  onFocus(): void {
    this.focus.emit();
  }
} 