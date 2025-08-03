import { Component, Input, Output, EventEmitter, OnInit, signal, computed, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSpinner } from '@angular/material/progress-spinner';

import { Survey, Question, QuestionType, QuestionOption } from '../../../../core/models/survey.model';
import { SurveyService } from '../../../../core/services/survey.service';

@Component({
  selector: 'app-survey-display',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSliderModule,
    ReactiveFormsModule,
    MatSpinner
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="survey-display-container">
      <!-- Loading State -->
      @if (isLoading()) {
        <div class="loading-state">
          <mat-spinner diameter="40"></mat-spinner>
          <p class="mt-4 text-gray-600">Caricamento sondaggio...</p>
        </div>
      }

      <!-- Error State -->
      @else if (error()) {
        <div class="error-state">
          <mat-icon class="error-icon">error</mat-icon>
          <h3>Errore</h3>
          <p>{{ error() }}</p>
          <button mat-raised-button color="primary" routerLink="/survey-runner" class="mt-4">
            <mat-icon>arrow_back</mat-icon>
            Torna alla Selezione
          </button>
        </div>
      }

      <!-- Survey Display -->
      @else if (survey) {
        <mat-card class="survey-card">
          <!-- Back Button -->
          <div class="back-button-container">
            <button mat-button routerLink="/survey-runner">
              <mat-icon>arrow_back</mat-icon>
              Torna alla Selezione
            </button>
          </div>

          <!-- Survey Header -->
          <mat-card-header>
            <mat-card-title>{{ survey.title }}</mat-card-title>
            <mat-card-subtitle>{{ survey.description }}</mat-card-subtitle>
          </mat-card-header>

          <!-- Progress Bar -->
          @if (survey.settings.showProgressBar) {
            <div class="progress-section">
              <mat-progress-bar 
                [value]="progressPercentage()" 
                color="primary"
              ></mat-progress-bar>
              <span class="progress-text">{{ currentQuestionIndex() + 1 }} of {{ survey.questions.length }}</span>
            </div>
          }

          <!-- Question Display -->
          <mat-card-content>
            @if (currentQuestion()) {
              <div class="question-container">
                <div class="question-header">
                  @if (survey.settings.showQuestionNumbers) {
                    <span class="question-number">{{ currentQuestionIndex() + 1 }}.</span>
                  }
                  <h3 class="question-title">{{ currentQuestion()?.title }}</h3>
                  @if (currentQuestion()?.required) {
                    <span class="required-indicator">*</span>
                  }
                </div>

                @if (currentQuestion()?.description) {
                  <p class="question-description">{{ currentQuestion()?.description }}</p>
                }

                <!-- Question Input -->
                <div class="question-input">
                  @switch (currentQuestion()?.type) {
                    @case ('text') {
                      <mat-form-field class="full-width">
                        <mat-label>Your answer</mat-label>
                        <input 
                          matInput 
                          [formControl]="getQuestionControl(currentQuestion()!.id)"
                          placeholder="Enter your answer"
                        >
                      </mat-form-field>
                    }
                    @case ('textarea') {
                      <mat-form-field class="full-width">
                        <mat-label>Your answer</mat-label>
                        <textarea 
                          matInput 
                          [formControl]="getQuestionControl(currentQuestion()!.id)"
                          rows="4"
                          placeholder="Enter your detailed answer"
                        ></textarea>
                      </mat-form-field>
                    }
                    @case ('radio') {
                      <mat-radio-group [formControl]="getQuestionControl(currentQuestion()!.id)">
                        @for (option of currentQuestion()?.options; track option.id) {
                          <mat-radio-button [value]="option.value">
                            {{ option.label }}
                          </mat-radio-button>
                        }
                      </mat-radio-group>
                    }
                    @case ('checkbox') {
                      <div [formGroup]="getCheckboxGroup(currentQuestion()!.id)">
                        @for (option of currentQuestion()?.options; track option.id) {
                          <mat-checkbox [formControlName]="option.value">
                            {{ option.label }}
                          </mat-checkbox>
                        }
                      </div>
                    }
                    @case ('select') {
                      <mat-form-field class="full-width">
                        <mat-label>Select an option</mat-label>
                        <mat-select [formControl]="getQuestionControl(currentQuestion()!.id)">
                          @for (option of currentQuestion()?.options; track option.id) {
                            <mat-option [value]="option.value">{{ option.label }}</mat-option>
                          }
                        </mat-select>
                      </mat-form-field>
                    }
                    @case ('rating') {
                      <div class="rating-container">
                        <mat-slider 
                          [formControl]="getQuestionControl(currentQuestion()!.id)"
                          [min]="1" 
                          [max]="5" 
                          [step]="1"
                          [showTickMarks]="true"
                        >
                        </mat-slider>
                        <div class="rating-labels">
                          <span>Poor</span>
                          <span>Excellent</span>
                        </div>
                      </div>
                    }
                    @case ('number') {
                      <mat-form-field class="full-width">
                        <mat-label>Enter a number</mat-label>
                        <input 
                          matInput 
                          type="number"
                          [formControl]="getQuestionControl(currentQuestion()!.id)"
                          placeholder="Enter a number"
                        >
                      </mat-form-field>
                    }
                    @case ('email') {
                      <mat-form-field class="full-width">
                        <mat-label>Email address</mat-label>
                        <input 
                          matInput 
                          type="email"
                          [formControl]="getQuestionControl(currentQuestion()!.id)"
                          placeholder="Enter your email"
                        >
                      </mat-form-field>
                    }
                  }
                </div>
              </div>
            }
          </mat-card-content>

          <!-- Navigation Buttons -->
          <mat-card-actions class="navigation-actions">
            @if (survey.settings.enableBackButton && currentQuestionIndex() > 0) {
              <button 
                mat-button 
                (click)="previousQuestion()"
                class="nav-button"
              >
                <mat-icon>arrow_back</mat-icon>
                Previous
              </button>
            }

            <span class="spacer"></span>

            @if (currentQuestionIndex() < survey.questions.length - 1) {
              <button 
                mat-raised-button 
                color="primary" 
                (click)="nextQuestion()"
                [disabled]="!isCurrentQuestionValid()"
                class="nav-button"
              >
                Next
                <mat-icon>arrow_forward</mat-icon>
              </button>
            } @else {
              <button 
                mat-raised-button 
                color="accent" 
                (click)="submitSurvey()"
                [disabled]="!isSurveyComplete()"
                class="nav-button"
              >
                <mat-icon>send</mat-icon>
                Submit Survey
              </button>
            }
          </mat-card-actions>
        </mat-card>
      } @else {
        <div class="no-survey">
          <mat-icon class="no-survey-icon">quiz</mat-icon>
          <h3>No survey found</h3>
          <p>The survey you're looking for doesn't exist or has been removed.</p>
          <button mat-raised-button color="primary" routerLink="/survey-runner" class="mt-4">
            <mat-icon>arrow_back</mat-icon>
            Torna alla Selezione
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    .survey-display-container {
      @apply max-w-4xl mx-auto p-6;
    }

    .survey-card {
      @apply bg-white shadow-lg;
    }

    .progress-section {
      @apply p-4 border-b border-gray-200;
    }

    .progress-text {
      @apply text-sm text-gray-600 mt-2 block text-center;
    }

    .question-container {
      @apply p-6;
    }

    .question-header {
      @apply flex items-start gap-2 mb-4;
    }

    .question-number {
      @apply bg-primary-100 text-primary-700 w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0;
    }

    .question-title {
      @apply text-xl font-semibold text-gray-900 flex-1;
    }

    .required-indicator {
      @apply text-red-500 text-xl font-bold;
    }

    .question-description {
      @apply text-gray-600 mb-6;
    }

    .question-input {
      @apply mb-6;
    }

    .full-width {
      @apply w-full;
    }

    mat-radio-button,
    mat-checkbox {
      @apply block mb-3;
    }

    .rating-container {
      @apply p-4;
    }

    .rating-labels {
      @apply flex justify-between text-sm text-gray-600 mt-2;
    }

    .navigation-actions {
      @apply flex items-center p-4 border-t border-gray-200;
    }

    .nav-button {
      @apply flex items-center gap-2;
    }

    .spacer {
      @apply flex-1;
    }

    .no-survey {
      @apply text-center py-12;
    }

    .no-survey-icon {
      @apply text-6xl text-gray-400 mb-4;
    }

    .no-survey h3 {
      @apply text-xl font-semibold text-gray-700 mb-2;
    }

    .no-survey p {
      @apply text-gray-500;
    }

    .loading-state,
    .error-state {
      @apply text-center py-12;
    }

    .error-icon {
      @apply text-6xl text-red-400 mb-4;
    }

    .back-button-container {
      @apply mb-4;
    }
  `]
})
export class SurveyDisplayComponent implements OnInit {
  @Input() survey: Survey | null = null;
  @Output() surveySubmitted = new EventEmitter<any>();

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly surveyService = inject(SurveyService);
  private readonly fb = inject(FormBuilder);

  readonly currentQuestionIndex = signal(0);
  readonly surveyForm = signal<FormGroup>(new FormGroup({}));
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  currentQuestion = computed(() => {
    if (!this.survey?.questions) return null;
    return this.survey.questions[this.currentQuestionIndex()];
  });

  progressPercentage = computed(() => {
    if (!this.survey?.questions?.length) return 0;
    return ((this.currentQuestionIndex() + 1) / this.survey.questions.length) * 100;
  });

  ngOnInit(): void {
    // If survey is not provided via Input, load it from route
    if (!this.survey) {
      this.loadSurveyFromRoute();
    } else {
      this.initializeForm();
    }
  }

  private loadSurveyFromRoute(): void {
    const surveyId = this.route.snapshot.paramMap.get('surveyId');
    if (!surveyId) {
      this.error.set('Survey ID not found');
      return;
    }

    this.isLoading.set(true);
    this.surveyService.getSurvey(surveyId).subscribe({
      next: (survey) => {
        if (survey) {
          this.survey = survey;
          this.initializeForm();
        } else {
          this.error.set('Survey not found');
        }
        this.isLoading.set(false);
      },
      error: (error) => {
        this.error.set('Failed to load survey');
        this.isLoading.set(false);
      }
    });
  }

  private initializeForm(): void {
    if (!this.survey?.questions) return;

    const formGroup: { [key: string]: any } = {};

    this.survey.questions.forEach(question => {
      if (question.type === 'checkbox') {
        // For checkboxes, create a group of checkboxes
        const checkboxGroup: { [key: string]: any } = {};
        question.options?.forEach(option => {
          checkboxGroup[option.value] = [false];
        });
        formGroup[question.id] = this.fb.group(checkboxGroup);
      } else {
        // For other question types, create a single control
        const validators = question.required ? [Validators.required] : [];
        formGroup[question.id] = this.fb.control('', validators);
      }
    });

    this.surveyForm.set(this.fb.group(formGroup));
  }

  getQuestionControl(questionId: string): any {
    return this.surveyForm().get(questionId);
  }

  getCheckboxGroup(questionId: string): FormGroup {
    return this.surveyForm().get(questionId) as FormGroup;
  }

  isCurrentQuestionValid(): boolean {
    const currentQuestion = this.currentQuestion();
    if (!currentQuestion) return false;

    const control = this.getQuestionControl(currentQuestion.id);
    if (!control) return true; // If no control, assume valid

    if (currentQuestion.type === 'checkbox') {
      const group = this.getCheckboxGroup(currentQuestion.id);
      if (currentQuestion.required) {
        const hasSelection = Object.values(group.value).some((value: any) => value === true);
        return hasSelection;
      }
      return true;
    }

    return control.valid;
  }

  isSurveyComplete(): boolean {
    if (!this.survey?.questions) return false;

    return this.survey.questions.every(question => {
      const control = this.getQuestionControl(question.id);
      if (!control) return true;

      if (question.type === 'checkbox') {
        const group = this.getCheckboxGroup(question.id);
        if (question.required) {
          return Object.values(group.value).some((value: any) => value === true);
        }
        return true;
      }

      return question.required ? control.valid && control.value : true;
    });
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex() < (this.survey?.questions?.length || 0) - 1) {
      this.currentQuestionIndex.update(index => index + 1);
    }
  }

  previousQuestion(): void {
    if (this.currentQuestionIndex() > 0) {
      this.currentQuestionIndex.update(index => index - 1);
    }
  }

  submitSurvey(): void {
    if (this.isSurveyComplete()) {
      const responses = this.surveyForm().value;
      this.surveySubmitted.emit({
        surveyId: this.survey?.id,
        responses,
        submittedAt: new Date()
      });
    }
  }
} 