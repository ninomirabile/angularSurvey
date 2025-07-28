import { Component, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Import models
import { Survey } from '../../core/models/survey.model';

// Import child components
import { SurveyEditorComponent } from './components/survey-editor/survey-editor.component';
import { SurveyListComponent } from './components/survey-list/survey-list.component';
import { SurveyPreviewComponent } from './components/survey-preview/survey-preview.component';
import { SurveySettingsComponent } from './components/survey-settings/survey-settings.component';

// Import store
import { SurveyBuilderStore } from './store/survey-builder.store';

@Component({
  selector: 'app-survey-builder',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    SurveyEditorComponent,
    SurveyListComponent,
    SurveyPreviewComponent,
    SurveySettingsComponent
  ],
  providers: [SurveyBuilderStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="survey-builder-container">
      <!-- Loading Overlay -->
      @if (store.isLoading()) {
        <div class="loading-overlay">
          <mat-spinner diameter="40"></mat-spinner>
          <p class="loading-text">Loading...</p>
        </div>
      }

      <!-- Error Banner -->
      @if (store.error()) {
        <div class="error-banner">
          <mat-icon>error</mat-icon>
          <span>{{ store.error() }}</span>
          <button mat-icon-button (click)="store.clearError()">
            <mat-icon>close</mat-icon>
          </button>
        </div>
      }

      <!-- Main Toolbar -->
      <mat-toolbar class="builder-toolbar">
        <div class="toolbar-left">
          <span class="toolbar-title">
            <mat-icon>edit</mat-icon>
            Survey Builder
          </span>
          
          @if (store.currentSurvey()) {
            <div class="survey-info">
              <mat-chip color="primary" selected>
                {{ store.currentSurvey()?.title || 'Untitled Survey' }}
              </mat-chip>
              @if (store.hasUnsavedChanges()) {
                <mat-chip color="warn">
                  <mat-icon>save</mat-icon>
                  Unsaved Changes
                </mat-chip>
              }
            </div>
          }
        </div>

        <span class="spacer"></span>

        <div class="toolbar-actions">
          @if (store.currentSurvey()) {
            <button 
              mat-button 
              color="primary" 
              (click)="saveSurvey()"
              [disabled]="store.isLoading() || !store.hasUnsavedChanges()"
            >
              <mat-icon>save</mat-icon>
              Save
            </button>
            
            <button 
              mat-raised-button 
              color="accent" 
              (click)="publishSurvey()"
              [disabled]="store.isLoading() || store.currentSurvey()?.isPublished"
            >
              <mat-icon>publish</mat-icon>
              Publish
            </button>
          }

          <button 
            mat-raised-button 
            color="primary" 
            (click)="createNewSurvey()"
            [disabled]="store.isLoading()"
          >
            <mat-icon>add</mat-icon>
            New Survey
          </button>
        </div>
      </mat-toolbar>

      <!-- Main Content -->
      <div class="builder-content">
        @if (store.currentSurvey()) {
          <!-- Survey Editor Tabs -->
          <mat-tab-group 
            class="builder-tabs" 
            [selectedIndex]="store.selectedTab()"
            (selectedTabChange)="onTabChange($event)"
          >
            <mat-tab label="Editor">
              <div class="tab-content">
                <app-survey-editor 
                  [survey]="store.currentSurvey()!"
                  (surveyChange)="onSurveyChange($event)"
                ></app-survey-editor>
              </div>
            </mat-tab>
            
            <mat-tab label="Preview">
              <div class="tab-content">
                <app-survey-preview 
                  [survey]="store.currentSurvey()!"
                ></app-survey-preview>
              </div>
            </mat-tab>
            
            <mat-tab label="Settings">
              <div class="tab-content">
                <app-survey-settings 
                  [survey]="store.currentSurvey()!"
                  (settingsChange)="onSettingsChange($event)"
                ></app-survey-settings>
              </div>
            </mat-tab>
          </mat-tab-group>
        } @else {
          <!-- Survey List View -->
          <div class="survey-list-view">
            <div class="list-header">
              <h2>My Surveys</h2>
              <p>Select a survey to edit or create a new one</p>
            </div>
            
            <app-survey-list 
              [surveys]="store.surveys()"
              (surveySelect)="store.selectSurvey($event)"
              (surveyDelete)="deleteSurvey($event)"
              (surveyDuplicate)="duplicateSurvey($event)"
            ></app-survey-list>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .survey-builder-container {
      @apply h-screen flex flex-col bg-gray-50;
    }

    .loading-overlay {
      @apply fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50;
    }

    .loading-text {
      @apply text-white ml-3 text-lg;
    }

    .error-banner {
      @apply bg-red-100 border-l-4 border-red-500 text-red-700 p-4 flex items-center gap-2;
    }

    .builder-toolbar {
      @apply bg-white border-b border-gray-200 shadow-sm;
    }

    .toolbar-left {
      @apply flex items-center gap-4;
    }

    .toolbar-title {
      @apply flex items-center gap-2 font-medium text-lg;
    }

    .survey-info {
      @apply flex items-center gap-2;
    }

    .spacer {
      @apply flex-1;
    }

    .toolbar-actions {
      @apply flex items-center gap-2;
    }

    .builder-content {
      @apply flex-1 overflow-hidden;
    }

    .builder-tabs {
      @apply h-full;
    }

    .tab-content {
      @apply p-6 h-full overflow-auto;
    }

    .survey-list-view {
      @apply p-6 max-w-6xl mx-auto;
    }

    .list-header {
      @apply mb-6;
    }

    .list-header h2 {
      @apply text-2xl font-bold text-gray-900 mb-2;
    }

    .list-header p {
      @apply text-gray-600;
    }

    /* Angular Material overrides */
    ::ng-deep .mat-mdc-tab-body-wrapper {
      height: 100%;
    }

    ::ng-deep .mat-mdc-tab-body-content {
      height: 100%;
    }
  `]
})
export class SurveyBuilderComponent {
  readonly store = inject(SurveyBuilderStore);

  onTabChange(event: any): void {
    this.store.setSelectedTab(event.index);
  }

  createNewSurvey(): void {
    const newSurvey: Partial<Survey> = {
      title: 'New Survey',
      description: 'Enter your survey description here',
      isPublic: false,
      isPublished: false,
      questions: []
    };
    
    this.store.createSurvey(newSurvey);
  }

  saveSurvey(): void {
    const currentSurvey = this.store.currentSurvey();
    if (currentSurvey) {
      this.store.updateSurvey({ id: currentSurvey.id, updates: currentSurvey });
    }
  }

  publishSurvey(): void {
    const currentSurvey = this.store.currentSurvey();
    if (currentSurvey && !currentSurvey.isPublished) {
      this.store.publishSurvey(currentSurvey.id);
    }
  }

  deleteSurvey(surveyId: string): void {
    this.store.deleteSurvey(surveyId);
  }

  duplicateSurvey(surveyId: string): void {
    this.store.duplicateSurvey(surveyId);
  }

  onSurveyChange(survey: Survey): void {
    this.store.markAsDirty();
    // Auto-save if enabled
    if (this.store.autoSaveEnabled()) {
      this.store.autoSave(survey);
    }
  }

  onSettingsChange(settings: any): void {
    const currentSurvey = this.store.currentSurvey();
    if (currentSurvey) {
      this.store.updateSurvey({ 
        id: currentSurvey.id, 
        updates: { settings: { ...currentSurvey.settings, ...settings } }
      });
    }
  }
} 