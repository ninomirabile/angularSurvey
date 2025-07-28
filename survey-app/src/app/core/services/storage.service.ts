import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface StorageItem<T = any> {
  key: string;
  value: T;
  timestamp: number;
  expiresAt?: number;
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly STORAGE_PREFIX = 'survey_app_';
  private db: IDBDatabase | null = null;
  private readonly DB_NAME = 'SurveyAppDB';
  private readonly DB_VERSION = 1;

  constructor() {
    this.initIndexedDB();
  }

  // LocalStorage methods
  setItem<T>(key: string, value: T, expiresIn?: number): void {
    const item: StorageItem<T> = {
      key: this.getFullKey(key),
      value,
      timestamp: Date.now(),
      expiresAt: expiresIn ? Date.now() + expiresIn : undefined
    };
    
    try {
      localStorage.setItem(item.key, JSON.stringify(item));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  getItem<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(this.getFullKey(key));
      if (!item) return null;

      const storageItem: StorageItem<T> = JSON.parse(item);
      
      // Check if item has expired
      if (storageItem.expiresAt && Date.now() > storageItem.expiresAt) {
        this.removeItem(key);
        return null;
      }

      return storageItem.value;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  }

  removeItem(key: string): void {
    try {
      localStorage.removeItem(this.getFullKey(key));
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }

  clear(): void {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.STORAGE_PREFIX)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }

  // IndexedDB methods
  private initIndexedDB(): void {
    if (!window.indexedDB) {
      console.warn('IndexedDB not supported, falling back to localStorage');
      return;
    }

    const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);

    request.onerror = (event) => {
      console.error('Error opening IndexedDB:', event);
      this.db = null;
    };

    request.onsuccess = (event) => {
      this.db = (event.target as IDBOpenDBRequest).result;
      console.log('IndexedDB initialized successfully');
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      // Create object stores
      if (!db.objectStoreNames.contains('surveys')) {
        const surveyStore = db.createObjectStore('surveys', { keyPath: 'id' });
        surveyStore.createIndex('title', 'title', { unique: false });
        surveyStore.createIndex('authorId', 'authorId', { unique: false });
        surveyStore.createIndex('isPublished', 'isPublished', { unique: false });
      }

      if (!db.objectStoreNames.contains('responses')) {
        const responseStore = db.createObjectStore('responses', { keyPath: 'id' });
        responseStore.createIndex('surveyId', 'surveyId', { unique: false });
        responseStore.createIndex('respondentId', 'respondentId', { unique: false });
      }

      if (!db.objectStoreNames.contains('templates')) {
        const templateStore = db.createObjectStore('templates', { keyPath: 'id' });
        templateStore.createIndex('category', 'category', { unique: false });
        templateStore.createIndex('isPublic', 'isPublic', { unique: false });
      }
    };
  }

  // Survey storage methods
  saveSurvey(survey: any): Observable<void> {
    if (this.db) {
      return from(this.saveToIndexedDB('surveys', survey)).pipe(
        catchError(error => {
          console.warn('IndexedDB failed, falling back to localStorage:', error);
          this.setItem(`survey_${survey.id}`, survey);
          return of(void 0);
        })
      );
    } else {
      // Fallback to localStorage
      this.setItem(`survey_${survey.id}`, survey);
      return of(void 0);
    }
  }

  getSurvey(id: string): Observable<any> {
    if (this.db) {
      return from(this.getFromIndexedDB('surveys', id)).pipe(
        catchError(error => {
          console.warn('IndexedDB failed, falling back to localStorage:', error);
          return of(this.getItem(`survey_${id}`));
        })
      );
    } else {
      // Fallback to localStorage
      return of(this.getItem(`survey_${id}`));
    }
  }

  getAllSurveys(): Observable<any[]> {
    if (this.db) {
      return from(this.getAllFromIndexedDB('surveys')).pipe(
        catchError(error => {
          console.warn('IndexedDB failed, falling back to localStorage:', error);
          return this.getAllFromLocalStorage();
        })
      );
    } else {
      // Fallback to localStorage
      return this.getAllFromLocalStorage();
    }
  }

  private getAllFromLocalStorage(): Observable<any[]> {
    const surveys: any[] = [];
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.STORAGE_PREFIX + 'survey_')) {
          const surveyKey = key.replace(this.STORAGE_PREFIX, '');
          const survey = this.getItem(surveyKey);
          if (survey) {
            surveys.push(survey);
          }
        }
      });
    } catch (error) {
      console.error('Error reading from localStorage:', error);
    }
    return of(surveys);
  }

  deleteSurvey(id: string): Observable<void> {
    if (this.db) {
      return from(this.deleteFromIndexedDB('surveys', id)).pipe(
        catchError(error => {
          console.warn('IndexedDB failed, falling back to localStorage:', error);
          this.removeItem(`survey_${id}`);
          return of(void 0);
        })
      );
    } else {
      // Fallback to localStorage
      this.removeItem(`survey_${id}`);
      return of(void 0);
    }
  }

  // Response storage methods
  saveResponse(response: any): Observable<void> {
    if (this.db) {
      return from(this.saveToIndexedDB('responses', response)).pipe(
        catchError(error => {
          console.warn('IndexedDB failed for responses, using localStorage:', error);
          this.setItem(`response_${response.id}`, response);
          return of(void 0);
        })
      );
    } else {
      this.setItem(`response_${response.id}`, response);
      return of(void 0);
    }
  }

  getResponsesBySurveyId(surveyId: string): Observable<any[]> {
    if (this.db) {
      return from(this.getByIndex('responses', 'surveyId', surveyId)).pipe(
        catchError(error => {
          console.warn('IndexedDB failed for responses, using localStorage:', error);
          return this.getResponsesFromLocalStorage(surveyId);
        })
      );
    } else {
      return this.getResponsesFromLocalStorage(surveyId);
    }
  }

  private getResponsesFromLocalStorage(surveyId: string): Observable<any[]> {
    const responses: any[] = [];
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.STORAGE_PREFIX + 'response_')) {
          const responseKey = key.replace(this.STORAGE_PREFIX, '');
          const response = this.getItem(responseKey);
          if (response && typeof response === 'object' && 'surveyId' in response && response.surveyId === surveyId) {
            responses.push(response);
          }
        }
      });
    } catch (error) {
      console.error('Error reading responses from localStorage:', error);
    }
    return of(responses);
  }

  // Template storage methods
  saveTemplate(template: any): Observable<void> {
    if (this.db) {
      return from(this.saveToIndexedDB('templates', template)).pipe(
        catchError(error => {
          console.warn('IndexedDB failed for templates, using localStorage:', error);
          this.setItem(`template_${template.id}`, template);
          return of(void 0);
        })
      );
    } else {
      this.setItem(`template_${template.id}`, template);
      return of(void 0);
    }
  }

  getAllTemplates(): Observable<any[]> {
    if (this.db) {
      return from(this.getAllFromIndexedDB('templates')).pipe(
        catchError(error => {
          console.warn('IndexedDB failed for templates, using localStorage:', error);
          return this.getAllTemplatesFromLocalStorage();
        })
      );
    } else {
      return this.getAllTemplatesFromLocalStorage();
    }
  }

  private getAllTemplatesFromLocalStorage(): Observable<any[]> {
    const templates: any[] = [];
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.STORAGE_PREFIX + 'template_')) {
          const templateKey = key.replace(this.STORAGE_PREFIX, '');
          const template = this.getItem(templateKey);
          if (template) {
            templates.push(template);
          }
        }
      });
    } catch (error) {
      console.error('Error reading templates from localStorage:', error);
    }
    return of(templates);
  }

  // Private IndexedDB helper methods
  private async saveToIndexedDB(storeName: string, data: any): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('IndexedDB not initialized'));
        return;
      }

      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put(data);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  private async getFromIndexedDB(storeName: string, key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('IndexedDB not initialized'));
        return;
      }

      const transaction = this.db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(key);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  private async getAllFromIndexedDB(storeName: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('IndexedDB not initialized'));
        return;
      }

      const transaction = this.db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  private async deleteFromIndexedDB(storeName: string, key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('IndexedDB not initialized'));
        return;
      }

      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(key);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  private async getByIndex(storeName: string, indexName: string, value: any): Promise<any[]> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('IndexedDB not initialized'));
        return;
      }

      const transaction = this.db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const index = store.index(indexName);
      const request = index.getAll(value);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  private getFullKey(key: string): string {
    return `${this.STORAGE_PREFIX}${key}`;
  }

  // Utility methods
  getStorageSize(): Observable<{ localStorage: number; indexedDB: number }> {
    return new Observable(observer => {
      let localStorageSize = 0;
      try {
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
          if (key.startsWith(this.STORAGE_PREFIX)) {
            localStorageSize += localStorage[key].length;
          }
        });
      } catch (error) {
        console.error('Error calculating localStorage size:', error);
      }

      // For IndexedDB, we'll return 0 as it's harder to calculate
      observer.next({ localStorage: localStorageSize, indexedDB: 0 });
      observer.complete();
    });
  }

  clearAll(): Observable<void> {
    return new Observable(observer => {
      this.clear(); // Clear localStorage
      
      // Clear IndexedDB
      if (this.db) {
        const transaction = this.db.transaction(['surveys', 'responses', 'templates'], 'readwrite');
        transaction.oncomplete = () => {
          observer.next();
          observer.complete();
        };
        transaction.onerror = () => {
          observer.error(transaction.error);
        };
      } else {
        observer.next();
        observer.complete();
      }
    });
  }

  // Reset data and create sample surveys
  resetToSampleData(): Observable<void> {
    return new Observable(observer => {
      this.clear(); // Clear all data first
      
      // Create sample surveys
      const sampleSurveys = [
        {
          id: '1',
          title: 'Customer Feedback Survey',
          description: 'Help us improve our services by providing your valuable feedback',
          isPublic: true,
          isPublished: true,
          createdAt: new Date('2024-01-15'),
          updatedAt: new Date('2024-01-20'),
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
            }
          },
          questions: [
            {
              id: 'q1',
              type: 'text',
              title: 'What is your name?',
              description: 'Please enter your full name',
              required: true,
              order: 0
            },
            {
              id: 'q2',
              type: 'rating',
              title: 'How satisfied are you with our service?',
              description: 'Rate your satisfaction from 1 to 5',
              required: true,
              order: 1
            },
            {
              id: 'q3',
              type: 'textarea',
              title: 'Additional comments',
              description: 'Please share any additional feedback',
              required: false,
              order: 2
            }
          ],
          version: 1,
          authorId: 'admin',
          tags: ['customer', 'feedback', 'service']
        },
        {
          id: '2',
          title: 'Employee Satisfaction Survey',
          description: 'Annual employee satisfaction and engagement survey',
          isPublic: false,
          isPublished: false,
          createdAt: new Date('2024-01-10'),
          updatedAt: new Date('2024-01-12'),
          settings: {
            allowAnonymous: false,
            requireEmail: true,
            allowMultipleResponses: false,
            showProgressBar: true,
            showQuestionNumbers: true,
            enableBackButton: true,
            autoSave: true,
            theme: {
              primaryColor: '#4caf50',
              secondaryColor: '#ff9800',
              backgroundColor: '#ffffff',
              textColor: '#000000',
              borderRadius: 8,
              fontFamily: 'Roboto, sans-serif'
            }
          },
          questions: [
            {
              id: 'q1',
              type: 'radio',
              title: 'How would you rate your work-life balance?',
              description: 'Select the option that best describes your situation',
              required: true,
              order: 0,
              options: [
                { id: 'opt1', label: 'Excellent', value: 'excellent', order: 0 },
                { id: 'opt2', label: 'Good', value: 'good', order: 1 },
                { id: 'opt3', label: 'Fair', value: 'fair', order: 2 },
                { id: 'opt4', label: 'Poor', value: 'poor', order: 3 }
              ]
            }
          ],
          version: 1,
          authorId: 'admin',
          tags: ['employee', 'satisfaction', 'hr']
        }
      ];

      // Save sample surveys
      sampleSurveys.forEach(survey => {
        this.setItem(`survey_${survey.id}`, survey);
      });

      observer.next();
      observer.complete();
    });
  }

  // Check if storage is working
  isStorageAvailable(): Observable<{ indexedDB: boolean; localStorage: boolean }> {
    return new Observable(observer => {
      const result = {
        indexedDB: !!this.db,
        localStorage: false
      };

      try {
        const testKey = '__storage_test__';
        localStorage.setItem(testKey, 'test');
        localStorage.removeItem(testKey);
        result.localStorage = true;
      } catch (error) {
        console.warn('localStorage not available:', error);
      }

      observer.next(result);
      observer.complete();
    });
  }
} 