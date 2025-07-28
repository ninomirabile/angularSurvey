import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { SurveyService } from '../../../core/services/survey.service';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule
  ],
  template: `
    <div class="dashboard-container">
      <div class="dashboard-header">
        <h1 class="dashboard-title">Dashboard</h1>
        <p class="dashboard-subtitle">Welcome to your Survey Builder dashboard</p>
      </div>

      <!-- Stats Cards -->
      <div class="stats-grid">
        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <mat-icon class="stat-icon">quiz</mat-icon>
              <div class="stat-info">
                <div class="stat-number">{{ totalSurveys() }}</div>
                <div class="stat-label">Total Surveys</div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <mat-icon class="stat-icon">published_with_changes</mat-icon>
              <div class="stat-info">
                <div class="stat-number">{{ publishedSurveys() }}</div>
                <div class="stat-label">Published</div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <mat-icon class="stat-icon">drafts</mat-icon>
              <div class="stat-info">
                <div class="stat-number">{{ draftSurveys() }}</div>
                <div class="stat-label">Drafts</div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <mat-icon class="stat-icon">analytics</mat-icon>
              <div class="stat-info">
                <div class="stat-number">{{ totalResponses() }}</div>
                <div class="stat-label">Total Responses</div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Recent Surveys -->
      <div class="recent-section">
        <h2>Recent Surveys</h2>
        <div class="surveys-grid">
          @for (survey of recentSurveys(); track survey.id) {
            <mat-card class="survey-card">
              <mat-card-header>
                <mat-card-title>{{ survey.title }}</mat-card-title>
                <mat-card-subtitle>
                  Created {{ survey.createdAt | date:'shortDate' }}
                </mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <p>{{ survey.description || 'No description' }}</p>
                <div class="survey-tags">
                  @for (tag of survey.tags; track tag) {
                    <mat-chip>{{ tag }}</mat-chip>
                  }
                </div>
              </mat-card-content>
              <mat-card-actions>
                <button mat-button color="primary">Edit</button>
                <button mat-button>View</button>
                <mat-chip 
                  [color]="survey.isPublished ? 'accent' : 'warn'">
                  {{ survey.isPublished ? 'Published' : 'Draft' }}
                </mat-chip>
              </mat-card-actions>
            </mat-card>
          } @empty {
            <div class="empty-state">
              <mat-icon class="empty-icon">quiz</mat-icon>
              <h3>No surveys yet</h3>
              <p>Create your first survey to get started</p>
              <button mat-raised-button color="primary">
                <mat-icon>add</mat-icon>
                Create Survey
              </button>
            </div>
          }
        </div>
      </div>

      <!-- Theme Test -->
      <div class="theme-test">
        <h2>Theme Test</h2>
        <p>Current theme: {{ currentTheme() }}</p>
        <button mat-raised-button (click)="toggleTheme()">
          Toggle Theme
        </button>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .dashboard-header {
      margin-bottom: 32px;
    }

    .dashboard-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin: 0 0 8px 0;
      color: var(--mat-sys-on-surface);
    }

    .dashboard-subtitle {
      font-size: 1.1rem;
      color: var(--mat-sys-on-surface-variant);
      margin: 0;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 24px;
      margin-bottom: 48px;
    }

    .stat-card {
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .stat-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }

    .stat-content {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .stat-icon {
      font-size: 2.5rem;
      width: 2.5rem;
      height: 2.5rem;
      color: var(--primary-color, #1976d2);
    }

    .stat-number {
      font-size: 2rem;
      font-weight: 700;
      color: var(--mat-sys-on-surface);
      line-height: 1;
    }

    .stat-label {
      font-size: 0.9rem;
      color: var(--mat-sys-on-surface-variant);
      margin-top: 4px;
    }

    .recent-section {
      margin-bottom: 48px;
    }

    .recent-section h2 {
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0 0 24px 0;
      color: var(--mat-sys-on-surface);
    }

    .surveys-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 24px;
    }

    .survey-card {
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .survey-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }

    .survey-tags {
      margin-top: 12px;
    }

    .survey-tags mat-chip {
      margin-right: 8px;
      margin-bottom: 4px;
    }

    .empty-state {
      grid-column: 1 / -1;
      text-align: center;
      padding: 48px;
      background: var(--mat-sys-surface-container);
      border-radius: 12px;
      border: 2px dashed var(--mat-sys-outline);
    }

    .empty-icon {
      font-size: 4rem;
      width: 4rem;
      height: 4rem;
      color: var(--mat-sys-on-surface-variant);
      margin-bottom: 16px;
    }

    .empty-state h3 {
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0 0 8px 0;
      color: var(--mat-sys-on-surface);
    }

    .empty-state p {
      font-size: 1rem;
      color: var(--mat-sys-on-surface-variant);
      margin: 0 0 24px 0;
    }

    .theme-test {
      padding: 24px;
      background: var(--mat-sys-surface-container);
      border-radius: 12px;
      text-align: center;
    }

    .theme-test h2 {
      margin: 0 0 16px 0;
      color: var(--mat-sys-on-surface);
    }

    .theme-test p {
      margin: 0 0 16px 0;
      color: var(--mat-sys-on-surface-variant);
    }

    @media (max-width: 768px) {
      .dashboard-title {
        font-size: 2rem;
      }

      .stats-grid {
        grid-template-columns: 1fr;
        gap: 16px;
      }

      .surveys-grid {
        grid-template-columns: 1fr;
        gap: 16px;
      }

      .dashboard-container {
        padding: 0 16px;
      }
    }
  `]
})
export class DashboardComponent {
  private readonly surveyService = inject(SurveyService);
  private readonly themeService = inject(ThemeService);

  // Mock data for now
  readonly totalSurveys = signal(12);
  readonly publishedSurveys = signal(8);
  readonly draftSurveys = signal(4);
  readonly totalResponses = signal(156);
  readonly currentTheme = this.themeService.currentTheme;

  readonly recentSurveys = signal([
    {
      id: '1',
      title: 'Customer Feedback Survey',
      description: 'Gather feedback from our customers about their experience',
      createdAt: new Date('2024-01-15'),
      isPublished: true,
      tags: ['customer', 'feedback', 'experience']
    },
    {
      id: '2',
      title: 'Employee Satisfaction',
      description: 'Annual employee satisfaction survey',
      createdAt: new Date('2024-01-10'),
      isPublished: false,
      tags: ['employee', 'satisfaction', 'hr']
    },
    {
      id: '3',
      title: 'Product Usage Survey',
      description: 'Understand how customers use our products',
      createdAt: new Date('2024-01-08'),
      isPublished: true,
      tags: ['product', 'usage', 'analytics']
    }
  ]);

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
} 