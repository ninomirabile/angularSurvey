import { Component, OnInit, inject, signal, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';

// SurveyJS imports - using specific imports
import { SurveyCreator } from 'survey-creator-js';
import { SurveyModel } from 'survey-core';
import { Survey, QuestionType } from '../../../../core/models/survey.model';

@Component({
  selector: 'app-survey-editor',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatChipsModule
  ],
  template: `
    <div class="survey-editor-container">
      @if (survey) {
        <div class="editor-header">
          <div class="survey-info">
            <h2 class="survey-title">{{ survey.title }}</h2>
            <div class="survey-meta">
              <mat-chip color="primary" size="small">
                <mat-icon>edit</mat-icon>
                Editor Mode
              </mat-chip>
              <mat-chip [color]="survey.isPublished ? 'accent' : 'warn'" size="small">
                <mat-icon>{{ survey.isPublished ? 'published_with_changes' : 'drafts' }}</mat-icon>
                {{ survey.isPublished ? 'Published' : 'Draft' }}
              </mat-chip>
            </div>
          </div>
        </div>

        <mat-tab-group class="editor-tabs">
          <mat-tab label="Designer">
            <div class="tab-content">
              <div class="designer-container">
                <div class="toolbar">
                  <div class="toolbar-section">
                    <h3>Question Types</h3>
                    <div class="question-types">
                      <button mat-button class="question-type-btn" (click)="addQuestion('text')">
                        <mat-icon>short_text</mat-icon>
                        Text
                      </button>
                      <button mat-button class="question-type-btn" (click)="addQuestion('textarea')">
                        <mat-icon>subject</mat-icon>
                        Long Text
                      </button>
                      <button mat-button class="question-type-btn" (click)="addQuestion('radio')">
                        <mat-icon>radio_button_checked</mat-icon>
                        Multiple Choice
                      </button>
                      <button mat-button class="question-type-btn" (click)="addQuestion('checkbox')">
                        <mat-icon>check_box</mat-icon>
                        Checkboxes
                      </button>
                      <button mat-button class="question-type-btn" (click)="addQuestion('select')">
                        <mat-icon>list</mat-icon>
                        Dropdown
                      </button>
                      <button mat-button class="question-type-btn" (click)="addQuestion('rating')">
                        <mat-icon>star</mat-icon>
                        Rating
                      </button>
                    </div>
                  </div>
                </div>
                
                <div class="designer-workspace">
                  <div class="workspace-header">
                    <h3>Survey Designer</h3>
                    <p>Drag and drop questions or use the toolbar above</p>
                  </div>
                  
                  <div class="questions-list">
                    @if (survey.questions && survey.questions.length > 0) {
                      @for (question of survey.questions; track question.id; let i = $index) {
                        <div class="question-item">
                          <div class="question-header">
                            <span class="question-number">{{ i + 1 }}</span>
                            <span class="question-title">{{ question.title }}</span>
                            <div class="question-actions">
                              <button mat-icon-button size="small">
                                <mat-icon>edit</mat-icon>
                              </button>
                              <button mat-icon-button size="small" color="warn">
                                <mat-icon>delete</mat-icon>
                              </button>
                            </div>
                          </div>
                          <div class="question-preview">
                            <mat-icon>{{ getQuestionIcon(question.type) }}</mat-icon>
                            <span>{{ question.type }} question</span>
                          </div>
                        </div>
                      }
                    } @else {
                      <div class="empty-state">
                        <mat-icon class="empty-icon">quiz</mat-icon>
                        <h3>No questions yet</h3>
                        <p>Add your first question using the toolbar above</p>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </mat-tab>
          
          <mat-tab label="Logic">
            <div class="tab-content">
              <div class="logic-container">
                <h3>Conditional Logic</h3>
                <p>Set up conditional logic for your questions</p>
                <div class="logic-placeholder">
                  <mat-icon>settings</mat-icon>
                  <span>Logic editor coming soon...</span>
                </div>
              </div>
            </div>
          </mat-tab>
          
          <mat-tab label="JSON">
            <div class="tab-content">
              <div class="json-container">
                <h3>JSON Editor</h3>
                <p>Edit survey configuration in JSON format</p>
                <pre class="json-editor">{{ surveyJson }}</pre>
              </div>
            </div>
          </mat-tab>
        </mat-tab-group>
      } @else {
        <div class="no-survey">
          <mat-icon class="no-survey-icon">quiz</mat-icon>
          <h3>No survey selected</h3>
          <p>Select a survey to start editing</p>
        </div>
      }
    </div>
  `,
  styles: [`
    .survey-editor-container {
      @apply h-full flex flex-col;
    }

    .editor-header {
      @apply bg-white border-b border-gray-200 p-4;
    }

    .survey-title {
      @apply text-xl font-semibold text-gray-900 mb-2;
    }

    .survey-meta {
      @apply flex gap-2;
    }

    .editor-tabs {
      @apply flex-1;
    }

    .tab-content {
      @apply p-6 h-full overflow-auto;
    }

    .designer-container {
      @apply flex h-full;
    }

    .toolbar {
      @apply w-64 bg-gray-50 border-r border-gray-200 p-4;
    }

    .toolbar-section h3 {
      @apply text-sm font-medium text-gray-700 mb-3;
    }

    .question-types {
      @apply space-y-2;
    }

    .question-type-btn {
      @apply w-full justify-start text-left;
    }

    .designer-workspace {
      @apply flex-1 p-6;
    }

    .workspace-header {
      @apply mb-6;
    }

    .workspace-header h3 {
      @apply text-lg font-semibold text-gray-900 mb-2;
    }

    .workspace-header p {
      @apply text-gray-600;
    }

    .questions-list {
      @apply space-y-4;
    }

    .question-item {
      @apply bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow;
    }

    .question-header {
      @apply flex items-center gap-3 mb-2;
    }

    .question-number {
      @apply bg-primary-100 text-primary-700 w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium;
    }

    .question-title {
      @apply flex-1 font-medium text-gray-900;
    }

    .question-actions {
      @apply flex gap-1;
    }

    .question-preview {
      @apply flex items-center gap-2 text-gray-600 text-sm;
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

    .logic-container,
    .json-container {
      @apply p-6;
    }

    .logic-container h3,
    .json-container h3 {
      @apply text-lg font-semibold text-gray-900 mb-2;
    }

    .logic-container p,
    .json-container p {
      @apply text-gray-600 mb-4;
    }

    .logic-placeholder {
      @apply flex items-center gap-2 text-gray-500 p-8 border-2 border-dashed border-gray-300 rounded-lg;
    }

    .json-editor {
      @apply bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-auto max-h-96;
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
  `]
})
export class SurveyEditorComponent implements OnInit, OnChanges {
  @Input() survey: Survey | null = null;
  @Output() surveyChange = new EventEmitter<Survey>();
  
  readonly creatorStatus = signal<string>('Not tested');
  readonly coreStatus = signal<string>('Not tested');

  ngOnInit(): void {
    this.testSurveyJSImports();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['survey'] && this.survey) {
      this.initializeEditor();
    }
  }

  private initializeEditor(): void {
    console.log('Initializing editor with survey:', this.survey);
    
    // Emit the current survey for now (placeholder)
    if (this.survey) {
      this.surveyChange.emit(this.survey);
    }
  }

  addQuestion(type: QuestionType): void {
    if (!this.survey) return;

    const newQuestion = {
      id: this.generateId(),
      type: type,
      title: `New ${type} question`,
      description: '',
      required: false,
      order: this.survey.questions?.length || 0
    };

    const updatedSurvey = {
      ...this.survey,
      questions: [...(this.survey.questions || []), newQuestion]
    };

    this.surveyChange.emit(updatedSurvey);
  }

  getQuestionIcon(type: QuestionType): string {
    const icons: { [key in QuestionType]: string } = {
      text: 'short_text',
      textarea: 'subject',
      radio: 'radio_button_checked',
      checkbox: 'check_box',
      select: 'list',
      rating: 'star',
      number: 'numbers',
      email: 'email',
      date: 'calendar_today',
      time: 'schedule',
      datetime: 'event',
      multiselect: 'list_alt',
      scale: 'linear_scale',
      file: 'attach_file',
      location: 'location_on',
      signature: 'draw',
      phone: 'phone'
    };
    return icons[type] || 'help';
  }

  get surveyJson(): string {
    return this.survey ? JSON.stringify(this.survey, null, 2) : '{}';
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  testSurveyJSImports(): void {
    try {
      // Test Survey Creator
      if (typeof SurveyCreator !== 'undefined') {
        this.creatorStatus.set('✅ Survey Creator loaded successfully');
      } else {
        this.creatorStatus.set('❌ Survey Creator not available');
      }

      // Test Survey Core
      if (typeof SurveyModel !== 'undefined') {
        this.coreStatus.set('✅ Survey Core loaded successfully');
      } else {
        this.coreStatus.set('❌ Survey Core not available');
      }
    } catch (error) {
      console.error('Error testing SurveyJS imports:', error);
      this.creatorStatus.set('❌ Error loading Survey Creator');
      this.coreStatus.set('❌ Error loading Survey Core');
    }
  }
} 