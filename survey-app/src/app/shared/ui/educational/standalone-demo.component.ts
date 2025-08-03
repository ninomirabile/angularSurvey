import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

// Simulated service for dependency injection demo
class StandaloneService {
  private readonly counter = signal(0);
  
  getCounter() {
    return this.counter;
  }
  
  increment() {
    this.counter.update(c => c + 1);
  }
  
  reset() {
    this.counter.set(0);
  }
}

@Component({
  selector: 'app-standalone-demo',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatChipsModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  template: `
    <div class="p-6 max-w-6xl mx-auto">
      <mat-card class="mb-6">
        <mat-card-header>
          <mat-card-title class="text-3xl font-bold text-blue-600">
            Angular 20 Standalone Components - Architettura Moderna
          </mat-card-title>
          <mat-card-subtitle class="text-gray-600">
            Componenti auto-contenuti senza NgModule, con dependency injection moderna
          </mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p class="text-gray-700 mb-4">
            I componenti Standalone di Angular 20 eliminano la necessità di NgModule, 
            offrendo un'architettura più semplice, tree-shakable e con dependency injection moderna.
          </p>
        </mat-card-content>
      </mat-card>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Dependency Injection Demo -->
        <mat-card>
          <mat-card-header>
            <mat-card-title>Dependency Injection Moderna</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="space-y-4">
              <div class="flex items-center gap-4">
                <button mat-raised-button color="primary" (click)="incrementService()">
                  <mat-icon>add</mat-icon>
                  Incrementa
                </button>
                <button mat-stroked-button (click)="resetService()">
                  <mat-icon>refresh</mat-icon>
                  Reset
                </button>
              </div>

              <mat-divider></mat-divider>

              <div class="demo-section">
                <h4 class="font-semibold mb-2">Service Counter</h4>
                <div class="p-4 bg-blue-100 text-blue-800 rounded-lg">
                  <mat-icon class="align-middle mr-2">memory</mat-icon>
                  Contatore del Service: {{ serviceCounter() }}
                </div>
                <p class="text-sm text-gray-600 mt-2">
                  Questo contatore è gestito da un service iniettato usando la funzione inject()
                </p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Component State Demo -->
        <mat-card>
          <mat-card-header>
            <mat-card-title>Stato del Componente</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="space-y-4">
              <div class="flex items-center gap-4">
                <button mat-raised-button color="accent" (click)="addComponent()">
                  <mat-icon>add_circle</mat-icon>
                  Aggiungi Componente
                </button>
                <button mat-stroked-button (click)="clearComponents()">
                  <mat-icon>clear_all</mat-icon>
                  Pulisci
                </button>
              </div>

              <mat-divider></mat-divider>

              <div class="demo-section">
                <h4 class="font-semibold mb-2">Componenti Attivi</h4>
                <div *ngIf="components().length > 0">
                  <mat-list>
                    <mat-list-item *ngFor="let component of components(); trackBy: trackByComponentId">
                      <mat-icon matListItemIcon [color]="component.active ? 'primary' : 'warn'">
                        extension
                      </mat-icon>
                      <div matListItemTitle>{{ component.name }}</div>
                      <div matListItemLine>{{ component.type }}</div>
                      <mat-chip matListItemMeta [color]="component.active ? 'accent' : 'warn'" selected>
                        {{ component.active ? 'Attivo' : 'Inattivo' }}
                      </mat-chip>
                    </mat-list-item>
                  </mat-list>
                </div>
                <div *ngIf="components().length === 0" class="p-4 bg-gray-100 text-gray-600 rounded-lg text-center">
                  <mat-icon class="text-4xl mb-2">extension_off</mat-icon>
                  <p>Nessun componente attivo</p>
                  <p class="text-sm">Clicca "Aggiungi Componente" per iniziare</p>
                </div>
              </div>

              <div class="demo-section">
                <h4 class="font-semibold mb-2">Statistiche</h4>
                <div class="flex gap-4">
                  <mat-chip color="primary" selected>
                    Totale: {{ components().length }}
                  </mat-chip>
                  <mat-chip color="accent" selected>
                    Attivi: {{ activeComponents() }}
                  </mat-chip>
                  <mat-chip color="warn" selected>
                    Inattivi: {{ inactiveComponents() }}
                  </mat-chip>
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Features Demo -->
      <mat-card class="mt-6">
        <mat-card-header>
          <mat-card-title>Caratteristiche Standalone</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="feature-item">
              <h4 class="font-semibold mb-2">Auto-contenuto</h4>
              <p class="text-sm text-gray-600">
                Ogni componente dichiara le sue dipendenze e importa solo ciò che necessita
              </p>
              <mat-chip color="primary" selected class="mt-2">No NgModule</mat-chip>
            </div>

            <div class="feature-item">
              <h4 class="font-semibold mb-2">Tree-shakable</h4>
              <p class="text-sm text-gray-600">
                Il bundler può eliminare il codice non utilizzato per bundle più piccoli
              </p>
              <mat-chip color="accent" selected class="mt-2">Bundle Ottimizzati</mat-chip>
            </div>

            <div class="feature-item">
              <h4 class="font-semibold mb-2">DI Moderna</h4>
              <p class="text-sm text-gray-600">
                Uso della funzione inject() per dependency injection più pulita
              </p>
              <mat-chip color="warn" selected class="mt-2">inject()</mat-chip>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    .mat-mdc-card {
      margin-bottom: 1rem;
    }

    .demo-section {
      @apply p-4 rounded-lg;
      background-color: var(--surface-color);
    }

    .feature-item {
      @apply p-4 rounded-lg;
      background-color: var(--surface-color);
    }
  `]
})
export class StandaloneDemoComponent {
  // Dependency injection demo
  private readonly standaloneService = inject(StandaloneService);
  readonly serviceCounter = this.standaloneService.getCounter();

  // Component state demo
  readonly components = signal<Array<{id: number, name: string, type: string, active: boolean}>>([
    { id: 1, name: 'HeaderComponent', type: 'Layout', active: true },
    { id: 2, name: 'WelcomeComponent', type: 'Page', active: true },
    { id: 3, name: 'SurveyBuilderComponent', type: 'Feature', active: false }
  ]);

  // Computed values
  readonly activeComponents = computed(() => 
    this.components().filter(comp => comp.active).length
  );

  readonly inactiveComponents = computed(() => 
    this.components().filter(comp => !comp.active).length
  );

  // Service methods
  incrementService(): void {
    this.standaloneService.increment();
  }

  resetService(): void {
    this.standaloneService.reset();
  }

  // Component methods
  addComponent(): void {
    const newId = Math.max(...this.components().map(c => c.id)) + 1;
    const types = ['Component', 'Service', 'Directive', 'Pipe', 'Guard'];
    const names = ['UserComponent', 'AuthService', 'HighlightDirective', 'DatePipe', 'AuthGuard'];
    
    const newComponent = {
      id: newId,
      name: names[Math.floor(Math.random() * names.length)],
      type: types[Math.floor(Math.random() * types.length)],
      active: Math.random() > 0.3
    };

    this.components.update(comps => [...comps, newComponent]);
  }

  clearComponents(): void {
    this.components.set([]);
  }

  trackByComponentId(index: number, component: any): number {
    return component.id;
  }
} 