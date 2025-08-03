import { Component, inject, signal, computed, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

import { SurveyBuilderStore } from '../../../features/survey-builder/store/survey-builder.store';
import { SurveyService } from '../../../core/services/survey.service';
import { NotificationService } from '../../../core/services/notification.service';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-dev-tools',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="dev-tools-panel" [class.collapsed]="isCollapsed()">
      <!-- Toggle Button -->
      <button 
        class="dev-tools-toggle" 
        (click)="togglePanel()"
        [class.expanded]="!isCollapsed()"
      >
        <mat-icon>{{ isCollapsed() ? 'code' : 'close' }}</mat-icon>
        <span>Dev Tools</span>
      </button>

      <!-- Panel Content -->
      @if (!isCollapsed()) {
        <div class="dev-tools-content">
          <div class="panel-header">
            <h3>🛠️ Developer Tools</h3>
            <p>Interact with state management and see real-time updates</p>
          </div>

          <!-- State Management Section -->
          <mat-expansion-panel class="state-panel">
            <mat-expansion-panel-header>
              <mat-panel-title>
                <mat-icon>memory</mat-icon>
                State Management
              </mat-panel-title>
            </mat-expansion-panel-header>

            <!-- Signals Display -->
            <div class="signals-section">
              <h4>📊 Current Signals</h4>
              <div class="signal-grid">
                <div class="signal-item">
                  <span class="signal-label">Surveys Count:</span>
                  <mat-chip color="primary">{{ store.surveyCount() }}</mat-chip>
                </div>
                <div class="signal-item">
                  <span class="signal-label">Published:</span>
                  <mat-chip color="accent">{{ store.publishedSurveys().length }}</mat-chip>
                </div>
                <div class="signal-item">
                  <span class="signal-label">Drafts:</span>
                  <mat-chip color="warn">{{ store.draftSurveys().length }}</mat-chip>
                </div>
                <div class="signal-item">
                  <span class="signal-label">Loading:</span>
                  <mat-chip [color]="store.isLoading() ? 'warn' : 'primary'">
                    {{ store.isLoading() ? 'Yes' : 'No' }}
                  </mat-chip>
                </div>
                <div class="signal-item">
                  <span class="signal-label">Dirty:</span>
                  <mat-chip [color]="store.hasUnsavedChanges() ? 'warn' : 'primary'">
                    {{ store.hasUnsavedChanges() ? 'Yes' : 'No' }}
                  </mat-chip>
                </div>
              </div>
            </div>

            <!-- State Actions -->
            <div class="state-actions">
              <h4>🎮 Manual State Triggers</h4>
              <div class="action-buttons">
                <button mat-raised-button color="primary" (click)="triggerLoadSurveys()">
                  <mat-icon>refresh</mat-icon>
                  Load Surveys
                </button>
                <button mat-raised-button color="accent" (click)="triggerCreateSurvey()">
                  <mat-icon>add</mat-icon>
                  Create Survey
                </button>
                <button mat-raised-button color="warn" (click)="triggerError()">
                  <mat-icon>error</mat-icon>
                  Trigger Error
                </button>
                <button mat-raised-button (click)="toggleAutoSave()">
                  <mat-icon>save</mat-icon>
                  Toggle Auto-Save
                </button>
              </div>
            </div>
          </mat-expansion-panel>

          <!-- Services Section -->
          <mat-expansion-panel class="services-panel">
            <mat-expansion-panel-header>
              <mat-panel-title>
                <mat-icon>build</mat-icon>
                Services Testing
              </mat-panel-title>
            </mat-expansion-panel-header>

            <div class="services-section">
              <h4>🔧 Service Interactions</h4>
              <div class="service-actions">
                <button mat-raised-button color="primary" (click)="testNotification()">
                  <mat-icon>notifications</mat-icon>
                  Test Notification
                </button>
                <button mat-raised-button color="accent" (click)="toggleTheme()">
                  <mat-icon>palette</mat-icon>
                  Toggle Theme
                </button>
                <button mat-raised-button color="warn" (click)="clearStorage()">
                  <mat-icon>storage</mat-icon>
                  Clear Storage
                </button>
              </div>
            </div>
          </mat-expansion-panel>

          <!-- Performance Section -->
          <mat-expansion-panel class="performance-panel">
            <mat-expansion-panel-header>
              <mat-panel-title>
                <mat-icon>speed</mat-icon>
                Performance
              </mat-panel-title>
            </mat-expansion-panel-header>

            <div class="performance-section">
              <h4>⚡ Performance Metrics</h4>
              <div class="metrics-grid">
                <div class="metric-item">
                  <span class="metric-label">Change Detection:</span>
                  <mat-chip color="primary">OnPush</mat-chip>
                </div>
                <div class="metric-item">
                  <span class="metric-label">Lazy Loading:</span>
                  <mat-chip color="accent">Enabled</mat-chip>
                </div>
                <div class="metric-item">
                  <span class="metric-label">Signals:</span>
                  <mat-chip color="primary">{{ activeSignals() }}</mat-chip>
                </div>
              </div>
            </div>
          </mat-expansion-panel>

          <!-- Live State Monitor -->
          <mat-expansion-panel class="monitor-panel" [expanded]="true">
            <mat-expansion-panel-header>
              <mat-panel-title>
                <mat-icon>monitor</mat-icon>
                Live State Monitor
              </mat-panel-title>
            </mat-expansion-panel-header>

            <div class="monitor-section">
              <h4>📺 Real-time State Changes</h4>
              <div class="state-log">
                @for (log of stateLog(); track log.id) {
                  <div class="log-entry" [class]="log.type">
                    <span class="log-time">{{ log.timestamp | date:'HH:mm:ss' }}</span>
                    <span class="log-message">{{ log.message }}</span>
                    <mat-chip size="small" [color]="log.type === 'error' ? 'warn' : 'primary'">
                      {{ log.type }}
                    </mat-chip>
                  </div>
                }
              </div>
              <button mat-button (click)="clearLog()">
                <mat-icon>clear</mat-icon>
                Clear Log
              </button>
            </div>
          </mat-expansion-panel>
        </div>
      }
    </div>
  `,
  styles: [`
    .dev-tools-panel {
      @apply fixed bottom-4 right-4 z-50 transition-all duration-300;
    }

    .dev-tools-panel.collapsed {
      @apply w-auto;
    }

    .dev-tools-toggle {
      @apply bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 hover:bg-blue-700 transition-colors;
    }

    .dev-tools-toggle.expanded {
      @apply bg-red-600 hover:bg-red-700;
    }

    .dev-tools-content {
      @apply bg-white rounded-lg shadow-xl border border-gray-200 w-96 max-h-96 overflow-y-auto;
    }

    .panel-header {
      @apply p-4 border-b border-gray-200;
    }

    .panel-header h3 {
      @apply text-lg font-semibold text-gray-900 mb-1;
    }

    .panel-header p {
      @apply text-sm text-gray-600;
    }

    .state-panel,
    .services-panel,
    .performance-panel,
    .monitor-panel {
      @apply m-4;
    }

    .signals-section,
    .state-actions,
    .services-section,
    .performance-section,
    .monitor-section {
      @apply space-y-4;
    }

    .signals-section h4,
    .state-actions h4,
    .services-section h4,
    .performance-section h4,
    .monitor-section h4 {
      @apply text-base font-semibold text-gray-900 mb-3;
    }

    .signal-grid,
    .metrics-grid {
      @apply grid grid-cols-2 gap-3;
    }

    .signal-item,
    .metric-item {
      @apply flex items-center justify-between p-2 bg-gray-50 rounded;
    }

    .signal-label,
    .metric-label {
      @apply text-sm font-medium text-gray-700;
    }

    .action-buttons,
    .service-actions {
      @apply grid grid-cols-2 gap-2;
    }

    .action-buttons button,
    .service-actions button {
      @apply text-xs;
    }

    .state-log {
      @apply max-h-32 overflow-y-auto bg-gray-50 rounded p-2 space-y-1;
    }

    .log-entry {
      @apply flex items-center gap-2 text-xs p-1 rounded;
    }

    .log-entry.info {
      @apply bg-blue-100 text-blue-800;
    }

    .log-entry.success {
      @apply bg-green-100 text-green-800;
    }

    .log-entry.warn {
      @apply bg-yellow-100 text-yellow-800;
    }

    .log-entry.error {
      @apply bg-red-100 text-red-800;
    }

    .log-time {
      @apply font-mono text-gray-500;
    }

    .log-message {
      @apply flex-1;
    }

    /* Animation for state changes */
    .signal-item mat-chip,
    .metric-item mat-chip {
      @apply transition-all duration-200;
    }

    .signal-item mat-chip.updated {
      @apply scale-110 bg-yellow-400;
    }
  `]
})
export class DevToolsComponent implements OnInit {
  readonly store = inject(SurveyBuilderStore);
  private readonly surveyService = inject(SurveyService);
  private readonly notificationService = inject(NotificationService);
  private readonly themeService = inject(ThemeService);

  readonly isCollapsed = signal(true);
  readonly stateLog = signal<Array<{id: number, timestamp: Date, message: string, type: 'info' | 'success' | 'warn' | 'error'}>>([]);
  readonly activeSignals = signal(0);

  private logCounter = 0;

  ngOnInit(): void {
    this.addLog('Dev Tools initialized', 'info');
    this.startSignalMonitoring();
  }

  togglePanel(): void {
    this.isCollapsed.update(collapsed => !collapsed);
    this.addLog(`Dev Tools panel ${this.isCollapsed() ? 'collapsed' : 'expanded'}`, 'info');
  }

  triggerLoadSurveys(): void {
    this.addLog('Manually triggering survey load...', 'info');
    this.store.loadSurveys();
  }

  triggerCreateSurvey(): void {
    const testSurvey = {
      title: `Test Survey ${Date.now()}`,
      description: 'Auto-generated test survey',
      isPublic: false,
      isPublished: false,
      questions: []
    };
    this.addLog('Creating test survey...', 'info');
    this.store.createSurvey(testSurvey);
  }

  triggerError(): void {
    this.addLog('Simulating error state...', 'error');
    this.notificationService.error('This is a simulated error for educational purposes');
  }

  toggleAutoSave(): void {
    const currentState = this.store.autoSaveEnabled();
    this.store.setAutoSave(!currentState);
    this.addLog(`Auto-save ${!currentState ? 'enabled' : 'disabled'}`, 'warn');
  }

  testNotification(): void {
    this.addLog('Testing notification service...', 'info');
    this.notificationService.success('Test notification from Dev Tools!');
  }

  toggleTheme(): void {
    this.addLog('Toggling theme...', 'info');
    this.themeService.toggleTheme();
  }

  clearStorage(): void {
    this.addLog('Clearing local storage...', 'warn');
    localStorage.clear();
    this.notificationService.error('Local storage cleared');
  }

  clearLog(): void {
    this.stateLog.set([]);
  }

  private addLog(message: string, type: 'info' | 'success' | 'warn' | 'error'): void {
    this.stateLog.update(logs => [
      {
        id: ++this.logCounter,
        timestamp: new Date(),
        message,
        type
      },
      ...logs.slice(0, 19) // Keep last 20 entries
    ]);
  }

  private startSignalMonitoring(): void {
    // Monitor signal changes for educational purposes
    // Note: In a real implementation, you would use effect() or computed()
    // For now, we'll just log when the component initializes
    this.addLog('Signal monitoring initialized', 'info');
  }
} 