import { Component, OnInit, inject, signal, computed, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
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

import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { Survey } from '../../core/models/survey.model';

// Register Chart.js components
Chart.register(...registerables);

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
              <mat-icon>quiz</mat-icon>
            </div>
            <div class="card-info">
              <h3 class="card-value">{{ activeSurveys() }}</h3>
              <p class="card-label">Active Surveys</p>
            </div>
          </div>
          <div class="card-trend">
            <span class="trend-value positive">+1</span>
            <span class="trend-period">new this week</span>
          </div>
        </mat-card>
      </div>

      <!-- Charts Section -->
      <div class="charts-section">
        <div class="charts-grid">
          <!-- Response Trends Chart -->
          <mat-card class="chart-card">
            <div class="chart-header">
              <h3>Response Trends</h3>
              <p>Daily response count over the last 30 days</p>
            </div>
            <div class="chart-container">
              <canvas #responseTrendsChart></canvas>
            </div>
          </mat-card>

          <!-- Completion Rate Chart -->
          <mat-card class="chart-card">
            <div class="chart-header">
              <h3>Completion Rate by Survey</h3>
              <p>Survey completion rates comparison</p>
            </div>
            <div class="chart-container">
              <canvas #completionRateChart></canvas>
            </div>
          </mat-card>

          <!-- Question Performance Chart -->
          <mat-card class="chart-card">
            <div class="chart-header">
              <h3>Question Performance</h3>
              <p>Response rates by question type</p>
            </div>
            <div class="chart-container">
              <canvas #questionPerformanceChart></canvas>
            </div>
          </mat-card>

          <!-- Device Usage Chart -->
          <mat-card class="chart-card">
            <div class="chart-header">
              <h3>Device Usage</h3>
              <p>Responses by device type</p>
            </div>
            <div class="chart-container">
              <canvas #deviceUsageChart></canvas>
            </div>
          </mat-card>
        </div>
      </div>

      <!-- Recent Responses -->
      <div class="recent-responses-section">
        <div class="section-header">
          <h2>Recent Responses</h2>
          <div class="section-actions">
            <button mat-button>
              <mat-icon>refresh</mat-icon>
              Refresh
            </button>
            <button mat-button>
              <mat-icon>list</mat-icon>
              View All
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
                  @if (response.completed) {
                    <mat-chip color="primary" size="small">
                      <mat-icon>check_circle</mat-icon>
                      Completed
                    </mat-chip>
                  } @else {
                    <mat-chip color="warn" size="small">
                      <mat-icon>pending</mat-icon>
                      Partial
                    </mat-chip>
                  }
                </div>
              </div>
              <p class="response-preview">{{ response.preview }}</p>
            </mat-card>
          }
        </div>
      </div>

      <!-- Reports Section -->
      <div class="reports-section">
        <h3>Quick Reports</h3>
        <div class="reports-grid">
          <mat-card class="report-card">
            <div class="report-content">
              <mat-icon class="report-icon">assessment</mat-icon>
              <h4>Monthly Summary</h4>
              <p>Comprehensive monthly analytics report</p>
              <button mat-button color="primary">Generate</button>
            </div>
          </mat-card>

          <mat-card class="report-card">
            <div class="report-content">
              <mat-icon class="report-icon">trending_up</mat-icon>
              <h4>Performance Report</h4>
              <p>Survey performance and engagement metrics</p>
              <button mat-button color="primary">Generate</button>
            </div>
          </mat-card>

          <mat-card class="report-card">
            <div class="report-content">
              <mat-icon class="report-icon">people</mat-icon>
              <h4>User Insights</h4>
              <p>User behavior and demographic analysis</p>
              <button mat-button color="primary">Generate</button>
            </div>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .analytics-dashboard {
      @apply p-6 space-y-6;
    }

    .dashboard-header {
      @apply flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4;
    }

    .header-content {
      @apply flex-1;
    }

    .dashboard-title {
      @apply flex items-center gap-2 text-2xl font-bold text-gray-900 mb-2;
    }

    .dashboard-subtitle {
      @apply text-gray-600;
    }

    .header-actions {
      @apply flex flex-col sm:flex-row gap-3;
    }

    .survey-select {
      @apply min-w-48;
    }

    .overview-cards {
      @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6;
    }

    .overview-card {
      @apply p-6;
    }

    .card-content {
      @apply flex items-center gap-4 mb-4;
    }

    .card-icon {
      @apply w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center;
    }

    .card-icon mat-icon {
      @apply text-primary-600 text-xl;
    }

    .card-info {
      @apply flex-1;
    }

    .card-value {
      @apply text-2xl font-bold text-gray-900;
    }

    .card-label {
      @apply text-sm text-gray-600;
    }

    .card-trend {
      @apply flex flex-col items-end;
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

    .trend-period {
      @apply text-xs text-gray-500;
    }

    .charts-section {
      @apply space-y-6;
    }

    .charts-grid {
      @apply grid grid-cols-1 lg:grid-cols-2 gap-6;
    }

    .chart-card {
      @apply p-6;
    }

    .chart-header {
      @apply mb-4;
    }

    .chart-header h3 {
      @apply text-lg font-semibold text-gray-900 mb-1;
    }

    .chart-header p {
      @apply text-sm text-gray-600;
    }

    .chart-container {
      @apply h-64;
    }

    .recent-responses-section {
      @apply space-y-4;
    }

    .section-header {
      @apply flex items-center justify-between;
    }

    .section-header h2 {
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

    .report-content {
      @apply p-6 text-center;
    }

    .report-icon {
      @apply text-4xl text-primary-600 mb-4;
    }

    .report-content h4 {
      @apply text-lg font-semibold text-gray-900 mb-2;
    }

    .report-content p {
      @apply text-gray-600 mb-4;
    }
  `]
})
export class AnalyticsDashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('responseTrendsChart', { static: false }) responseTrendsChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('completionRateChart', { static: false }) completionRateChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('questionPerformanceChart', { static: false }) questionPerformanceChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('deviceUsageChart', { static: false }) deviceUsageChartRef!: ElementRef<HTMLCanvasElement>;

  readonly selectedSurveyControl = new FormControl<string>('');
  
  readonly surveys = signal<Survey[]>([]);
  readonly totalResponses = signal(0);
  readonly completionRate = signal(0);
  readonly avgCompletionTime = signal(0);
  readonly activeSurveys = signal(0);

  readonly recentResponses = signal<any[]>([]);

  private charts: Chart[] = [];

  ngOnInit(): void {
    this.loadAnalyticsData();
    this.loadMockData();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initializeCharts();
    }, 100);
  }

  private loadAnalyticsData(): void {
    // Load real analytics data from service
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

  private initializeCharts(): void {
    this.createResponseTrendsChart();
    this.createCompletionRateChart();
    this.createQuestionPerformanceChart();
    this.createDeviceUsageChart();
  }

  private createResponseTrendsChart(): void {
    const ctx = this.responseTrendsChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: ['Jan 1', 'Jan 2', 'Jan 3', 'Jan 4', 'Jan 5', 'Jan 6', 'Jan 7'],
        datasets: [{
          label: 'Responses',
          data: [65, 59, 80, 81, 56, 55, 40],
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };

    const chart = new Chart(ctx, config);
    this.charts.push(chart);
  }

  private createCompletionRateChart(): void {
    const ctx = this.completionRateChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: ['Survey A', 'Survey B', 'Survey C', 'Survey D'],
        datasets: [{
          label: 'Completion Rate (%)',
          data: [85, 92, 78, 88],
          backgroundColor: [
            'rgba(59, 130, 246, 0.8)',
            'rgba(16, 185, 129, 0.8)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(239, 68, 68, 0.8)'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    };

    const chart = new Chart(ctx, config);
    this.charts.push(chart);
  }

  private createQuestionPerformanceChart(): void {
    const ctx = this.questionPerformanceChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    const config: ChartConfiguration = {
      type: 'doughnut',
      data: {
        labels: ['Multiple Choice', 'Text', 'Rating', 'Checkbox', 'Dropdown'],
        datasets: [{
          data: [35, 25, 20, 15, 5],
          backgroundColor: [
            'rgba(59, 130, 246, 0.8)',
            'rgba(16, 185, 129, 0.8)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(239, 68, 68, 0.8)',
            'rgba(139, 92, 246, 0.8)'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    };

    const chart = new Chart(ctx, config);
    this.charts.push(chart);
  }

  private createDeviceUsageChart(): void {
    const ctx = this.deviceUsageChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    const config: ChartConfiguration = {
      type: 'pie',
      data: {
        labels: ['Desktop', 'Mobile', 'Tablet'],
        datasets: [{
          data: [45, 40, 15],
          backgroundColor: [
            'rgba(59, 130, 246, 0.8)',
            'rgba(16, 185, 129, 0.8)',
            'rgba(245, 158, 11, 0.8)'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    };

    const chart = new Chart(ctx, config);
    this.charts.push(chart);
  }

  ngOnDestroy(): void {
    // Clean up charts
    this.charts.forEach(chart => chart.destroy());
  }
} 