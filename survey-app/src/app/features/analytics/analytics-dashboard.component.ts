import { Component, OnInit, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

import { Survey } from '../../core/models/survey.model';

@Component({
  selector: 'app-analytics-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatChipsModule,
    MatProgressBarModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="analytics-dashboard">
      <!-- Header -->
      <div class="dashboard-header">
        <div class="header-content">
          <h1 class="dashboard-title">
            <mat-icon>analytics</mat-icon>
            Analytics Dashboard
          </h1>
          <p class="dashboard-subtitle">Monitor your survey performance and insights</p>
        </div>
        
        <div class="header-actions">
          <mat-form-field class="survey-select">
            <mat-label>Select Survey</mat-label>
            <mat-select [formControl]="selectedSurveyControl">
              @for (survey of surveys(); track survey.id) {
                <mat-option [value]="survey.id">{{ survey.title }}</mat-option>
              }
            </mat-select>
          </mat-form-field>
          
          <button mat-raised-button color="primary">
            <mat-icon>download</mat-icon>
            Export Data
          </button>
        </div>
      </div>

      <!-- Overview Cards -->
      <div class="overview-cards">
        <mat-card class="overview-card">
          <div class="card-content">
            <div class="card-icon">
              <mat-icon>people</mat-icon>
            </div>
            <div class="card-info">
              <h3 class="card-value">{{ totalResponses() }}</h3>
              <p class="card-label">Total Responses</p>
            </div>
          </div>
          <div class="card-trend">
            <span class="trend-value positive">+12.5%</span>
            <span class="trend-period">vs last week</span>
          </div>
        </mat-card>

        <mat-card class="overview-card">
          <div class="card-content">
            <div class="card-icon">
              <mat-icon>trending_up</mat-icon>
            </div>
            <div class="card-info">
              <h3 class="card-value">{{ completionRate() }}%</h3>
              <p class="card-label">Completion Rate</p>
            </div>
          </div>
          <div class="card-trend">
            <span class="trend-value positive">+5.2%</span>
            <span class="trend-period">vs last week</span>
          </div>
        </mat-card>

        <mat-card class="overview-card">
          <div class="card-content">
            <div class="card-icon">
              <mat-icon>schedule</mat-icon>
            </div>
            <div class="card-info">
              <h3 class="card-value">{{ avgCompletionTime() }}m</h3>
              <p class="card-label">Avg. Completion Time</p>
            </div>
          </div>
          <div class="card-trend">
            <span class="trend-value negative">-2.1%</span>
            <span class="trend-period">vs last week</span>
          </div>
        </mat-card>

        <mat-card class="overview-card">
          <div class="card-content">
            <div class="card-icon">
              <mat-icon>share</mat-icon>
            </div>
            <div class="card-info">
              <h3 class="card-value">{{ activeSurveys() }}</h3>
              <p class="card-label">Active Surveys</p>
            </div>
          </div>
          <div class="card-trend">
            <span class="trend-value neutral">0</span>
            <span class="trend-period">vs last week</span>
          </div>
        </mat-card>
      </div>

      <!-- Main Content -->
      <div class="dashboard-content">
        <mat-tab-group class="analytics-tabs">
          <mat-tab label="Overview">
            <div class="tab-content">
              <div class="charts-grid">
                <mat-card class="chart-card">
                  <mat-card-header>
                    <mat-card-title>Response Trends</mat-card-title>
                    <mat-card-subtitle>Daily response count over time</mat-card-subtitle>
                  </mat-card-header>
                  <mat-card-content>
                    <div class="chart-placeholder">
                      <mat-icon>show_chart</mat-icon>
                      <p>Response trends chart will be displayed here</p>
                    </div>
                  </mat-card-content>
                </mat-card>

                <mat-card class="chart-card">
                  <mat-card-header>
                    <mat-card-title>Question Performance</mat-card-title>
                    <mat-card-subtitle>Completion rates by question</mat-card-subtitle>
                  </mat-card-header>
                  <mat-card-content>
                    <div class="chart-placeholder">
                      <mat-icon>bar_chart</mat-icon>
                      <p>Question performance chart will be displayed here</p>
                    </div>
                  </mat-card-content>
                </mat-card>

                <mat-card class="chart-card">
                  <mat-card-header>
                    <mat-card-title>Device Analytics</mat-card-title>
                    <mat-card-subtitle>Responses by device type</mat-card-subtitle>
                  </mat-card-header>
                  <mat-card-content>
                    <div class="chart-placeholder">
                      <mat-icon>pie_chart</mat-icon>
                      <p>Device analytics chart will be displayed here</p>
                    </div>
                  </mat-card-content>
                </mat-card>

                <mat-card class="chart-card">
                  <mat-card-header>
                    <mat-card-title>Geographic Distribution</mat-card-title>
                    <mat-card-subtitle>Responses by location</mat-card-subtitle>
                  </mat-card-header>
                  <mat-card-content>
                    <div class="chart-placeholder">
                      <mat-icon>public</mat-icon>
                      <p>Geographic distribution chart will be displayed here</p>
                    </div>
                  </mat-card-content>
                </mat-card>
              </div>
            </div>
          </mat-tab>

          <mat-tab label="Responses">
            <div class="tab-content">
              <div class="responses-section">
                <div class="section-header">
                  <h3>Recent Responses</h3>
                  <div class="section-actions">
                    <button mat-button>
                      <mat-icon>filter_list</mat-icon>
                      Filter
                    </button>
                    <button mat-button>
                      <mat-icon>sort</mat-icon>
                      Sort
                    </button>
                  </div>
                </div>
                
                <div class="responses-list">
                  @for (response of recentResponses(); track response.id) {
                    <mat-card class="response-card">
                      <div class="response-header">
                        <div class="response-info">
                          <span class="response-id">#{{ response.id }}</span>
                          <span class="response-date">{{ response.submittedAt | date:'short' }}</span>
                        </div>
                        <mat-chip [color]="response.completed ? 'primary' : 'warn'" size="small">
                          {{ response.completed ? 'Completed' : 'Partial' }}
                        </mat-chip>
                      </div>
                      <div class="response-preview">
                        <p>{{ response.preview }}</p>
                      </div>
                    </mat-card>
                  }
                </div>
              </div>
            </div>
          </mat-tab>

          <mat-tab label="Reports">
            <div class="tab-content">
              <div class="reports-section">
                <h3>Available Reports</h3>
                <div class="reports-grid">
                  <mat-card class="report-card">
                    <mat-card-header>
                      <mat-card-title>Summary Report</mat-card-title>
                      <mat-card-subtitle>High-level survey overview</mat-card-subtitle>
                    </mat-card-header>
                    <mat-card-content>
                      <p>Get a comprehensive overview of your survey performance</p>
                    </mat-card-content>
                    <mat-card-actions>
                      <button mat-button color="primary">Generate</button>
                      <button mat-button>Download</button>
                    </mat-card-actions>
                  </mat-card>

                  <mat-card class="report-card">
                    <mat-card-header>
                      <mat-card-title>Detailed Analysis</mat-card-title>
                      <mat-card-subtitle>Question-by-question breakdown</mat-card-subtitle>
                    </mat-card-header>
                    <mat-card-content>
                      <p>Deep dive into individual question performance</p>
                    </mat-card-content>
                    <mat-card-actions>
                      <button mat-button color="primary">Generate</button>
                      <button mat-button>Download</button>
                    </mat-card-actions>
                  </mat-card>

                  <mat-card class="report-card">
                    <mat-card-header>
                      <mat-card-title>Trend Report</mat-card-title>
                      <mat-card-subtitle>Performance over time</mat-card-subtitle>
                    </mat-card-header>
                    <mat-card-content>
                      <p>Track how your survey performance changes over time</p>
                    </mat-card-content>
                    <mat-card-actions>
                      <button mat-button color="primary">Generate</button>
                      <button mat-button>Download</button>
                    </mat-card-actions>
                  </mat-card>
                </div>
              </div>
            </div>
          </mat-tab>
        </mat-tab-group>
      </div>
    </div>
  `,
  styles: [`
    .analytics-dashboard {
      @apply p-6 bg-gray-50 min-h-screen;
    }

    .dashboard-header {
      @apply flex justify-between items-start mb-8;
    }

    .header-content {
      @apply flex-1;
    }

    .dashboard-title {
      @apply flex items-center gap-3 text-3xl font-bold text-gray-900 mb-2;
    }

    .dashboard-subtitle {
      @apply text-gray-600;
    }

    .header-actions {
      @apply flex items-center gap-4;
    }

    .survey-select {
      @apply w-64;
    }

    .overview-cards {
      @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8;
    }

    .overview-card {
      @apply bg-white shadow-sm;
    }

    .card-content {
      @apply flex items-center gap-4 p-4;
    }

    .card-icon {
      @apply bg-primary-100 text-primary-600 p-3 rounded-lg;
    }

    .card-icon mat-icon {
      @apply text-2xl;
    }

    .card-info {
      @apply flex-1;
    }

    .card-value {
      @apply text-2xl font-bold text-gray-900 mb-1;
    }

    .card-label {
      @apply text-sm text-gray-600;
    }

    .card-trend {
      @apply p-4 border-t border-gray-100;
    }

    .trend-value {
      @apply text-sm font-medium;
    }

    .trend-value.positive {
      @apply text-green-600;
    }

    .trend-value.negative {
      @apply text-red-600;
    }

    .trend-value.neutral {
      @apply text-gray-600;
    }

    .trend-period {
      @apply text-xs text-gray-500 ml-2;
    }

    .dashboard-content {
      @apply bg-white rounded-lg shadow-sm;
    }

    .analytics-tabs {
      @apply h-full;
    }

    .tab-content {
      @apply p-6;
    }

    .charts-grid {
      @apply grid grid-cols-1 lg:grid-cols-2 gap-6;
    }

    .chart-card {
      @apply bg-white shadow-sm;
    }

    .chart-placeholder {
      @apply flex flex-col items-center justify-center py-12 text-gray-500;
    }

    .chart-placeholder mat-icon {
      @apply text-4xl mb-4;
    }

    .responses-section {
      @apply space-y-6;
    }

    .section-header {
      @apply flex justify-between items-center mb-4;
    }

    .section-header h3 {
      @apply text-xl font-semibold text-gray-900;
    }

    .section-actions {
      @apply flex gap-2;
    }

    .responses-list {
      @apply space-y-4;
    }

    .response-card {
      @apply bg-white shadow-sm;
    }

    .response-header {
      @apply flex justify-between items-center mb-2;
    }

    .response-info {
      @apply flex items-center gap-4;
    }

    .response-id {
      @apply font-medium text-gray-900;
    }

    .response-date {
      @apply text-sm text-gray-500;
    }

    .response-preview {
      @apply text-gray-600;
    }

    .reports-section {
      @apply space-y-6;
    }

    .reports-section h3 {
      @apply text-xl font-semibold text-gray-900 mb-4;
    }

    .reports-grid {
      @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6;
    }

    .report-card {
      @apply bg-white shadow-sm;
    }
  `]
})
export class AnalyticsDashboardComponent implements OnInit {
  readonly selectedSurveyControl = new FormControl<string>('');
  
  readonly surveys = signal<Survey[]>([]);
  readonly totalResponses = signal(0);
  readonly completionRate = signal(0);
  readonly avgCompletionTime = signal(0);
  readonly activeSurveys = signal(0);

  readonly recentResponses = signal<any[]>([]);

  ngOnInit(): void {
    this.loadAnalyticsData();
    this.loadMockData();
  }

  private loadAnalyticsData(): void {
    // TODO: Load real analytics data from service
    this.totalResponses.set(1247);
    this.completionRate.set(87.3);
    this.avgCompletionTime.set(4.2);
    this.activeSurveys.set(5);
  }

  private loadMockData(): void {
    // Mock recent responses
    this.recentResponses.set([
      {
        id: '001',
        submittedAt: new Date(),
        completed: true,
        preview: 'User completed all questions about product satisfaction...'
      },
      {
        id: '002',
        submittedAt: new Date(Date.now() - 3600000),
        completed: false,
        preview: 'User partially completed the survey, stopped at question 3...'
      },
      {
        id: '003',
        submittedAt: new Date(Date.now() - 7200000),
        completed: true,
        preview: 'User provided detailed feedback about customer service...'
      }
    ]);
  }
} 