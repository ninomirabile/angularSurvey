import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';

interface User {
  id: number;
  name: string;
  role: string;
  active: boolean;
}

@Component({
  selector: 'app-control-flow-demo',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatChipsModule,
    MatListModule
  ],
  template: `
    <div class="p-6 max-w-6xl mx-auto">
      <mat-card class="mb-6">
        <mat-card-header>
          <mat-card-title class="text-3xl font-bold text-blue-600">
            Angular 20 Control Flow - Nuova Sintassi
          </mat-card-title>
          <mat-card-subtitle class="text-gray-600">
            Sostituisce le direttive strutturali tradizionali con sintassi più pulita e performante
          </mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p class="text-gray-700 mb-4">
            Il nuovo Control Flow di Angular 20 introduce &#64;if, &#64;for, &#64;switch per un rendering condizionale 
            più efficiente e una sintassi più moderna rispetto a *ngIf, *ngFor e *ngSwitch.
          </p>
        </mat-card-content>
      </mat-card>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- @if Demo -->
        <mat-card>
          <mat-card-header>
            <mat-card-title>&#64;if - Rendering Condizionale</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="space-y-4">
              <div class="flex items-center gap-4">
                <button mat-raised-button color="primary" (click)="toggleVisibility()">
                  <mat-icon>visibility</mat-icon>
                  {{ isVisible() ? 'Nascondi' : 'Mostra' }}
                </button>
              </div>

              <mat-divider></mat-divider>

              <div class="demo-section">
                <h4 class="font-semibold mb-2">&#64;if con &#64;else</h4>
                <div *ngIf="isVisible()" class="p-4 bg-green-100 text-green-800 rounded-lg">
                  <mat-icon class="align-middle mr-2">check_circle</mat-icon>
                  Contenuto visibile! Il nuovo &#64;if è più performante di *ngIf
                </div>
                <div *ngIf="!isVisible()" class="p-4 bg-gray-100 text-gray-600 rounded-lg">
                  <mat-icon class="align-middle mr-2">visibility_off</mat-icon>
                  Contenuto nascosto. Clicca "Mostra" per vedere la magia!
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- @for Demo -->
        <mat-card>
          <mat-card-header>
            <mat-card-title>&#64;for - Rendering di Liste</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="space-y-4">
              <div class="flex items-center gap-4">
                <button mat-raised-button color="accent" (click)="addUser()">
                  <mat-icon>person_add</mat-icon>
                  Aggiungi Utente
                </button>
                <button mat-stroked-button (click)="clearUsers()">
                  <mat-icon>clear_all</mat-icon>
                  Pulisci Lista
                </button>
              </div>

              <mat-divider></mat-divider>

              <div class="demo-section">
                <h4 class="font-semibold mb-2">&#64;for con track function</h4>
                <div *ngIf="users().length > 0">
                  <mat-list>
                    <mat-list-item *ngFor="let user of users(); trackBy: trackByUserId">
                      <mat-icon matListItemIcon [color]="user.active ? 'primary' : 'warn'">
                        person
                      </mat-icon>
                      <div matListItemTitle>{{ user.name }}</div>
                      <div matListItemLine>{{ user.role }}</div>
                      <mat-chip matListItemMeta [color]="user.active ? 'accent' : 'warn'" selected>
                        {{ user.active ? 'Attivo' : 'Inattivo' }}
                      </mat-chip>
                    </mat-list-item>
                  </mat-list>
                </div>
                <div *ngIf="users().length === 0" class="p-4 bg-gray-100 text-gray-600 rounded-lg text-center">
                  <mat-icon class="text-4xl mb-2">group_off</mat-icon>
                  <p>Nessun utente nella lista</p>
                  <p class="text-sm">Clicca "Aggiungi Utente" per iniziare</p>
                </div>
              </div>

              <div class="demo-section">
                <h4 class="font-semibold mb-2">Statistiche</h4>
                <div class="flex gap-4">
                  <mat-chip color="primary" selected>
                    Totale: {{ users().length }}
                  </mat-chip>
                  <mat-chip color="accent" selected>
                    Attivi: {{ activeUsers() }}
                  </mat-chip>
                  <mat-chip color="warn" selected>
                    Inattivi: {{ inactiveUsers() }}
                  </mat-chip>
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
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
  `]
})
export class ControlFlowDemoComponent {
  // Signals for @if demo
  readonly isVisible = signal(true);

  // Signals for @for demo
  readonly users = signal<User[]>([
    { id: 1, name: 'Mario Rossi', role: 'Developer', active: true },
    { id: 2, name: 'Anna Bianchi', role: 'Designer', active: true },
    { id: 3, name: 'Luca Verdi', role: 'Manager', active: false }
  ]);

  // Computed values
  readonly activeUsers = computed(() => 
    this.users().filter(user => user.active).length
  );

  readonly inactiveUsers = computed(() => 
    this.users().filter(user => !user.active).length
  );

  // Methods for @if demo
  toggleVisibility(): void {
    this.isVisible.update(v => !v);
  }

  // Methods for @for demo
  addUser(): void {
    const newId = Math.max(...this.users().map(u => u.id)) + 1;
    const roles = ['Developer', 'Designer', 'Manager', 'Tester', 'Analyst'];
    const names = ['Giulia Neri', 'Marco Gialli', 'Sofia Blu', 'Paolo Rossi', 'Elena Bianchi'];
    
    const newUser: User = {
      id: newId,
      name: names[Math.floor(Math.random() * names.length)],
      role: roles[Math.floor(Math.random() * roles.length)],
      active: Math.random() > 0.3
    };

    this.users.update(users => [...users, newUser]);
  }

  clearUsers(): void {
    this.users.set([]);
  }

  trackByUserId(index: number, user: User): number {
    return user.id;
  }
} 