import { Component, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-lazy-loading-demo',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatChipsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="lazy-loading-demo">
      <mat-card class="demo-card">
        <mat-card-header>
          <mat-card-title>
            <mat-icon>download</mat-icon>
            Lazy Loading Demo
          </mat-card-title>
          <mat-card-subtitle>
            Interactive demonstration of Angular 20 lazy loading concepts
          </mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <!-- Module Status -->
          <div class="module-status">
            <h3>📦 Module Loading Status</h3>
            <div class="status-grid">
              <div class="status-item" [class.loaded]="surveyBuilderLoaded()">
                <mat-icon>{{ surveyBuilderLoaded() ? 'check_circle' : 'pending' }}</mat-icon>
                <span>Survey Builder</span>
                <mat-chip [color]="surveyBuilderLoaded() ? 'primary' : 'warn'" size="small">
                  {{ surveyBuilderLoaded() ? 'Loaded' : 'Pending' }}
                </mat-chip>
              </div>
              
              <div class="status-item" [class.loaded]="surveyRunnerLoaded()">
                <mat-icon>{{ surveyRunnerLoaded() ? 'check_circle' : 'pending' }}</mat-icon>
                <span>Survey Runner</span>
                <mat-chip [color]="surveyRunnerLoaded() ? 'primary' : 'warn'" size="small">
                  {{ surveyRunnerLoaded() ? 'Loaded' : 'Pending' }}
                </mat-chip>
              </div>
              
              <div class="status-item" [class.loaded]="analyticsLoaded()">
                <mat-icon>{{ analyticsLoaded() ? 'check_circle' : 'pending' }}</mat-icon>
                <span>Analytics</span>
                <mat-chip [color]="analyticsLoaded() ? 'primary' : 'warn'" size="small">
                  {{ analyticsLoaded() ? 'Loaded' : 'Pending' }}
                </mat-chip>
              </div>
              
              <div class="status-item" [class.loaded]="adminLoaded()">
                <mat-icon>{{ adminLoaded() ? 'check_circle' : 'pending' }}</mat-icon>
                <span>Admin</span>
                <mat-chip [color]="adminLoaded() ? 'primary' : 'warn'" size="small">
                  {{ adminLoaded() ? 'Loaded' : 'Pending' }}
                </mat-chip>
              </div>
            </div>
          </div>

          <!-- Loading Progress -->
          <div class="loading-progress">
            <h3>📊 Loading Progress</h3>
            <mat-progress-bar 
              [value]="loadingProgress()" 
              [color]="loadingProgress() === 100 ? 'primary' : 'accent'"
            ></mat-progress-bar>
            <p class="progress-text">{{ loadingProgress() }}% of modules loaded</p>
          </div>

          <!-- Bundle Size Impact -->
          <div class="bundle-impact">
            <h3>📈 Bundle Size Impact</h3>
            <div class="bundle-stats">
              <div class="stat-item">
                <span class="stat-label">Initial Bundle:</span>
                <span class="stat-value">149KB</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Lazy Chunks:</span>
                <span class="stat-value">{{ loadedChunks() }} chunks</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Total Loaded:</span>
                <span class="stat-value">{{ totalLoadedSize() }}KB</span>
              </div>
            </div>
          </div>

          <!-- Interactive Actions -->
          <div class="interactive-actions">
            <h3>🎮 Interactive Actions</h3>
            <div class="action-buttons">
              <button 
                mat-raised-button 
                color="primary" 
                (click)="simulateNavigation('survey-builder')"
                [disabled]="isLoading()"
              >
                <mat-icon>edit</mat-icon>
                Navigate to Survey Builder
              </button>
              
              <button 
                mat-raised-button 
                color="accent" 
                (click)="simulateNavigation('survey-runner')"
                [disabled]="isLoading()"
              >
                <mat-icon>play_arrow</mat-icon>
                Navigate to Survey Runner
              </button>
              
              <button 
                mat-raised-button 
                color="warn" 
                (click)="simulateNavigation('analytics')"
                [disabled]="isLoading()"
              >
                <mat-icon>analytics</mat-icon>
                Navigate to Analytics
              </button>
              
              <button 
                mat-raised-button 
                (click)="simulateNavigation('admin')"
                [disabled]="isLoading()"
              >
                <mat-icon>admin_panel_settings</mat-icon>
                Navigate to Admin
              </button>
            </div>
          </div>

          <!-- Educational Info -->
          <div class="educational-info">
            <h3>📚 Educational Information</h3>
            <div class="info-grid">
              <div class="info-item">
                <h4>🚀 Benefits of Lazy Loading</h4>
                <ul>
                  <li>Faster initial page load</li>
                  <li>Reduced bundle size</li>
                  <li>Better user experience</li>
                  <li>Improved performance</li>
                </ul>
              </div>
              
              <div class="info-item">
                <h4>⚡ How It Works</h4>
                <ul>
                  <li>Modules loaded on demand</li>
                  <li>Separate chunks created</li>
                  <li>Route-based loading</li>
                  <li>Automatic code splitting</li>
                </ul>
              </div>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .lazy-loading-demo {
      @apply p-6;
    }

    .demo-card {
      @apply max-w-4xl mx-auto;
    }

    .module-status,
    .loading-progress,
    .bundle-impact,
    .interactive-actions,
    .educational-info {
      @apply mb-6;
    }

    .module-status h3,
    .loading-progress h3,
    .bundle-impact h3,
    .interactive-actions h3,
    .educational-info h3 {
      @apply text-lg font-semibold text-gray-900 mb-3;
    }

    .status-grid {
      @apply grid grid-cols-1 md:grid-cols-2 gap-3;
    }

    .status-item {
      @apply flex items-center gap-3 p-3 bg-gray-50 rounded-lg transition-all duration-200;
    }

    .status-item.loaded {
      @apply bg-green-50 border border-green-200;
    }

    .status-item mat-icon {
      @apply text-gray-500;
    }

    .status-item.loaded mat-icon {
      @apply text-green-600;
    }

    .loading-progress {
      @apply space-y-2;
    }

    .progress-text {
      @apply text-sm text-gray-600 text-center;
    }

    .bundle-stats {
      @apply grid grid-cols-1 md:grid-cols-3 gap-4;
    }

    .stat-item {
      @apply flex justify-between items-center p-3 bg-blue-50 rounded-lg;
    }

    .stat-label {
      @apply text-sm font-medium text-gray-700;
    }

    .stat-value {
      @apply text-lg font-semibold text-blue-600;
    }

    .action-buttons {
      @apply grid grid-cols-1 md:grid-cols-2 gap-3;
    }

    .action-buttons button {
      @apply justify-start;
    }

    .info-grid {
      @apply grid grid-cols-1 md:grid-cols-2 gap-6;
    }

    .info-item {
      @apply p-4 bg-gray-50 rounded-lg;
    }

    .info-item h4 {
      @apply text-base font-semibold text-gray-900 mb-2;
    }

    .info-item ul {
      @apply space-y-1;
    }

    .info-item li {
      @apply text-sm text-gray-600;
    }

    /* Animation for loading states */
    .status-item {
      @apply transition-all duration-300;
    }

    .status-item.loading {
      @apply animate-pulse;
    }
  `]
})
export class LazyLoadingDemoComponent {
  readonly surveyBuilderLoaded = signal(false);
  readonly surveyRunnerLoaded = signal(false);
  readonly analyticsLoaded = signal(false);
  readonly adminLoaded = signal(false);
  readonly isLoading = signal(false);

  readonly loadingProgress = computed(() => {
    const loaded = [
      this.surveyBuilderLoaded(),
      this.surveyRunnerLoaded(),
      this.analyticsLoaded(),
      this.adminLoaded()
    ].filter(Boolean).length;
    return (loaded / 4) * 100;
  });

  readonly loadedChunks = computed(() => {
    return [
      this.surveyBuilderLoaded(),
      this.surveyRunnerLoaded(),
      this.analyticsLoaded(),
      this.adminLoaded()
    ].filter(Boolean).length;
  });

  readonly totalLoadedSize = computed(() => {
    const baseSize = 149; // Initial bundle size
    const chunkSizes = {
      'survey-builder': 488,
      'survey-runner': 12,
      'analytics': 65,
      'admin': 3
    };
    
    let total = baseSize;
    if (this.surveyBuilderLoaded()) total += chunkSizes['survey-builder'];
    if (this.surveyRunnerLoaded()) total += chunkSizes['survey-runner'];
    if (this.analyticsLoaded()) total += chunkSizes['analytics'];
    if (this.adminLoaded()) total += chunkSizes['admin'];
    
    return total;
  });

  simulateNavigation(module: string): void {
    this.isLoading.set(true);
    
    // Simulate loading delay
    setTimeout(() => {
      switch (module) {
        case 'survey-builder':
          this.surveyBuilderLoaded.set(true);
          break;
        case 'survey-runner':
          this.surveyRunnerLoaded.set(true);
          break;
        case 'analytics':
          this.analyticsLoaded.set(true);
          break;
        case 'admin':
          this.adminLoaded.set(true);
          break;
      }
      this.isLoading.set(false);
    }, 1500);
  }
} 