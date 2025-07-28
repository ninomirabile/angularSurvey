import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Survey } from '../../../../core/models/survey.model';

@Component({
  selector: 'app-survey-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatMenuModule,
    MatTooltipModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="survey-list">
      @if (surveys.length === 0) {
        <div class="empty-state">
          <mat-icon class="empty-icon">quiz</mat-icon>
          <h3>No surveys yet</h3>
          <p>Create your first survey to get started</p>
        </div>
      } @else {
        <div class="surveys-grid">
          @for (survey of surveys; track survey.id) {
            <mat-card class="survey-card" (click)="selectSurvey(survey)">
              <mat-card-header>
                <mat-card-title>{{ survey.title }}</mat-card-title>
                <mat-card-subtitle>
                  Created {{ survey.createdAt | date:'shortDate' }}
                </mat-card-subtitle>
                <button 
                  mat-icon-button 
                  [matMenuTriggerFor]="menu"
                  (click)="$event.stopPropagation()"
                  class="card-menu-button"
                >
                  <mat-icon>more_vert</mat-icon>
                </button>
              </mat-card-header>
              
              <mat-card-content>
                <p class="survey-description">
                  {{ survey.description || 'No description' }}
                </p>
                
                <div class="survey-meta">
                  <div class="survey-tags">
                    @for (tag of survey.tags; track tag) {
                      <mat-chip size="small">{{ tag }}</mat-chip>
                    }
                  </div>
                  
                  <div class="survey-status">
                    @if (survey.isPublished) {
                      <mat-chip color="primary" size="small">
                        <mat-icon>published_with_changes</mat-icon>
                        Published
                      </mat-chip>
                    } @else {
                      <mat-chip color="warn" size="small">
                        <mat-icon>drafts</mat-icon>
                        Draft
                      </mat-chip>
                    }
                  </div>
                </div>
                
                <div class="survey-stats">
                  <span class="stat">
                    <mat-icon>question_answer</mat-icon>
                    <span>{{ survey.questions.length || 0 }} questions</span>
                  </span>
                  @if (survey.responses) {
                    <span class="stat">
                      <mat-icon>people</mat-icon>
                      {{ survey.responses.length }} responses
                    </span>
                  }
                </div>
              </mat-card-content>
            </mat-card>
            
            <mat-menu #menu="matMenu">
              <button mat-menu-item (click)="selectSurvey(survey)">
                <mat-icon>edit</mat-icon>
                <span>Edit</span>
              </button>
              <button mat-menu-item (click)="duplicateSurvey(survey.id)">
                <mat-icon>content_copy</mat-icon>
                <span>Duplicate</span>
              </button>
              <button mat-menu-item (click)="deleteSurvey(survey.id)">
                <mat-icon>delete</mat-icon>
                <span>Delete</span>
              </button>
            </mat-menu>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .survey-list {
      @apply w-full;
    }

    .empty-state {
      @apply text-center py-12;
    }

    .empty-icon {
      @apply text-6xl text-gray-400 mb-4;
    }

    .empty-state h3 {
      @apply text-xl font-semibold text-gray-700 mb-2;
    }

    .empty-state p {
      @apply text-gray-500;
    }

    .surveys-grid {
      @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6;
    }

    .survey-card {
      @apply cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02];
    }

    .survey-card:hover {
      @apply border-primary-200;
    }

    .card-menu-button {
      @apply absolute top-2 right-2;
    }

    .survey-description {
      @apply text-gray-600 text-sm mb-4 line-clamp-2;
    }

    .survey-meta {
      @apply flex justify-between items-start mb-4;
    }

    .survey-tags {
      @apply flex flex-wrap gap-1;
    }

    .survey-status {
      @apply flex-shrink-0;
    }

    .survey-stats {
      @apply flex gap-4 text-sm text-gray-500;
    }

    .stat {
      @apply flex items-center gap-1;
    }

    .stat mat-icon {
      @apply text-base;
    }
  `]
})
export class SurveyListComponent {
  @Input() surveys: Survey[] = [];
  @Output() surveySelect = new EventEmitter<Survey>();
  @Output() surveyDelete = new EventEmitter<string>();
  @Output() surveyDuplicate = new EventEmitter<string>();

  selectSurvey(survey: Survey): void {
    this.surveySelect.emit(survey);
  }

  deleteSurvey(surveyId: string): void {
    this.surveyDelete.emit(surveyId);
  }

  duplicateSurvey(surveyId: string): void {
    this.surveyDuplicate.emit(surveyId);
  }
} 