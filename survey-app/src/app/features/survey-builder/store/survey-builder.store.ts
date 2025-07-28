import { Injectable, inject, signal, computed } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable, switchMap, tap, catchError, EMPTY } from 'rxjs';
import { SurveyService } from '../../../core/services/survey.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Survey, SurveyTemplate } from '../../../core/models/survey.model';

// State interface
export interface SurveyBuilderState {
  surveys: Survey[];
  currentSurvey: Survey | null;
  isLoading: boolean;
  error: string | null;
  selectedTab: number;
  isDirty: boolean;
  autoSaveEnabled: boolean;
}

// Initial state
const initialState: SurveyBuilderState = {
  surveys: [],
  currentSurvey: null,
  isLoading: false,
  error: null,
  selectedTab: 0,
  isDirty: false,
  autoSaveEnabled: true
};

@Injectable()
export class SurveyBuilderStore extends ComponentStore<SurveyBuilderState> {
  private readonly surveyService = inject(SurveyService);
  private readonly notificationService = inject(NotificationService);

  // Signals for reactive state
  readonly surveys = signal<Survey[]>([]);
  readonly currentSurvey = signal<Survey | null>(null);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);
  readonly selectedTab = signal(0);
  readonly isDirty = signal(false);
  readonly autoSaveEnabled = signal(true);

  // Computed signals
  readonly publishedSurveys = computed(() => 
    this.surveys().filter(s => s.isPublished)
  );

  readonly draftSurveys = computed(() => 
    this.surveys().filter(s => !s.isPublished)
  );

  readonly surveyCount = computed(() => this.surveys().length);

  readonly hasUnsavedChanges = computed(() => 
    this.isDirty() && this.currentSurvey() !== null
  );

  constructor() {
    super(initialState);
    this.loadSurveys();
  }

  // Actions
  readonly setSelectedTab = this.updater((state, tab: number) => ({
    ...state,
    selectedTab: tab
  }));

  readonly setCurrentSurvey = this.updater((state, survey: Survey | null) => ({
    ...state,
    currentSurvey: survey,
    isDirty: false
  }));

  readonly setDirty = this.updater((state, isDirty: boolean) => ({
    ...state,
    isDirty
  }));

  readonly setAutoSave = this.updater((state, enabled: boolean) => ({
    ...state,
    autoSaveEnabled: enabled
  }));

  // Effects
  readonly loadSurveys = this.effect((trigger$) => 
    trigger$.pipe(
      tap(() => {
        this.isLoading.set(true);
        this.error.set(null);
      }),
      switchMap(() => this.surveyService.getAllSurveys()),
      tap((surveys) => {
        this.surveys.set(surveys);
        this.isLoading.set(false);
      }),
      catchError((error) => {
        this.error.set(error.message);
        this.isLoading.set(false);
        this.notificationService.error('Failed to load surveys');
        return EMPTY;
      })
    )
  );

  readonly createSurvey = this.effect<Partial<Survey>>((survey$) =>
    survey$.pipe(
      tap(() => {
        this.isLoading.set(true);
        this.error.set(null);
      }),
      switchMap(surveyData => this.surveyService.createSurvey(surveyData)),
      tap((newSurvey) => {
        this.surveys.update(surveys => [...surveys, newSurvey]);
        this.setCurrentSurvey(newSurvey);
        this.setSelectedTab(0); // Switch to editor tab
        this.isLoading.set(false);
        this.notificationService.success('Survey created successfully');
      }),
      catchError((error) => {
        this.error.set(error.message);
        this.isLoading.set(false);
        this.notificationService.error('Failed to create survey');
        return EMPTY;
      })
    )
  );

  readonly updateSurvey = this.effect<{ id: string; updates: Partial<Survey> }>((update$) =>
    update$.pipe(
      tap(() => {
        this.isLoading.set(true);
        this.error.set(null);
      }),
      switchMap(({ id, updates }) => this.surveyService.updateSurvey(id, updates)),
      tap((updatedSurvey) => {
        this.surveys.update(surveys => 
          surveys.map(s => s.id === updatedSurvey.id ? updatedSurvey : s)
        );
        this.setCurrentSurvey(updatedSurvey);
        this.setDirty(false);
        this.isLoading.set(false);
        this.notificationService.success('Survey updated successfully');
      }),
      catchError((error) => {
        this.error.set(error.message);
        this.isLoading.set(false);
        this.notificationService.error('Failed to update survey');
        return EMPTY;
      })
    )
  );

  readonly deleteSurvey = this.effect<string>((surveyId$) =>
    surveyId$.pipe(
      tap(() => {
        this.isLoading.set(true);
        this.error.set(null);
      }),
      switchMap(id => this.surveyService.deleteSurvey(id)),
      tap(() => {
        this.surveys.update(surveys => surveys.filter(s => s.id !== this.currentSurvey()?.id));
        this.setCurrentSurvey(null);
        this.isLoading.set(false);
        this.notificationService.success('Survey deleted successfully');
      }),
      catchError((error) => {
        this.error.set(error.message);
        this.isLoading.set(false);
        this.notificationService.error('Failed to delete survey');
        return EMPTY;
      })
    )
  );

  readonly publishSurvey = this.effect<string>((surveyId$) =>
    surveyId$.pipe(
      tap(() => {
        this.isLoading.set(true);
        this.error.set(null);
      }),
      switchMap(id => this.surveyService.publishSurvey(id)),
      tap((publishedSurvey) => {
        this.surveys.update(surveys => 
          surveys.map(s => s.id === publishedSurvey.id ? publishedSurvey : s)
        );
        this.setCurrentSurvey(publishedSurvey);
        this.isLoading.set(false);
        this.notificationService.success('Survey published successfully');
      }),
      catchError((error) => {
        this.error.set(error.message);
        this.isLoading.set(false);
        this.notificationService.error('Failed to publish survey');
        return EMPTY;
      })
    )
  );

  readonly duplicateSurvey = this.effect<string>((surveyId$) =>
    surveyId$.pipe(
      tap(() => {
        this.isLoading.set(true);
        this.error.set(null);
      }),
      switchMap(id => this.surveyService.duplicateSurvey(id)),
      tap((duplicatedSurvey) => {
        this.surveys.update(surveys => [...surveys, duplicatedSurvey]);
        this.setCurrentSurvey(duplicatedSurvey);
        this.setSelectedTab(0); // Switch to editor tab
        this.isLoading.set(false);
        this.notificationService.success('Survey duplicated successfully');
      }),
      catchError((error) => {
        this.error.set(error.message);
        this.isLoading.set(false);
        this.notificationService.error('Failed to duplicate survey');
        return EMPTY;
      })
    )
  );

  // Auto-save functionality
  readonly autoSave = this.effect<Partial<Survey>>((surveyUpdates$) =>
    surveyUpdates$.pipe(
      switchMap(updates => {
        const currentSurvey = this.currentSurvey();
        if (!currentSurvey || !this.autoSaveEnabled()) {
          return EMPTY;
        }
        return this.surveyService.updateSurvey(currentSurvey.id, updates);
      }),
      tap((updatedSurvey) => {
        this.surveys.update(surveys => 
          surveys.map(s => s.id === updatedSurvey.id ? updatedSurvey : s)
        );
        this.setCurrentSurvey(updatedSurvey);
        this.setDirty(false);
      }),
      catchError((error) => {
        this.notificationService.error('Auto-save failed');
        return EMPTY;
      })
    )
  );

  // Helper methods
  selectSurvey(survey: Survey): void {
    this.setCurrentSurvey(survey);
    this.setSelectedTab(0);
  }

  markAsDirty(): void {
    this.setDirty(true);
  }

  clearError(): void {
    this.error.set(null);
  }

  // Template management
  readonly createFromTemplate = this.effect<{ template: SurveyTemplate; customizations?: Partial<Survey> }>((template$) =>
    template$.pipe(
      tap(() => {
        this.isLoading.set(true);
        this.error.set(null);
      }),
      switchMap(({ template, customizations }) => 
        this.surveyService.createFromTemplate(template.id, customizations)
      ),
      tap((newSurvey) => {
        this.surveys.update(surveys => [...surveys, newSurvey]);
        this.setCurrentSurvey(newSurvey);
        this.setSelectedTab(0);
        this.isLoading.set(false);
        this.notificationService.success('Survey created from template');
      }),
      catchError((error) => {
        this.error.set(error.message);
        this.isLoading.set(false);
        this.notificationService.error('Failed to create from template');
        return EMPTY;
      })
    )
  );
} 