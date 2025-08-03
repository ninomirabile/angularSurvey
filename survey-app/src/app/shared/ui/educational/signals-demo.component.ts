import { Component, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signals-demo',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule
  ],
  template: `
    <div class="p-6 max-w-6xl mx-auto">
      <mat-card class="mb-6">
        <mat-card-header>
          <mat-card-title class="text-3xl font-bold text-blue-600">
            🎯 Angular Signals - State Management Moderno
          </mat-card-title>
          <mat-card-subtitle class="text-gray-600">
            Il nuovo sistema di gestione dello stato reattivo in Angular 20
          </mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p class="text-gray-700 mb-4">
            I Signals sono il nuovo primitivo reattivo di Angular 20 che sostituisce i tradizionali Observable 
            per la gestione dello stato. Offrono performance superiori, sintassi più pulita e change detection automatico.
          </p>
        </mat-card-content>
      </mat-card>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <mat-card>
          <mat-card-header>
            <mat-card-title>🎮 Controlli Interattivi</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium mb-2">Contatore</label>
                <div class="flex items-center gap-4">
                  <button mat-raised-button color="primary" (click)="incrementCounter()">
                    <mat-icon>add</mat-icon>
                    Incrementa
                  </button>
                  <button mat-raised-button color="warn" (click)="decrementCounter()">
                    <mat-icon>remove</mat-icon>
                    Decrementa
                  </button>
                  <button mat-stroked-button (click)="resetCounter()">
                    <mat-icon>refresh</mat-icon>
                    Reset
                  </button>
                </div>
              </div>

              <mat-divider></mat-divider>

              <div>
                <label class="block text-sm font-medium mb-2">Nome Utente</label>
                <mat-form-field appearance="outline" class="w-full">
                  <input matInput 
                         [value]="userName()" 
                         (input)="updateUserName($event)"
                         placeholder="Inserisci il tuo nome">
                </mat-form-field>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card>
          <mat-card-header>
            <mat-card-title>📊 Stato dei Signals</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="space-y-4">
              <div>
                <h4 class="font-semibold mb-2">Valori Correnti</h4>
                <div class="space-y-2">
                  <div class="flex justify-between">
                    <span>Contatore:</span>
                    <mat-chip [color]="counter() % 2 === 0 ? 'accent' : 'primary'" selected>
                      {{ counter() }}
                    </mat-chip>
                  </div>
                  <div class="flex justify-between">
                    <span>Nome Utente:</span>
                    <span class="font-medium">{{ userName() || 'Non impostato' }}</span>
                  </div>
                </div>
              </div>

              <mat-divider></mat-divider>

              <div>
                <h4 class="font-semibold mb-2">Valori Computed</h4>
                <div class="space-y-2">
                  <div class="flex justify-between">
                    <span>È Pari:</span>
                    <mat-chip [color]="isEven() ? 'accent' : 'warn'" selected>
                      {{ isEven() ? 'Sì' : 'No' }}
                    </mat-chip>
                  </div>
                  <div class="flex justify-between">
                    <span>Quadrato:</span>
                    <span class="font-medium">{{ squared() }}</span>
                  </div>
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <mat-card class="mt-6">
        <mat-card-header>
          <mat-card-title>📝 Esempi di Codice</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="space-y-4">
            <div>
              <h4 class="font-semibold mb-2">Definizione dei Signals</h4>
              <div class="bg-gray-100 p-4 rounded text-sm">
                <p>readonly counter = signal(0);</p>
                <p>readonly userName = signal('');</p>
              </div>
            </div>

            <div>
              <h4 class="font-semibold mb-2">Computed Signals</h4>
              <div class="bg-gray-100 p-4 rounded text-sm">
                <p>readonly isEven = computed(() => this.counter() % 2 === 0);</p>
                <p>readonly squared = computed(() => this.counter() * this.counter());</p>
              </div>
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
  `]
})
export class SignalsDemoComponent {
  // Basic Signals
  readonly counter = signal(0);
  readonly userName = signal('');
  readonly theme = signal('light');

  // Computed Signals
  readonly isEven = computed(() => this.counter() % 2 === 0);
  readonly squared = computed(() => this.counter() * this.counter());
  readonly displayName = computed(() => this.userName() || 'Utente Anonimo');
  readonly counterPlusTen = computed(() => this.counter() + 10);

  // Effect logs
  effectLogs: Array<{type: string, message: string, timestamp: Date}> = [];

  constructor() {
    // Effect per il contatore
    effect(() => {
      console.log('Contatore cambiato:', this.counter());
      this.logEffect('counter_change', 'Contatore: ' + this.counter());
    });

    // Effect per il tema
    effect(() => {
      console.log('Tema cambiato:', this.theme());
      this.logEffect('theme_change', 'Tema: ' + this.theme());
    });

    // Effect per il nome utente
    effect(() => {
      if (this.userName()) {
        console.log('Nome utente impostato:', this.userName());
        this.logEffect('user_set', 'Utente: ' + this.userName());
      }
    });
  }

  // Methods
  incrementCounter(): void {
    this.counter.update(c => c + 1);
  }

  decrementCounter(): void {
    this.counter.update(c => c - 1);
  }

  resetCounter(): void {
    this.counter.set(0);
  }

  updateUserName(event: any): void {
    this.userName.set(event.target.value);
  }

  updateTheme(theme: string): void {
    this.theme.set(theme);
  }

  private logEffect(type: string, message: string): void {
    this.effectLogs.unshift({
      type,
      message,
      timestamp: new Date()
    });
    
    // Mantieni solo gli ultimi 10 log
    if (this.effectLogs.length > 10) {
      this.effectLogs.pop();
    }
  }
} 