import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Button Components
import { PrimaryButtonComponent } from './buttons/primary-button.component';

// Modal Components
import { ModalComponent } from './modals/modal.component';

// Feedback Components
import { ToastComponent } from './feedback/toast.component';

// Form Components
import { InputFieldComponent } from './forms/input-field.component';

// Card Components
import { CardComponent } from './cards/card.component';

const COMPONENTS = [
  PrimaryButtonComponent,
  ModalComponent,
  ToastComponent,
  InputFieldComponent,
  CardComponent
];

@NgModule({
  imports: [
    CommonModule,
    ...COMPONENTS
  ],
  exports: COMPONENTS
})
export class SharedUiModule { } 