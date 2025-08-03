import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-educational-nav',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule
  ],
  template: `
    <div class="educational-nav-container">
      <mat-card class="nav-card">
        <mat-card-header>
          <mat-card-title class="text-2xl font-bold text-blue-600">
            🎓 Learning Center - Angular 20 Features
          </mat-card-title>
          <mat-card-subtitle class="text-gray-600">
            Esplora le funzionalità moderne di Angular 20 attraverso demo interattivi
          </mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="nav-grid">
            <mat-card class="feature-card" routerLink="/learn/signals" routerLinkActive="active">
              <mat-card-header>
                <mat-icon class="feature-icon">memory</mat-icon>
                <mat-card-title>Signals</mat-card-title>
                <mat-card-subtitle>State Management Moderno</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <p>Gestione dello stato reattiva con Signals, computed values e effects.</p>
              </mat-card-content>
            </mat-card>

            <mat-card class="feature-card" routerLink="/learn/control-flow" routerLinkActive="active">
              <mat-card-header>
                <mat-icon class="feature-icon">code</mat-icon>
                <mat-card-title>Control Flow</mat-card-title>
                <mat-card-subtitle>Nuova Sintassi</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <p>if, for, switch per rendering condizionale e liste più performanti.</p>
              </mat-card-content>
            </mat-card>

            <mat-card class="feature-card" routerLink="/learn/standalone" routerLinkActive="active">
              <mat-card-header>
                <mat-icon class="feature-icon">extension</mat-icon>
                <mat-card-title>Standalone Components</mat-card-title>
                <mat-card-subtitle>Architettura Moderna</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <p>Componenti auto-contenuti senza NgModule, con dependency injection moderna.</p>
              </mat-card-content>
            </mat-card>

            <mat-card class="feature-card" routerLink="/learn/lazy-loading" routerLinkActive="active">
              <mat-card-header>
                <mat-icon class="feature-icon">download</mat-icon>
                <mat-card-title>Lazy Loading</mat-card-title>
                <mat-card-subtitle>Code Splitting</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <p>Caricamento on-demand dei moduli per performance ottimali.</p>
              </mat-card-content>
            </mat-card>

            <mat-card class="feature-card" routerLink="/learn/reactive-forms" routerLinkActive="active">
              <mat-card-header>
                <mat-icon class="feature-icon">description</mat-icon>
                <mat-card-title>Reactive Forms</mat-card-title>
                <mat-card-subtitle>Form Handling Moderno</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <p>Gestione avanzata dei form con validazione reattiva e controllo completo.</p>
              </mat-card-content>
            </mat-card>

            <mat-card class="feature-card" routerLink="/learn/subjects" routerLinkActive="active">
              <mat-card-header>
                <mat-icon class="feature-icon">swap_horiz</mat-icon>
                <mat-card-title>Subjects vs Signals</mat-card-title>
                <mat-card-subtitle>State Management</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <p>Confronta diversi approcci alla gestione dello stato reattivo.</p>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-card-content>
      </mat-card>

      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .educational-nav-container {
      @apply p-6 max-w-7xl mx-auto;
    }

    .nav-card {
      @apply mb-6;
      background-color: var(--card-background);
      border: 1px solid var(--border-color);
    }

    .nav-grid {
      @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6;
    }

    .feature-card {
      @apply cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105;
      background-color: var(--card-background);
      border: 1px solid var(--border-color);
    }

    .feature-card:hover {
      @apply ring-2 ring-blue-500;
    }

    .feature-card.active {
      @apply ring-2 ring-blue-500 shadow-lg;
    }

    .feature-card mat-card-header {
      @apply flex flex-col items-center text-center;
    }

    .feature-icon {
      @apply text-3xl mb-2;
      color: var(--primary-color);
    }

    .feature-card p {
      color: var(--text-secondary);
    }

    /* Responsive */
    @media (max-width: 768px) {
      .nav-grid {
        @apply grid-cols-1;
      }
    }
  `]
})
export class EducationalNavComponent {}