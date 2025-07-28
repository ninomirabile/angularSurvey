import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

import { Survey } from '../../../core/models/survey.model';

@Component({
  selector: 'app-survey-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card class="survey-card" [class.hoverable]="hoverable" (click)="onCardClick.emit(survey)">
      @if (showHeader) {
        <mat-card-header>
          <mat-card-title>{{ survey.title }}</mat-card-title>
          @if (showSubtitle) {
            <mat-card-subtitle>
              Created {{ survey.createdAt | date:'shortDate' }}
            </mat-card-subtitle>
          }
        </mat-card-header>
      }

      <mat-card-content>
        @if (showDescription) {
          <p class="card-description">{{ survey.description || 'No description' }}</p>
        }

        @if (showTags && survey.tags?.length) {
          <div class="card-tags">
            @for (tag of survey.tags; track tag) {
              <mat-chip size="small">{{ tag }}</mat-chip>
            }
          </div>
        }

        @if (showStats) {
          <div class="card-stats">
            <div class="stat">
              <mat-icon>question_answer</mat-icon>
              <span>{{ survey.questions.length || 0 }} questions</span>
            </div>
            @if (survey.responses) {
              <div class="stat">
                <mat-icon>people</mat-icon>
                <span>{{ survey.responses.length }} responses</span>
              </div>
            }
          </div>
        }

        @if (showStatus) {
          <div class="card-status">
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
        }
      </mat-card-content>

      @if (showActions) {
        <mat-card-actions>
          @for (action of actions; track action.label) {
            <button 
              mat-button 
              [color]="action.color || 'primary'"
              (click)="onActionClick.emit({ action: action, survey: survey })"
            >
              @if (action.icon) {
                <mat-icon>{{ action.icon }}</mat-icon>
              }
              {{ action.label }}
            </button>
          }
        </mat-card-actions>
      }
    </mat-card>
  `,
  styles: [`
    .survey-card {
      @apply bg-white rounded-lg shadow-sm border border-gray-200 transition-all duration-200;
    }

    .survey-card.hoverable:hover {
      @apply shadow-md transform scale-[1.02] border-primary-200;
    }

    .card-description {
      @apply text-gray-600 text-sm mb-4 line-clamp-2;
    }

    .card-tags {
      @apply flex flex-wrap gap-1 mb-4;
    }

    .card-stats {
      @apply flex gap-4 text-sm text-gray-500 mb-4;
    }

    .stat {
      @apply flex items-center gap-1;
    }

    .stat mat-icon {
      @apply text-base;
    }

    .card-status {
      @apply flex justify-end;
    }

    mat-card-actions {
      @apply flex gap-2 pt-4 border-t border-gray-100;
    }

    /* Line clamp utility */
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `]
})
export class SurveyCardComponent {
  @Input() survey!: Survey;
  @Input() hoverable: boolean = true;
  @Input() showHeader: boolean = true;
  @Input() showSubtitle: boolean = true;
  @Input() showDescription: boolean = true;
  @Input() showTags: boolean = true;
  @Input() showStats: boolean = true;
  @Input() showStatus: boolean = true;
  @Input() showActions: boolean = false;
  @Input() actions: Array<{
    label: string;
    icon?: string;
    color?: 'primary' | 'accent' | 'warn';
  }> = [];

  @Output() onCardClick = new EventEmitter<Survey>();
  @Output() onActionClick = new EventEmitter<{
    action: any;
    survey: Survey;
  }>();
} 