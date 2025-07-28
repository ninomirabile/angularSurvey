import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

import { Survey, SurveySettings } from '../../../../core/models/survey.model';

@Component({
  selector: 'app-survey-settings',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="survey-settings-container">
      @if (survey) {
        <mat-card class="settings-card">
          <mat-card-header>
            <mat-card-title>Survey Settings</mat-card-title>
            <mat-card-subtitle>Configure your survey behavior and appearance</mat-card-subtitle>
          </mat-card-header>
          
          <mat-card-content>
            <form [formGroup]="settingsForm" (ngSubmit)="saveSettings()">
              <div class="settings-section">
                <h3>General Settings</h3>
                
                <mat-form-field class="full-width">
                  <mat-label>Survey Title</mat-label>
                  <input matInput formControlName="title" placeholder="Enter survey title">
                </mat-form-field>
                
                <mat-form-field class="full-width">
                  <mat-label>Description</mat-label>
                  <textarea matInput formControlName="description" rows="3" placeholder="Enter survey description"></textarea>
                </mat-form-field>
              </div>
              
              <div class="settings-section">
                <h3>Response Settings</h3>
                
                <mat-checkbox formControlName="allowAnonymous">
                  Allow anonymous responses
                </mat-checkbox>
                
                <mat-checkbox formControlName="requireEmail">
                  Require email address
                </mat-checkbox>
                
                <mat-checkbox formControlName="allowMultipleResponses">
                  Allow multiple responses per person
                </mat-checkbox>
              </div>
              
              <div class="settings-section">
                <h3>Display Settings</h3>
                
                <mat-checkbox formControlName="showProgressBar">
                  Show progress bar
                </mat-checkbox>
                
                <mat-checkbox formControlName="showQuestionNumbers">
                  Show question numbers
                </mat-checkbox>
                
                <mat-checkbox formControlName="enableBackButton">
                  Enable back button
                </mat-checkbox>
              </div>
              
              <div class="settings-actions">
                <button mat-raised-button color="primary" type="submit">
                  <mat-icon>save</mat-icon>
                  Save Settings
                </button>
                <button mat-button type="button" (click)="resetSettings()">
                  <mat-icon>refresh</mat-icon>
                  Reset
                </button>
              </div>
            </form>
          </mat-card-content>
        </mat-card>
      } @else {
        <div class="no-survey">
          <mat-icon>settings</mat-icon>
          <h3>No survey selected</h3>
          <p>Select a survey to configure its settings</p>
        </div>
      }
    </div>
  `,
  styles: [`
    .survey-settings-container {
      @apply p-6 max-w-4xl mx-auto;
    }

    .settings-card {
      @apply bg-white shadow-lg;
    }

    .settings-section {
      @apply mb-8;
    }

    .settings-section h3 {
      @apply text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2;
    }

    .full-width {
      @apply w-full mb-4;
    }

    mat-checkbox {
      @apply block mb-3;
    }

    .settings-actions {
      @apply flex gap-4 pt-6 border-t border-gray-200;
    }

    .no-survey {
      @apply text-center py-12;
    }

    .no-survey mat-icon {
      @apply text-6xl text-gray-400 mb-4;
    }

    .no-survey h3 {
      @apply text-xl font-semibold text-gray-700 mb-2;
    }

    .no-survey p {
      @apply text-gray-500;
    }
  `]
})
export class SurveySettingsComponent {
  @Input() survey: Survey | null = null;
  @Output() settingsChange = new EventEmitter<Partial<SurveySettings>>();

  settingsForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.settingsForm = this.fb.group({
      title: [''],
      description: [''],
      allowAnonymous: [true],
      requireEmail: [false],
      allowMultipleResponses: [false],
      showProgressBar: [true],
      showQuestionNumbers: [true],
      enableBackButton: [true]
    });
  }

  ngOnInit(): void {
    if (this.survey) {
      this.loadSettings();
    }
  }

  ngOnChanges(): void {
    if (this.survey) {
      this.loadSettings();
    }
  }

  private loadSettings(): void {
    if (this.survey) {
      this.settingsForm.patchValue({
        title: this.survey.title,
        description: this.survey.description,
        allowAnonymous: this.survey.settings.allowAnonymous,
        requireEmail: this.survey.settings.requireEmail,
        allowMultipleResponses: this.survey.settings.allowMultipleResponses,
        showProgressBar: this.survey.settings.showProgressBar,
        showQuestionNumbers: this.survey.settings.showQuestionNumbers,
        enableBackButton: this.survey.settings.enableBackButton
      });
    }
  }

  saveSettings(): void {
    if (this.settingsForm.valid) {
      const settings = this.settingsForm.value;
      this.settingsChange.emit(settings);
    }
  }

  resetSettings(): void {
    this.loadSettings();
  }
} 