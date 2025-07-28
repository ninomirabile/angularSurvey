import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Survey } from '../../../../core/models/survey.model';

@Component({
  selector: 'app-survey-preview',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="survey-preview-container">
      @if (survey) {
        <mat-card class="preview-card">
          <mat-card-header>
            <mat-card-title>{{ survey.title }}</mat-card-title>
            <mat-card-subtitle>{{ survey.description }}</mat-card-subtitle>
          </mat-card-header>
          
          <mat-card-content>
            <div class="preview-info">
              <p><strong>Questions:</strong> {{ survey.questions.length || 0 }}</p>
              <p><strong>Status:</strong> 
                @if (survey.isPublished) {
                  <span class="status-published">Published</span>
                } @else {
                  <span class="status-draft">Draft</span>
                }
              </p>
              <p><strong>Created:</strong> {{ survey.createdAt | date:'medium' }}</p>
            </div>
            
            <div class="preview-actions">
              <button mat-raised-button color="primary">
                <mat-icon>preview</mat-icon>
                Preview Survey
              </button>
              <button mat-button>
                <mat-icon>share</mat-icon>
                Share Link
              </button>
            </div>
          </mat-card-content>
        </mat-card>
      } @else {
        <div class="no-survey">
          <mat-icon>preview</mat-icon>
          <h3>No survey selected</h3>
          <p>Select a survey to preview it</p>
        </div>
      }
    </div>
  `,
  styles: [`
    .survey-preview-container {
      @apply p-6 max-w-4xl mx-auto;
    }

    .preview-card {
      @apply bg-white shadow-lg;
    }

    .preview-info {
      @apply mb-6 space-y-2;
    }

    .preview-info p {
      @apply text-gray-700;
    }

    .status-published {
      @apply text-green-600 font-medium;
    }

    .status-draft {
      @apply text-orange-600 font-medium;
    }

    .preview-actions {
      @apply flex gap-4;
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
export class SurveyPreviewComponent {
  @Input() survey: Survey | null = null;
} 