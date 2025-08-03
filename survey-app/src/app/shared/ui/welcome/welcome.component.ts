import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressBarModule
  ],
  template: `
    <div class="welcome-container">
      <!-- Hero Section -->
      <div class="hero-section">
        <div class="hero-content">
          <h1 class="hero-title">
            🎓 Angular 20 Survey Builder
            <span class="hero-subtitle">Educational Project</span>
          </h1>
          <p class="hero-description">
            Un progetto educativo completo che dimostra le funzionalità moderne di Angular 20, 
            inclusi Signals, Control Flow, Standalone Components e molto altro.
          </p>
          <div class="hero-actions">
            <button mat-raised-button color="primary" routerLink="/survey-builder">
              <mat-icon>play_arrow</mat-icon>
              Inizia a Esplorare
            </button>
            <button mat-outlined-button routerLink="/learn">
              <mat-icon>school</mat-icon>
              Impara Angular 20
            </button>
          </div>
        </div>
      </div>

      <!-- Features Grid -->
      <div class="features-section">
        <h2 class="section-title">🚀 Funzionalità Angular 20</h2>
        <div class="features-grid">
          <!-- Signals -->
          <mat-card class="feature-card" [class.active]="activeFeature() === 'signals'">
            <mat-card-header>
              <mat-icon class="feature-icon">memory</mat-icon>
              <mat-card-title>Signals</mat-card-title>
              <mat-card-subtitle>State Management Moderno</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <p>Gestione dello stato reattiva con Signals, computed values e effects.</p>
              <div class="feature-demo">
                <div class="demo-counter">
                  <span>Contatore: {{ counter() }}</span>
                  <button mat-mini-fab color="primary" (click)="incrementCounter()">
                    <mat-icon>add</mat-icon>
                  </button>
                </div>
                <div class="demo-computed">
                  <span>Pari: {{ isEven() ? 'Sì' : 'No' }}</span>
                  <span>Quadrato: {{ squared() }}</span>
                </div>
                <div class="mt-3">
                  <button mat-stroked-button routerLink="/learn/signals" class="w-full">
                    <mat-icon>school</mat-icon>
                    Approfondisci Signals
                  </button>
                </div>
              </div>
            </mat-card-content>
          </mat-card>

          <!-- Control Flow -->
          <mat-card class="feature-card" [class.active]="activeFeature() === 'control-flow'">
            <mat-card-header>
              <mat-icon class="feature-icon">code</mat-icon>
              <mat-card-title>Control Flow</mat-card-title>
              <mat-card-subtitle>Nuova Sintassi</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <p>&#64;if, &#64;for, &#64;switch per rendering condizionale e liste.</p>
              <div class="feature-demo">
                <div class="demo-control-flow">
                  @if (showMessage()) {
                    <div class="message success">Messaggio visibile!</div>
                  } @else {
                    <div class="message hidden">Messaggio nascosto</div>
                  }
                  <button mat-button (click)="toggleMessage()">
                    {{ showMessage() ? 'Nascondi' : 'Mostra' }}
                  </button>
                </div>
              </div>
            </mat-card-content>
          </mat-card>

          <!-- Standalone Components -->
          <mat-card class="feature-card" [class.active]="activeFeature() === 'standalone'">
            <mat-card-header>
              <mat-icon class="feature-icon">extension</mat-icon>
              <mat-card-title>Standalone Components</mat-card-title>
              <mat-card-subtitle>100% Standalone</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <p>Componenti auto-contenuti senza NgModule, con dependency injection moderna.</p>
              <div class="feature-demo">
                <div class="demo-standalone">
                  <mat-chip color="primary">Componente Standalone</mat-chip>
                  <mat-chip color="accent">Dependency Injection</mat-chip>
                  <mat-chip color="warn">Tree-shakable</mat-chip>
                </div>
              </div>
            </mat-card-content>
          </mat-card>

          <!-- Lazy Loading -->
          <mat-card class="feature-card" [class.active]="activeFeature() === 'lazy-loading'">
            <mat-card-header>
              <mat-icon class="feature-icon">download</mat-icon>
              <mat-card-title>Lazy Loading</mat-card-title>
              <mat-card-subtitle>Route-based</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <p>Caricamento on-demand dei moduli per performance ottimali.</p>
              <div class="feature-demo">
                <div class="demo-lazy">
                  <mat-progress-bar [value]="loadingProgress()" color="primary"></mat-progress-bar>
                  <span>{{ loadingProgress() }}% caricato</span>
                  <button mat-button (click)="simulateLoading()" [disabled]="isLoading()">
                    {{ isLoading() ? 'Caricamento...' : 'Simula Caricamento' }}
                  </button>
                </div>
              </div>
            </mat-card-content>
          </mat-card>

          <!-- Reactive Forms -->
          <mat-card class="feature-card" [class.active]="activeFeature() === 'reactive-forms'">
            <mat-card-header>
              <mat-icon class="feature-icon">description</mat-icon>
              <mat-card-title>Reactive Forms</mat-card-title>
              <mat-card-subtitle>Form Handling Moderno</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <p>Gestione avanzata dei form con validazione reattiva e controllo completo.</p>
              <div class="feature-demo">
                <div class="demo-forms">
                  <div class="form-preview">
                    <div class="form-field">
                      <span class="field-label">Nome:</span>
                      <span class="field-value">{{ formData().name || 'Non compilato' }}</span>
                    </div>
                    <div class="form-field">
                      <span class="field-label">Email:</span>
                      <span class="field-value">{{ formData().email || 'Non compilato' }}</span>
                    </div>
                    <div class="form-status">
                      <mat-chip [color]="formData().name && formData().email ? 'accent' : 'warn'" selected>
                        {{ formData().name && formData().email ? 'Valido' : 'Invalido' }}
                      </mat-chip>
                    </div>
                  </div>
                  <button mat-button (click)="simulateFormData()">
                    Simula Dati Form
                  </button>
                </div>
              </div>
            </mat-card-content>
          </mat-card>

          <!-- Subjects vs Signals -->
          <mat-card class="feature-card" [class.active]="activeFeature() === 'subjects'">
            <mat-card-header>
              <mat-icon class="feature-icon">swap_horiz</mat-icon>
              <mat-card-title>Subjects vs Signals</mat-card-title>
              <mat-card-subtitle>State Management</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <p>Confronta diversi approcci alla gestione dello stato reattivo.</p>
              <div class="feature-demo">
                <div class="demo-subjects">
                  <div class="state-comparison">
                    <div class="state-item">
                      <span class="state-label">Signals:</span>
                      <mat-chip color="accent" selected>{{ subjectCounter() }}</mat-chip>
                    </div>
                    <div class="state-item">
                      <span class="state-label">Subject:</span>
                      <mat-chip color="primary" selected>{{ subjectCounter() }}</mat-chip>
                    </div>
                  </div>
                  <button mat-button (click)="incrementSubjectCounter()">
                    Incrementa Entrambi
                  </button>
                </div>
              </div>
            </mat-card-content>
          </mat-card>
        </div>
      </div>

      <!-- Interactive Demo -->
      <div class="demo-section">
        <h2 class="section-title">🎮 Demo Interattivo</h2>
        <mat-card class="demo-card">
          <mat-card-content>
            <div class="demo-controls">
              <button mat-raised-button color="primary" (click)="setActiveFeature('signals')">
                <mat-icon>memory</mat-icon>
                Signals Demo
              </button>
              <button mat-raised-button color="accent" (click)="setActiveFeature('control-flow')">
                <mat-icon>code</mat-icon>
                Control Flow Demo
              </button>
              <button mat-raised-button color="warn" (click)="setActiveFeature('standalone')">
                <mat-icon>extension</mat-icon>
                Standalone Demo
              </button>
              <button mat-raised-button (click)="setActiveFeature('lazy-loading')">
                <mat-icon>download</mat-icon>
                Lazy Loading Demo
              </button>
              <button mat-raised-button color="primary" (click)="setActiveFeature('reactive-forms')">
                <mat-icon>description</mat-icon>
                Reactive Forms Demo
              </button>
              <button mat-raised-button color="accent" (click)="setActiveFeature('subjects')">
                <mat-icon>swap_horiz</mat-icon>
                Subjects vs Signals Demo
              </button>
            </div>
            
            <div class="demo-info">
              <h3>Informazioni Demo</h3>
              <p>{{ getDemoInfo() }}</p>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Navigation -->
      <div class="navigation-section">
        <h2 class="section-title">🧭 Esplora il Progetto</h2>
        <div class="nav-grid">
          <mat-card class="nav-card" routerLink="/survey-builder">
            <mat-card-header>
              <mat-icon>edit</mat-icon>
              <mat-card-title>Survey Builder</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <p>Crea e gestisci sondaggi con l'editor avanzato</p>
            </mat-card-content>
          </mat-card>

          <mat-card class="nav-card" routerLink="/analytics">
            <mat-card-header>
              <mat-icon>analytics</mat-icon>
              <mat-card-title>Analytics</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <p>Visualizza i risultati con Chart.js e animazioni</p>
            </mat-card-content>
          </mat-card>

          <mat-card class="nav-card" routerLink="/learn">
            <mat-card-header>
              <mat-icon>school</mat-icon>
              <mat-card-title>Learning Center</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <p>Demo interattivi per imparare Angular 20</p>
            </mat-card-content>
          </mat-card>

          <mat-card class="nav-card" routerLink="/learn/reactive-forms">
            <mat-card-header>
              <mat-icon>description</mat-icon>
              <mat-card-title>Reactive Forms</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <p>Confronta Reactive Forms vs Template-Driven Forms</p>
            </mat-card-content>
          </mat-card>

          <mat-card class="nav-card" routerLink="/learn/subjects">
            <mat-card-header>
              <mat-icon>swap_horiz</mat-icon>
              <mat-card-title>Subjects vs Signals</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <p>Confronta diversi approcci alla gestione dello stato</p>
            </mat-card-content>
          </mat-card>

          <mat-card class="nav-card" routerLink="/learn/lazy-loading">
            <mat-card-header>
              <mat-icon>download</mat-icon>
              <mat-card-title>Lazy Loading</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <p>Scopri il code splitting e il caricamento on-demand</p>
            </mat-card-content>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .welcome-container {
      @apply max-w-7xl mx-auto space-y-12;
    }

    .hero-section {
      @apply text-center py-12;
    }

    .hero-title {
      @apply text-4xl md:text-6xl font-bold mb-4;
      color: var(--text-primary);
    }

    .hero-subtitle {
      @apply block text-xl md:text-2xl font-medium;
      color: var(--primary-color);
    }

    .hero-description {
      @apply text-lg max-w-3xl mx-auto mb-8;
      color: var(--text-secondary);
    }

    .hero-actions {
      @apply flex flex-col sm:flex-row gap-4 justify-center;
    }

    .section-title {
      @apply text-3xl font-bold mb-8 text-center;
      color: var(--text-primary);
    }

    .features-grid {
      @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6;
    }

    .feature-card {
      @apply transition-all duration-300 hover:shadow-lg;
      background-color: var(--card-background);
      border: 1px solid var(--border-color);
    }

    .feature-card.active {
      @apply ring-2 ring-blue-500 shadow-lg;
    }

    .feature-icon {
      @apply text-3xl mb-2;
      color: var(--primary-color);
    }

    .feature-demo {
      @apply mt-4 p-4 rounded-lg;
      background-color: var(--surface-color);
    }

    .demo-counter {
      @apply flex items-center justify-between mb-2;
    }

    .demo-computed {
      @apply flex gap-4 text-sm;
      color: var(--text-secondary);
    }

    .demo-control-flow {
      @apply space-y-2;
    }

    .message {
      @apply p-2 rounded text-center;
    }

    .message.success {
      @apply bg-green-100 text-green-800;
    }

    .message.hidden {
      background-color: var(--surface-color);
      color: var(--text-secondary);
    }

    .demo-standalone {
      @apply flex flex-wrap gap-2;
    }

    .demo-lazy {
      @apply space-y-2;
    }

    .demo-forms {
      @apply space-y-3;
    }

    .form-preview {
      @apply space-y-2;
    }

    .form-field {
      @apply flex justify-between items-center;
    }

    .field-label {
      @apply font-medium;
      color: var(--text-primary);
    }

    .field-value {
      @apply text-sm;
      color: var(--text-secondary);
    }

    .form-status {
      @apply flex justify-center mt-2;
    }

    .demo-subjects {
      @apply space-y-3;
    }

    .state-comparison {
      @apply space-y-2;
    }

    .state-item {
      @apply flex justify-between items-center;
    }

    .state-label {
      @apply font-medium;
      color: var(--text-primary);
    }

    .demo-section {
      @apply py-8;
    }

    .demo-card {
      @apply max-w-4xl mx-auto;
      background-color: var(--card-background);
    }

    .demo-controls {
      @apply grid grid-cols-2 md:grid-cols-4 gap-4 mb-6;
    }

    .demo-info {
      @apply p-4 rounded-lg;
      background-color: var(--surface-color);
    }

    .demo-info h3 {
      @apply text-lg font-semibold mb-2;
      color: var(--text-primary);
    }

    .demo-info p {
      color: var(--text-secondary);
    }

    .navigation-section {
      @apply py-8;
    }

    .nav-grid {
      @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6;
    }

    .nav-card {
      @apply cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105;
      background-color: var(--card-background);
      border: 1px solid var(--border-color);
    }

    .nav-card mat-card-header {
      @apply flex flex-col items-center text-center;
    }

    .nav-card mat-icon {
      @apply text-3xl mb-2;
      color: var(--primary-color);
    }

    .nav-card p {
      color: var(--text-secondary);
    }

    /* Responsive */
    @media (max-width: 768px) {
      .hero-title {
        @apply text-3xl;
      }
      
      .demo-controls {
        @apply grid-cols-2;
      }
    }
  `]
})
export class WelcomeComponent {
  readonly counter = signal(0);
  readonly showMessage = signal(true);
  readonly activeFeature = signal('signals');
  readonly isLoading = signal(false);
  readonly loadingProgress = signal(0);
  readonly subjectCounter = signal(0);
  readonly formData = signal({ name: '', email: '' });

  readonly isEven = computed(() => this.counter() % 2 === 0);
  readonly squared = computed(() => this.counter() * this.counter());

  incrementCounter(): void {
    this.counter.update(c => c + 1);
  }

  toggleMessage(): void {
    this.showMessage.update(m => !m);
  }

  setActiveFeature(feature: string): void {
    this.activeFeature.set(feature);
  }

  simulateLoading(): void {
    this.isLoading.set(true);
    this.loadingProgress.set(0);
    
    const interval = setInterval(() => {
      this.loadingProgress.update(p => {
        if (p >= 100) {
          clearInterval(interval);
          this.isLoading.set(false);
          return 100;
        }
        return p + 10;
      });
    }, 100);
  }

  incrementSubjectCounter(): void {
    this.subjectCounter.update(c => c + 1);
  }

  simulateFormData(): void {
    const names = ['Mario Rossi', 'Giulia Bianchi', 'Luca Verdi', 'Anna Neri'];
    const emails = ['mario@example.com', 'giulia@example.com', 'luca@example.com', 'anna@example.com'];
    const randomIndex = Math.floor(Math.random() * names.length);
    
    this.formData.set({
      name: names[randomIndex],
      email: emails[randomIndex]
    });
  }

  getDemoInfo(): string {
    switch (this.activeFeature()) {
      case 'signals':
        return 'I Signals sono il nuovo sistema di gestione dello stato in Angular 20. Sono reattivi, performanti e facili da usare. Prova a cliccare il pulsante per vedere il contatore aggiornarsi in tempo reale!';
      case 'control-flow':
        return 'Il nuovo Control Flow (@if, @for, @switch) sostituisce le direttive strutturali tradizionali. È più performante e ha una sintassi più pulita. Prova a mostrare/nascondere il messaggio!';
      case 'standalone':
        return 'I componenti Standalone non richiedono NgModule e sono auto-contenuti. Utilizzano la dependency injection moderna e sono tree-shakable per default.';
      case 'lazy-loading':
        return 'Il Lazy Loading carica i moduli solo quando necessario, migliorando le performance dell\'applicazione. Simula il caricamento per vedere la barra di progresso!';
      case 'reactive-forms':
        return 'I Reactive Forms offrono un controllo completo sui form con validazione reattiva e gestione dello stato. Confronta con i Template-Driven Forms per vedere le differenze!';
      case 'subjects':
        return 'Confronta BehaviorSubject, Subject e Signals per capire i diversi approcci alla gestione dello stato reattivo. Ogni metodo ha i suoi vantaggi e casi d\'uso specifici!';
      default:
        return 'Seleziona una funzionalità per vedere informazioni dettagliate.';
    }
  }
} 