import { Injectable, inject } from '@angular/core';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { map, catchError, tap, switchMap } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { NotificationService } from './notification.service';
import { Survey, SurveyResponse, SurveyTemplate } from '../models/survey.model';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private readonly storage = inject(StorageService);
  private readonly notificationService = inject(NotificationService);

  // BehaviorSubject for real-time updates
  private readonly surveysSubject = new BehaviorSubject<Survey[]>([]);
  private readonly currentSurveySubject = new BehaviorSubject<Survey | null>(null);

  // Public observables
  readonly surveys$ = this.surveysSubject.asObservable();
  readonly currentSurvey$ = this.currentSurveySubject.asObservable();

  constructor() {
    this.loadSurveys();
  }

  // CRUD Operations
  createSurvey(surveyData: Partial<Survey>): Observable<Survey> {
    const survey: Survey = {
      id: this.generateId(),
      title: surveyData.title || 'Untitled Survey',
      description: surveyData.description || '',
      isPublic: surveyData.isPublic || false,
      isPublished: surveyData.isPublished || false,
      createdAt: new Date(),
      updatedAt: new Date(),
      settings: {
        allowAnonymous: true,
        requireEmail: false,
        allowMultipleResponses: false,
        showProgressBar: true,
        showQuestionNumbers: true,
        enableBackButton: true,
        autoSave: true,
        theme: {
          primaryColor: '#1976d2',
          secondaryColor: '#dc004e',
          backgroundColor: '#ffffff',
          textColor: '#000000',
          borderRadius: 8,
          fontFamily: 'Roboto, sans-serif'
        },
        ...surveyData.settings
      },
      questions: surveyData.questions || [],
      version: 1,
      authorId: surveyData.authorId,
      tags: surveyData.tags || []
    };

    return this.storage.saveSurvey(survey).pipe(
      tap(() => {
        this.addSurveyToCache(survey);
        this.notificationService.showSaveSuccess('Survey');
      }),
      map(() => survey),
      catchError(error => {
        this.notificationService.showNetworkError();
        return throwError(() => error);
      })
    );
  }

  updateSurvey(id: string, updates: Partial<Survey>): Observable<Survey> {
    return this.getSurvey(id).pipe(
      switchMap(survey => {
        if (!survey) {
          return throwError(() => new Error('Survey not found'));
        }

        const updatedSurvey: Survey = {
          ...survey,
          ...updates,
          updatedAt: new Date(),
          version: survey.version + 1
        };

        return this.storage.saveSurvey(updatedSurvey).pipe(
          tap(() => {
            this.updateSurveyInCache(updatedSurvey);
            this.notificationService.showUpdateSuccess('Survey');
          }),
          map(() => updatedSurvey),
          catchError(error => {
            this.notificationService.showNetworkError();
            return throwError(() => error);
          })
        );
      })
    );
  }

  getSurvey(id: string): Observable<Survey | null> {
    return this.storage.getSurvey(id).pipe(
      catchError(error => {
        console.error('Error fetching survey:', error);
        return of(null);
      })
    );
  }

  getAllSurveys(): Observable<Survey[]> {
    return this.storage.getAllSurveys().pipe(
      tap(surveys => {
        this.surveysSubject.next(surveys);
      }),
      catchError(error => {
        console.error('Error fetching surveys:', error);
        return of([]);
      })
    );
  }

  deleteSurvey(id: string): Observable<void> {
    return this.storage.deleteSurvey(id).pipe(
      tap(() => {
        this.removeSurveyFromCache(id);
        this.notificationService.showDeleteSuccess('Survey');
      }),
      catchError(error => {
        this.notificationService.showNetworkError();
        return throwError(() => error);
      })
    );
  }

  // Survey publishing
  publishSurvey(id: string): Observable<Survey> {
    return this.updateSurvey(id, { isPublished: true });
  }

  unpublishSurvey(id: string): Observable<Survey> {
    return this.updateSurvey(id, { isPublished: false });
  }

  // Survey responses
  saveResponse(response: SurveyResponse): Observable<void> {
    return this.storage.saveResponse(response).pipe(
      tap(() => {
        this.notificationService.success('Response saved successfully!');
      }),
      catchError(error => {
        this.notificationService.showNetworkError();
        return throwError(() => error);
      })
    );
  }

  getResponsesBySurveyId(surveyId: string): Observable<SurveyResponse[]> {
    return this.storage.getResponsesBySurveyId(surveyId);
  }

  // Survey templates
  saveTemplate(template: SurveyTemplate): Observable<void> {
    return this.storage.saveTemplate(template).pipe(
      tap(() => {
        this.notificationService.showSaveSuccess('Template');
      }),
      catchError(error => {
        this.notificationService.showNetworkError();
        return throwError(() => error);
      })
    );
  }

  getAllTemplates(): Observable<SurveyTemplate[]> {
    return this.storage.getAllTemplates();
  }

  createFromTemplate(templateId: string, customizations?: Partial<Survey>): Observable<Survey> {
    return this.storage.getAllTemplates().pipe(
      switchMap(templates => {
        const template = templates.find(t => t.id === templateId);
        if (!template) {
          return throwError(() => new Error('Template not found'));
        }

        const surveyData: Partial<Survey> = {
          ...template.survey,
          ...customizations,
          id: undefined, // Will be generated
          createdAt: new Date(),
          updatedAt: new Date(),
          isPublished: false
        };

        return this.createSurvey(surveyData);
      })
    );
  }

  // Search and filtering
  searchSurveys(query: string): Observable<Survey[]> {
    return this.getAllSurveys().pipe(
      map(surveys => 
        surveys.filter(survey => 
          survey.title.toLowerCase().includes(query.toLowerCase()) ||
          survey.description.toLowerCase().includes(query.toLowerCase()) ||
          survey.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        )
      )
    );
  }

  getSurveysByAuthor(authorId: string): Observable<Survey[]> {
    return this.getAllSurveys().pipe(
      map(surveys => surveys.filter(survey => survey.authorId === authorId))
    );
  }

  getPublishedSurveys(): Observable<Survey[]> {
    return this.getAllSurveys().pipe(
      map(surveys => surveys.filter(survey => survey.isPublished))
    );
  }

  // Export/Import
  exportSurvey(id: string): Observable<string> {
    return this.getSurvey(id).pipe(
      map(survey => {
        if (!survey) {
          throw new Error('Survey not found');
        }
        return JSON.stringify(survey, null, 2);
      })
    );
  }

  importSurvey(jsonData: string): Observable<Survey> {
    try {
      const surveyData = JSON.parse(jsonData);
      return this.createSurvey(surveyData);
    } catch (error) {
      return throwError(() => new Error('Invalid JSON format'));
    }
  }

  // Duplicate survey
  duplicateSurvey(id: string): Observable<Survey> {
    return this.getSurvey(id).pipe(
      switchMap(survey => {
        if (!survey) {
          return throwError(() => new Error('Survey not found'));
        }

        const duplicatedSurvey: Partial<Survey> = {
          ...survey,
          id: undefined, // Will be generated
          title: `${survey.title} (Copy)`,
          isPublished: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          version: 1
        };

        return this.createSurvey(duplicatedSurvey);
      })
    );
  }

  // Analytics
  getSurveyAnalytics(surveyId: string): Observable<any> {
    return this.getResponsesBySurveyId(surveyId).pipe(
      map(responses => {
        const totalResponses = responses.length;
        const completedResponses = responses.filter(r => r.isComplete).length;
        const completionRate = totalResponses > 0 ? (completedResponses / totalResponses) * 100 : 0;

        // Calculate average time to complete
        const completedResponsesWithTime = responses.filter(r => r.isComplete && r.completedAt);
        const avgTimeToComplete = completedResponsesWithTime.length > 0
          ? completedResponsesWithTime.reduce((acc, r) => {
              const timeSpent = r.completedAt!.getTime() - r.startedAt.getTime();
              return acc + timeSpent;
            }, 0) / completedResponsesWithTime.length
          : 0;

        return {
          totalResponses,
          completedResponses,
          completionRate,
          avgTimeToComplete,
          responsesByDate: this.groupResponsesByDate(responses)
        };
      })
    );
  }

  // Private methods
  private loadSurveys(): void {
    // Load from storage first
    this.storage.getAllSurveys().subscribe(surveys => {
      if (surveys.length === 0) {
        // Create sample surveys if none exist
        this.createSampleSurveys();
      } else {
        this.surveysSubject.next(surveys);
      }
    });
  }

  private createSampleSurveys(): void {
    // Use the storage service to create sample surveys
    this.storage.resetToSampleData().subscribe(() => {
      // After creating sample surveys, load them
      this.storage.getAllSurveys().subscribe(surveys => {
        this.surveysSubject.next(surveys);
      });
    });
  }

  private addSurveyToCache(survey: Survey): void {
    const currentSurveys = this.surveysSubject.value;
    this.surveysSubject.next([...currentSurveys, survey]);
  }

  private updateSurveyInCache(updatedSurvey: Survey): void {
    const currentSurveys = this.surveysSubject.value;
    const updatedSurveys = currentSurveys.map(survey => 
      survey.id === updatedSurvey.id ? updatedSurvey : survey
    );
    this.surveysSubject.next(updatedSurveys);
  }

  private removeSurveyFromCache(id: string): void {
    const currentSurveys = this.surveysSubject.value;
    const filteredSurveys = currentSurveys.filter(survey => survey.id !== id);
    this.surveysSubject.next(filteredSurveys);
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private groupResponsesByDate(responses: SurveyResponse[]): Record<string, number> {
    return responses.reduce((acc, response) => {
      const date = response.startedAt.toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  // Utility methods
  setCurrentSurvey(survey: Survey | null): void {
    this.currentSurveySubject.next(survey);
  }

  getCurrentSurvey(): Survey | null {
    return this.currentSurveySubject.value;
  }

  clearCurrentSurvey(): void {
    this.currentSurveySubject.next(null);
  }

  // Reset data and recreate sample surveys
  resetToSampleData(): Observable<void> {
    return this.storage.resetToSampleData().pipe(
      tap(() => {
        // Reload surveys after reset
        this.loadSurveys();
        this.notificationService.success('Data reset successfully!');
      }),
      catchError(error => {
        this.notificationService.error('Failed to reset data');
        return throwError(() => error);
      })
    );
  }

  // Check storage availability
  checkStorageAvailability(): Observable<{ indexedDB: boolean; localStorage: boolean }> {
    return this.storage.isStorageAvailable();
  }
} 