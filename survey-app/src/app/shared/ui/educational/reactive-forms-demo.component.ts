import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray, AbstractControl, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-reactive-forms-demo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTabsModule,
    MatDividerModule,
    MatIconModule,
    MatChipsModule
  ],
  template: `
    <div class="p-6 max-w-6xl mx-auto">
      <mat-card class="mb-6">
        <mat-card-header>
          <mat-card-title class="text-2xl font-bold text-blue-600">
            📝 Reactive Forms vs Template-Driven Forms
          </mat-card-title>
          <mat-card-subtitle class="text-gray-600">
            Modern form handling in Angular 20
          </mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p class="text-gray-700 mb-4">
            Learn the differences between Reactive Forms and Template-Driven Forms, 
            and when to use each approach in Angular 20.
          </p>
        </mat-card-content>
      </mat-card>

      <mat-tab-group>
        <!-- Reactive Forms Tab -->
        <mat-tab label="Reactive Forms">
          <div class="p-6">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <!-- Interactive Form -->
              <mat-card>
                <mat-card-header>
                  <mat-card-title>🔄 Interactive Reactive Form</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <form [formGroup]="reactiveForm" (ngSubmit)="onReactiveSubmit()" class="space-y-4">
                    <mat-form-field appearance="outline" class="w-full">
                      <mat-label>Survey Title</mat-label>
                      <input matInput formControlName="title" placeholder="Enter survey title">
                      <mat-error *ngIf="reactiveForm.get('title')?.hasError('required')">
                        Title is required
                      </mat-error>
                      <mat-error *ngIf="reactiveForm.get('title')?.hasError('minlength')">
                        Title must be at least 3 characters
                      </mat-error>
                    </mat-form-field>

                    <mat-form-field appearance="outline" class="w-full">
                      <mat-label>Description</mat-label>
                      <textarea matInput formControlName="description" rows="3" placeholder="Enter description"></textarea>
                      <mat-error *ngIf="reactiveForm.get('description')?.hasError('maxlength')">
                        Description must be less than 200 characters
                      </mat-error>
                    </mat-form-field>

                    <mat-form-field appearance="outline" class="w-full">
                      <mat-label>Category</mat-label>
                      <mat-select formControlName="category">
                        <mat-option value="education">Education</mat-option>
                        <mat-option value="business">Business</mat-option>
                        <mat-option value="healthcare">Healthcare</mat-option>
                        <mat-option value="technology">Technology</mat-option>
                      </mat-select>
                    </mat-form-field>

                    <mat-checkbox formControlName="isPublic">
                      Make survey public
                    </mat-checkbox>

                    <div class="flex gap-2">
                      <button type="submit" 
                              mat-raised-button 
                              color="primary"
                              [disabled]="reactiveForm.invalid">
                        Submit Reactive Form
                      </button>
                      <button type="button" 
                              mat-stroked-button 
                              (click)="resetReactiveForm()">
                        Reset
                      </button>
                    </div>
                  </form>
                </mat-card-content>
              </mat-card>

              <!-- Form State Display -->
              <mat-card>
                <mat-card-header>
                  <mat-card-title>📊 Form State</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <div class="space-y-4">
                    <div>
                      <h4 class="font-semibold mb-2">Form Status</h4>
                      <div class="flex gap-2">
                        <mat-chip [color]="reactiveForm.valid ? 'accent' : 'warn'" selected>
                          {{ reactiveForm.valid ? 'Valid' : 'Invalid' }}
                        </mat-chip>
                        <mat-chip [color]="reactiveForm.dirty ? 'primary' : 'basic'" selected>
                          {{ reactiveForm.dirty ? 'Dirty' : 'Pristine' }}
                        </mat-chip>
                        <mat-chip [color]="reactiveForm.touched ? 'primary' : 'basic'" selected>
                          {{ reactiveForm.touched ? 'Touched' : 'Untouched' }}
                        </mat-chip>
                      </div>
                    </div>

                    <mat-divider></mat-divider>

                    <div>
                      <h4 class="font-semibold mb-2">Form Values</h4>
                      <pre class="bg-gray-100 p-3 rounded text-sm overflow-auto max-h-40">{{ reactiveForm.value | json }}</pre>
                    </div>

                    <mat-divider></mat-divider>

                    <div>
                      <h4 class="font-semibold mb-2">Form Errors</h4>
                      <div *ngIf="getFormErrors().length > 0; else noErrors">
                        <div *ngFor="let error of getFormErrors()" class="text-red-600 text-sm">
                          {{ error }}
                        </div>
                      </div>
                      <ng-template #noErrors>
                        <span class="text-green-600 text-sm">No errors</span>
                      </ng-template>
                    </div>
                  </div>
                </mat-card-content>
              </mat-card>
            </div>
          </div>
        </mat-tab>

        <!-- Template-Driven Forms Tab -->
        <mat-tab label="Template-Driven Forms">
          <div class="p-6">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <!-- Template Form -->
              <mat-card>
                <mat-card-header>
                  <mat-card-title>📋 Template-Driven Form</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <form #templateForm="ngForm" (ngSubmit)="onTemplateSubmit(templateForm)" class="space-y-4">
                    <mat-form-field appearance="outline" class="w-full">
                      <mat-label>Survey Title</mat-label>
                      <input matInput 
                             name="title" 
                             [(ngModel)]="templateData.title" 
                             required 
                             minlength="3"
                             #title="ngModel"
                             placeholder="Enter survey title">
                      <mat-error *ngIf="title.invalid && (title.dirty || title.touched)">
                        <span *ngIf="title.errors?.['required']">Title is required</span>
                        <span *ngIf="title.errors?.['minlength']">Title must be at least 3 characters</span>
                      </mat-error>
                    </mat-form-field>

                    <mat-form-field appearance="outline" class="w-full">
                      <mat-label>Description</mat-label>
                      <textarea matInput 
                                name="description" 
                                [(ngModel)]="templateData.description" 
                                maxlength="200"
                                #description="ngModel"
                                rows="3" 
                                placeholder="Enter description"></textarea>
                      <mat-error *ngIf="description.invalid && (description.dirty || description.touched)">
                        <span *ngIf="description.errors?.['maxlength']">Description must be less than 200 characters</span>
                      </mat-error>
                    </mat-form-field>

                    <mat-form-field appearance="outline" class="w-full">
                      <mat-label>Category</mat-label>
                      <mat-select name="category" [(ngModel)]="templateData.category">
                        <mat-option value="education">Education</mat-option>
                        <mat-option value="business">Business</mat-option>
                        <mat-option value="healthcare">Healthcare</mat-option>
                        <mat-option value="technology">Technology</mat-option>
                      </mat-select>
                    </mat-form-field>

                    <mat-checkbox name="isPublic" [(ngModel)]="templateData.isPublic">
                      Make survey public
                    </mat-checkbox>

                    <div class="flex gap-2">
                      <button type="submit" 
                              mat-raised-button 
                              color="primary"
                              [disabled]="templateForm.invalid">
                        Submit Template Form
                      </button>
                      <button type="button" 
                              mat-stroked-button 
                              (click)="resetTemplateForm(templateForm)">
                        Reset
                      </button>
                    </div>
                  </form>
                </mat-card-content>
              </mat-card>

              <!-- Comparison -->
              <mat-card>
                <mat-card-header>
                  <mat-card-title>⚖️ Comparison</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <div class="space-y-4">
                    <div>
                      <h4 class="font-semibold mb-2">Template-Driven Form Status</h4>
                      <div class="flex gap-2">
                        <mat-chip [color]="templateForm?.valid ? 'accent' : 'warn'" selected>
                          {{ templateForm?.valid ? 'Valid' : 'Invalid' }}
                        </mat-chip>
                        <mat-chip [color]="templateForm?.dirty ? 'primary' : 'basic'" selected>
                          {{ templateForm?.dirty ? 'Dirty' : 'Pristine' }}
                        </mat-chip>
                      </div>
                    </div>

                    <mat-divider></mat-divider>

                    <div>
                      <h4 class="font-semibold mb-2">Template Form Values</h4>
                      <pre class="bg-gray-100 p-3 rounded text-sm overflow-auto max-h-40">{{ templateData | json }}</pre>
                    </div>

                    <mat-divider></mat-divider>

                    <div>
                      <h4 class="font-semibold mb-2">Key Differences</h4>
                      <div class="space-y-2 text-sm">
                        <div class="flex items-center gap-2">
                          <mat-icon class="text-blue-500">check_circle</mat-icon>
                          <span><strong>Reactive:</strong> Form logic in component</span>
                        </div>
                        <div class="flex items-center gap-2">
                          <mat-icon class="text-orange-500">info</mat-icon>
                          <span><strong>Template:</strong> Form logic in template</span>
                        </div>
                        <div class="flex items-center gap-2">
                          <mat-icon class="text-blue-500">check_circle</mat-icon>
                          <span><strong>Reactive:</strong> Better for complex forms</span>
                        </div>
                        <div class="flex items-center gap-2">
                          <mat-icon class="text-orange-500">info</mat-icon>
                          <span><strong>Template:</strong> Simpler for basic forms</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </mat-card-content>
              </mat-card>
            </div>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    pre {
      font-family: 'Courier New', monospace;
    }
    
    .mat-mdc-card {
      margin-bottom: 1rem;
    }
  `]
})
export class ReactiveFormsDemoComponent {
  private readonly fb = inject(FormBuilder);

  reactiveForm: FormGroup;
  templateData = {
    title: '',
    description: '',
    category: '',
    isPublic: false
  };

  constructor() {
    this.reactiveForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.maxLength(200)],
      category: ['', Validators.required],
      isPublic: [false]
    });
  }

  onReactiveSubmit() {
    if (this.reactiveForm.valid) {
      console.log('Reactive Form submitted:', this.reactiveForm.value);
      alert('Reactive Form submitted successfully!');
    }
  }

  onTemplateSubmit(form: any) {
    if (form.valid) {
      console.log('Template Form submitted:', this.templateData);
      alert('Template Form submitted successfully!');
    }
  }

  resetReactiveForm() {
    this.reactiveForm.reset();
  }

  resetTemplateForm(form: any) {
    form.resetForm();
    this.templateData = {
      title: '',
      description: '',
      category: '',
      isPublic: false
    };
  }

  getFormErrors(): string[] {
    const errors: string[] = [];
    this.getControlErrors(this.reactiveForm, errors);
    return errors;
  }

  private getControlErrors(control: AbstractControl, errors: string[], path = '') {
    if (control.errors) {
      Object.keys(control.errors).forEach(key => {
        errors.push(`${path}${path ? '.' : ''}${key}: ${control.errors![key]}`);
      });
    }

    if (control instanceof FormGroup) {
      Object.keys(control.controls).forEach(key => {
        this.getControlErrors(control.get(key)!, errors, path ? `${path}.${key}` : key);
      });
    }

    if (control instanceof FormArray) {
      control.controls.forEach((ctrl, index) => {
        this.getControlErrors(ctrl, errors, path ? `${path}[${index}]` : `[${index}]`);
      });
    }
  }
} 