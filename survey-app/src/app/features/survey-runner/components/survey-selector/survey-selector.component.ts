import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

import { Survey } from '../../../../core/models/survey.model';
import { SurveyService } from '../../../../core/services/survey.service';

@Component({
  selector: 'app-survey-selector',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule
  ],
  template: `
    <div class="survey-selector-container">
      <mat-card class="selector-card">
        <mat-card-header>
          <mat-card-title class="text-2xl font-bold text-blue-600">
            <mat-icon class="mr-2">play_arrow</mat-icon>
            Survey Runner
          </mat-card-title>
          <mat-card-subtitle class="text-gray-600">
            Seleziona un sondaggio da compilare
          </mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <!-- Search Bar -->
          <div class="search-section mb-6">
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Cerca sondaggi</mat-label>
              <input 
                matInput 
                [(ngModel)]="searchTerm"
                placeholder="Digita per cercare..."
                (input)="onSearchChange()"
              >
              <mat-icon matSuffix>search</mat-icon>
            </mat-form-field>
          </div>

          <!-- Loading State -->
          @if (isLoading()) {
            <div class="loading-state">
              <mat-spinner diameter="40"></mat-spinner>
              <p class="mt-4 text-gray-600">Caricamento sondaggi...</p>
            </div>
          }

          <!-- No Surveys State -->
          @else if (publishedSurveys().length === 0) {
            <div class="empty-state">
              <mat-icon class="empty-icon">quiz</mat-icon>
              <h3>Nessun sondaggio disponibile</h3>
              <p>Non ci sono sondaggi pubblicati da compilare.</p>
              <button mat-raised-button color="primary" routerLink="/survey-builder" class="mt-4">
                <mat-icon>add</mat-icon>
                Crea un Sondaggio
              </button>
            </div>
          }

          <!-- Surveys List -->
          @else {
            <div class="surveys-grid">
              @for (survey of filteredSurveys(); track survey.id) {
                <mat-card class="survey-card" (click)="selectSurvey(survey)">
                  <mat-card-header>
                    <mat-card-title>{{ survey.title }}</mat-card-title>
                    <mat-card-subtitle>
                      Creato il {{ survey.createdAt | date:'shortDate' }}
                    </mat-card-subtitle>
                  </mat-card-header>
                  
                  <mat-card-content>
                    <p class="survey-description">
                      {{ survey.description || 'Nessuna descrizione' }}
                    </p>
                    
                    <div class="survey-meta">
                      <div class="survey-tags">
                        @for (tag of survey.tags; track tag) {
                          <mat-chip size="small">{{ tag }}</mat-chip>
                        }
                      </div>
                      
                      <mat-chip color="primary" size="small">
                        <mat-icon>published_with_changes</mat-icon>
                        Pubblicato
                      </mat-chip>
                    </div>
                    
                    <div class="survey-stats">
                      <span class="stat">
                        <mat-icon>question_answer</mat-icon>
                        <span>{{ survey.questions.length || 0 }} domande</span>
                      </span>
                      @if (survey.responses) {
                        <span class="stat">
                          <mat-icon>people</mat-icon>
                          {{ survey.responses.length }} risposte
                        </span>
                      }
                    </div>
                  </mat-card-content>

                  <mat-card-actions>
                    <button 
                      mat-raised-button 
                      color="primary" 
                      class="w-full"
                      (click)="selectSurvey(survey)"
                    >
                      <mat-icon>play_arrow</mat-icon>
                      Inizia Sondaggio
                    </button>
                  </mat-card-actions>
                </mat-card>
              }
            </div>

            <!-- No Results -->
            @if (filteredSurveys().length === 0 && searchTerm()) {
              <div class="no-results">
                <mat-icon class="no-results-icon">search_off</mat-icon>
                <h3>Nessun risultato trovato</h3>
                <p>Prova con termini di ricerca diversi.</p>
              </div>
            }
          }
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .survey-selector-container {
      @apply p-6 max-w-7xl mx-auto;
    }

    .selector-card {
      @apply bg-white shadow-lg;
    }

    .search-section {
      @apply border-b border-gray-200 pb-4;
    }

    .loading-state {
      @apply flex flex-col items-center justify-center py-12;
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

    .surveys-grid {
      @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6;
    }

    .survey-card {
      @apply cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02];
    }

    .survey-card:hover {
      @apply border-blue-200;
    }

    .survey-description {
      @apply text-gray-600 text-sm mb-4 line-clamp-2;
    }

    .survey-meta {
      @apply flex justify-between items-start mb-4;
    }

    .survey-tags {
      @apply flex flex-wrap gap-1;
    }

    .survey-stats {
      @apply flex gap-4 text-sm text-gray-500 mb-4;
    }

    .stat {
      @apply flex items-center gap-1;
    }

    .stat mat-icon {
      @apply text-base;
    }

    .no-results {
      @apply text-center py-12;
    }

    .no-results-icon {
      @apply text-6xl text-gray-400 mb-4;
    }

    .no-results h3 {
      @apply text-xl font-semibold text-gray-700 mb-2;
    }

    .no-results p {
      @apply text-gray-500;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .surveys-grid {
        @apply grid-cols-1;
      }
    }
  `]
})
export class SurveySelectorComponent implements OnInit {
  private readonly surveyService = inject(SurveyService);
  private readonly router = inject(Router);

  // Signals
  readonly surveys = signal<Survey[]>([]);
  readonly isLoading = signal(false);
  readonly searchTerm = signal('');

  // Computed values
  readonly publishedSurveys = computed(() => 
    this.surveys().filter(survey => survey.isPublished)
  );

  readonly filteredSurveys = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) return this.publishedSurveys();
    
    return this.publishedSurveys().filter(survey => 
      survey.title.toLowerCase().includes(term) ||
      survey.description.toLowerCase().includes(term) ||
      (survey.tags && survey.tags.some(tag => tag.toLowerCase().includes(term)))
    );
  });

  ngOnInit(): void {
    this.loadSurveys();
  }

  loadSurveys(): void {
    this.isLoading.set(true);
    this.surveyService.getAllSurveys().subscribe({
      next: (surveys) => {
        this.surveys.set(surveys);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading surveys:', error);
        this.isLoading.set(false);
      }
    });
  }

  onSearchChange(): void {
    // Search is handled by computed signal
  }

  selectSurvey(survey: Survey): void {
    // Navigate to survey runner with survey ID
    this.router.navigate(['/survey-runner', survey.id]);
  }
} 