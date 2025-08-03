import { Component, inject, signal, computed, effect, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Subject, ReplaySubject, Observable, Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

interface EventLog {
  timestamp: Date;
  type: string;
  value: any;
  source: string;
}

@Component({
  selector: 'app-subjects-demo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatDividerModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  template: `
    <div class="p-6 max-w-6xl mx-auto">
      <mat-card class="mb-6">
        <mat-card-header>
          <mat-card-title class="text-2xl font-bold text-purple-600">
            🔄 BehaviorSubject vs Subject vs Signals
          </mat-card-title>
          <mat-card-subtitle class="text-gray-600">
            Understanding reactive state management in Angular 20
          </mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p class="text-gray-700 mb-4">
            Compare different approaches to reactive state management: 
            BehaviorSubject, Subject, ReplaySubject, and the new Signals.
          </p>
        </mat-card-content>
      </mat-card>

      <mat-tab-group>
        <!-- Signals Tab -->
        <mat-tab label="Signals">
          <div class="p-6">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <!-- Signal Controls -->
              <mat-card>
                <mat-card-header>
                  <mat-card-title>🎯 Signal Controls</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <div class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium mb-2">Counter Value</label>
                      <div class="flex items-center gap-4">
                        <button mat-raised-button 
                                color="primary" 
                                (click)="incrementSignal()">
                          <mat-icon>add</mat-icon>
                          Increment
                        </button>
                        <button mat-raised-button 
                                color="warn" 
                                (click)="decrementSignal()">
                          <mat-icon>remove</mat-icon>
                          Decrement
                        </button>
                        <button mat-stroked-button 
                                (click)="resetSignal()">
                          <mat-icon>refresh</mat-icon>
                          Reset
                        </button>
                      </div>
                    </div>

                    <mat-divider></mat-divider>

                    <div>
                      <label class="block text-sm font-medium mb-2">User Name</label>
                      <mat-form-field appearance="outline" class="w-full">
                        <input matInput 
                               [value]="userNameSignal()" 
                               (input)="updateUserNameSignal($event)"
                               placeholder="Enter user name">
                      </mat-form-field>
                    </div>

                    <mat-divider></mat-divider>

                    <div>
                      <label class="block text-sm font-medium mb-2">Theme</label>
                      <mat-form-field appearance="outline" class="w-full">
                        <mat-select [value]="themeSignal()" (selectionChange)="updateThemeSignal($event.value)">
                          <mat-option value="light">Light</mat-option>
                          <mat-option value="dark">Dark</mat-option>
                          <mat-option value="auto">Auto</mat-option>
                        </mat-select>
                      </mat-form-field>
                    </div>
                  </div>
                </mat-card-content>
              </mat-card>

              <!-- Signal State Display -->
              <mat-card>
                <mat-card-header>
                  <mat-card-title>📊 Signal State</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <div class="space-y-4">
                    <div>
                      <h4 class="font-semibold mb-2">Current Values</h4>
                      <div class="space-y-2">
                        <div class="flex justify-between">
                          <span>Counter:</span>
                          <mat-chip [color]="counterSignal() % 2 === 0 ? 'accent' : 'primary'" selected>
                            {{ counterSignal() }}
                          </mat-chip>
                        </div>
                        <div class="flex justify-between">
                          <span>User Name:</span>
                          <span class="font-medium">{{ userNameSignal() || 'Not set' }}</span>
                        </div>
                        <div class="flex justify-between">
                          <span>Theme:</span>
                          <mat-chip [color]="themeSignal() === 'dark' ? 'primary' : 'accent'" selected>
                            {{ themeSignal() }}
                          </mat-chip>
                        </div>
                      </div>
                    </div>

                    <mat-divider></mat-divider>

                    <div>
                      <h4 class="font-semibold mb-2">Computed Values</h4>
                      <div class="space-y-2">
                        <div class="flex justify-between">
                          <span>Is Even:</span>
                          <mat-chip [color]="isEvenSignal() ? 'accent' : 'warn'" selected>
                            {{ isEvenSignal() ? 'Yes' : 'No' }}
                          </mat-chip>
                        </div>
                        <div class="flex justify-between">
                          <span>Squared:</span>
                          <span class="font-medium">{{ squaredSignal() }}</span>
                        </div>
                        <div class="flex justify-between">
                          <span>Display Name:</span>
                          <span class="font-medium">{{ displayNameSignal() }}</span>
                        </div>
                      </div>
                    </div>

                    <mat-divider></mat-divider>

                    <div>
                      <h4 class="font-semibold mb-2">Signal Info</h4>
                      <div class="text-sm space-y-1">
                        <div>• Automatic change detection</div>
                        <div>• No manual subscription management</div>
                        <div>• Computed values update automatically</div>
                        <div>• Better performance than Observables</div>
                      </div>
                    </div>
                  </div>
                </mat-card-content>
              </mat-card>
            </div>
          </div>
        </mat-tab>

        <!-- BehaviorSubject Tab -->
        <mat-tab label="BehaviorSubject">
          <div class="p-6">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <!-- BehaviorSubject Controls -->
              <mat-card>
                <mat-card-header>
                  <mat-card-title>🔄 BehaviorSubject Controls</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <div class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium mb-2">Counter Value</label>
                      <div class="flex items-center gap-4">
                        <button mat-raised-button 
                                color="primary" 
                                (click)="incrementBehaviorSubject()">
                          <mat-icon>add</mat-icon>
                          Increment
                        </button>
                        <button mat-raised-button 
                                color="warn" 
                                (click)="decrementBehaviorSubject()">
                          <mat-icon>remove</mat-icon>
                          Decrement
                        </button>
                        <button mat-stroked-button 
                                (click)="resetBehaviorSubject()">
                          <mat-icon>refresh</mat-icon>
                          Reset
                        </button>
                      </div>
                    </div>

                    <mat-divider></mat-divider>

                    <div>
                      <label class="block text-sm font-medium mb-2">User Name</label>
                      <mat-form-field appearance="outline" class="w-full">
                        <input matInput 
                               [value]="behaviorSubjectUserNameValue" 
                               (input)="updateBehaviorSubjectUserName($event)"
                               placeholder="Enter user name">
                      </mat-form-field>
                    </div>

                    <mat-divider></mat-divider>

                    <div>
                      <h4 class="font-semibold mb-2">Subscription Status</h4>
                      <div class="flex gap-2">
                        <button mat-raised-button 
                                color="accent" 
                                (click)="subscribeToBehaviorSubject()"
                                [disabled]="behaviorSubjectSubscribed">
                          Subscribe
                        </button>
                        <button mat-raised-button 
                                color="warn" 
                                (click)="unsubscribeFromBehaviorSubject()"
                                [disabled]="!behaviorSubjectSubscribed">
                          Unsubscribe
                        </button>
                      </div>
                    </div>
                  </div>
                </mat-card-content>
              </mat-card>

              <!-- BehaviorSubject State Display -->
              <mat-card>
                <mat-card-header>
                  <mat-card-title>📊 BehaviorSubject State</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <div class="space-y-4">
                    <div>
                      <h4 class="font-semibold mb-2">Current Values</h4>
                      <div class="space-y-2">
                        <div class="flex justify-between">
                          <span>Counter:</span>
                          <mat-chip [color]="behaviorSubjectCounterValue % 2 === 0 ? 'accent' : 'primary'" selected>
                            {{ behaviorSubjectCounterValue }}
                          </mat-chip>
                        </div>
                        <div class="flex justify-between">
                          <span>User Name:</span>
                          <span class="font-medium">{{ behaviorSubjectUserNameValue || 'Not set' }}</span>
                        </div>
                      </div>
                    </div>

                    <mat-divider></mat-divider>

                    <div>
                      <h4 class="font-semibold mb-2">Subscription Status</h4>
                      <mat-chip [color]="behaviorSubjectSubscribed ? 'accent' : 'warn'" selected>
                        {{ behaviorSubjectSubscribed ? 'Subscribed' : 'Not Subscribed' }}
                      </mat-chip>
                    </div>

                    <mat-divider></mat-divider>

                    <div>
                      <h4 class="font-semibold mb-2">Event Log</h4>
                      <div class="max-h-40 overflow-auto space-y-1">
                        <div *ngFor="let event of behaviorSubjectEvents" 
                             class="text-xs p-2 bg-gray-100 rounded">
                          <div class="flex justify-between">
                            <span class="font-medium">{{ event.type }}</span>
                            <span class="text-gray-500">{{ event.timestamp | date:'HH:mm:ss' }}</span>
                          </div>
                          <div class="text-gray-600">{{ event.value }}</div>
                        </div>
                      </div>
                    </div>

                    <mat-divider></mat-divider>

                    <div>
                      <h4 class="font-semibold mb-2">BehaviorSubject Info</h4>
                      <div class="text-sm space-y-1">
                        <div>• Emits current value to new subscribers</div>
                        <div>• Requires manual subscription management</div>
                        <div>• Good for state that needs initial value</div>
                        <div>• Part of RxJS library</div>
                      </div>
                    </div>
                  </div>
                </mat-card-content>
              </mat-card>
            </div>
          </div>
        </mat-tab>

        <!-- Subject Tab -->
        <mat-tab label="Subject">
          <div class="p-6">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <!-- Subject Controls -->
              <mat-card>
                <mat-card-header>
                  <mat-card-title>📡 Subject Controls</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <div class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium mb-2">Event Emitter</label>
                      <div class="flex items-center gap-4">
                        <button mat-raised-button 
                                color="primary" 
                                (click)="emitSubjectEvent('user_click')">
                          <mat-icon>mouse</mat-icon>
                          User Click
                        </button>
                        <button mat-raised-button 
                                color="accent" 
                                (click)="emitSubjectEvent('data_loaded')">
                          <mat-icon>cloud_download</mat-icon>
                          Data Loaded
                        </button>
                        <button mat-raised-button 
                                color="warn" 
                                (click)="emitSubjectEvent('error')">
                          <mat-icon>error</mat-icon>
                          Error
                        </button>
                      </div>
                    </div>

                    <mat-divider></mat-divider>

                    <div>
                      <label class="block text-sm font-medium mb-2">Custom Event</label>
                      <div class="flex gap-2">
                        <mat-form-field appearance="outline" class="flex-1">
                          <input matInput 
                                 [(ngModel)]="customEventType" 
                                 placeholder="Event type">
                        </mat-form-field>
                        <button mat-raised-button 
                                (click)="emitSubjectEvent(customEventType)">
                          Emit
                        </button>
                      </div>
                    </div>

                    <mat-divider></mat-divider>

                    <div>
                      <h4 class="font-semibold mb-2">Subscription Status</h4>
                      <div class="flex gap-2">
                        <button mat-raised-button 
                                color="accent" 
                                (click)="subscribeToSubject()"
                                [disabled]="subjectSubscribed">
                          Subscribe
                        </button>
                        <button mat-raised-button 
                                color="warn" 
                                (click)="unsubscribeFromSubject()"
                                [disabled]="!subjectSubscribed">
                          Unsubscribe
                        </button>
                      </div>
                    </div>
                  </div>
                </mat-card-content>
              </mat-card>

              <!-- Subject State Display -->
              <mat-card>
                <mat-card-header>
                  <mat-card-title>📊 Subject State</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <div class="space-y-4">
                    <div>
                      <h4 class="font-semibold mb-2">Subscription Status</h4>
                      <mat-chip [color]="subjectSubscribed ? 'accent' : 'warn'" selected>
                        {{ subjectSubscribed ? 'Subscribed' : 'Not Subscribed' }}
                      </mat-chip>
                    </div>

                    <mat-divider></mat-divider>

                    <div>
                      <h4 class="font-semibold mb-2">Event Log</h4>
                      <div class="max-h-40 overflow-auto space-y-1">
                        <div *ngFor="let event of subjectEvents" 
                             class="text-xs p-2 bg-gray-100 rounded">
                          <div class="flex justify-between">
                            <span class="font-medium">{{ event.type }}</span>
                            <span class="text-gray-500">{{ event.timestamp | date:'HH:mm:ss' }}</span>
                          </div>
                          <div class="text-gray-600">{{ event.value }}</div>
                        </div>
                      </div>
                    </div>

                    <mat-divider></mat-divider>

                    <div>
                      <h4 class="font-semibold mb-2">Subject Info</h4>
                      <div class="text-sm space-y-1">
                        <div>• Only emits to current subscribers</div>
                        <div>• No initial value</div>
                        <div>• Good for event streams</div>
                        <div>• Requires manual subscription management</div>
                      </div>
                    </div>
                  </div>
                </mat-card-content>
              </mat-card>
            </div>
          </div>
        </mat-tab>

        <!-- Comparison Tab -->
        <mat-tab label="Comparison">
          <div class="p-6">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <mat-card>
                <mat-card-header>
                  <mat-card-title>⚖️ Feature Comparison</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <div class="space-y-4">
                    <div>
                      <h4 class="font-semibold mb-2">Initial Value</h4>
                      <div class="space-y-2">
                        <div class="flex justify-between">
                          <span>Signals:</span>
                          <mat-chip color="accent" selected>Yes</mat-chip>
                        </div>
                        <div class="flex justify-between">
                          <span>BehaviorSubject:</span>
                          <mat-chip color="accent" selected>Yes</mat-chip>
                        </div>
                        <div class="flex justify-between">
                          <span>Subject:</span>
                          <mat-chip color="warn" selected>No</mat-chip>
                        </div>
                      </div>
                    </div>

                    <mat-divider></mat-divider>

                    <div>
                      <h4 class="font-semibold mb-2">Subscription Management</h4>
                      <div class="space-y-2">
                        <div class="flex justify-between">
                          <span>Signals:</span>
                          <mat-chip color="accent" selected>Automatic</mat-chip>
                        </div>
                        <div class="flex justify-between">
                          <span>BehaviorSubject:</span>
                          <mat-chip color="warn" selected>Manual</mat-chip>
                        </div>
                        <div class="flex justify-between">
                          <span>Subject:</span>
                          <mat-chip color="warn" selected>Manual</mat-chip>
                        </div>
                      </div>
                    </div>

                    <mat-divider></mat-divider>

                    <div>
                      <h4 class="font-semibold mb-2">Performance</h4>
                      <div class="space-y-2">
                        <div class="flex justify-between">
                          <span>Signals:</span>
                          <mat-chip color="accent" selected>Excellent</mat-chip>
                        </div>
                        <div class="flex justify-between">
                          <span>BehaviorSubject:</span>
                          <mat-chip color="primary" selected>Good</mat-chip>
                        </div>
                        <div class="flex justify-between">
                          <span>Subject:</span>
                          <mat-chip color="primary" selected>Good</mat-chip>
                        </div>
                      </div>
                    </div>
                  </div>
                </mat-card-content>
              </mat-card>

              <mat-card>
                <mat-card-header>
                  <mat-card-title>🎯 Use Cases</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <div class="space-y-4">
                    <div>
                      <h4 class="font-semibold mb-2">When to Use Signals</h4>
                      <div class="text-sm space-y-1">
                        <div>• Component state management</div>
                        <div>• Computed values</div>
                        <div>• Angular 20+ applications</div>
                        <div>• Performance-critical scenarios</div>
                      </div>
                    </div>

                    <mat-divider></mat-divider>

                    <div>
                      <h4 class="font-semibold mb-2">When to Use BehaviorSubject</h4>
                      <div class="text-sm space-y-1">
                        <div>• State that needs initial value</div>
                        <div>• Legacy Angular applications</div>
                        <div>• Complex state management</div>
                        <div>• When you need RxJS operators</div>
                      </div>
                    </div>

                    <mat-divider></mat-divider>

                    <div>
                      <h4 class="font-semibold mb-2">When to Use Subject</h4>
                      <div class="text-sm space-y-1">
                        <div>• Event streams</div>
                        <div>• One-time notifications</div>
                        <div>• Communication between components</div>
                        <div>• When you don't need initial value</div>
                      </div>
                    </div>
                  </div>
                </mat-card-content>
              </mat-card>
            </div>
          </div>
        </mat-tab>
      </mat-tab-group>
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
export class SubjectsDemoComponent implements OnDestroy {
  // Signals
  counterSignal = signal(0);
  userNameSignal = signal('');
  themeSignal = signal('light');

  // Computed signals
  isEvenSignal = computed(() => this.counterSignal() % 2 === 0);
  squaredSignal = computed(() => this.counterSignal() * this.counterSignal());
  displayNameSignal = computed(() => this.userNameSignal() || 'Anonymous User');

  // BehaviorSubject
  private behaviorSubjectCounter = new BehaviorSubject<number>(0);
  private behaviorSubjectUserName = new BehaviorSubject<string>('');
  behaviorSubjectCounterValue = 0;
  behaviorSubjectUserNameValue = '';
  behaviorSubjectSubscribed = false;
  behaviorSubjectEvents: EventLog[] = [];
  private behaviorSubjectSubscription?: Subscription;

  // Subject
  private subject = new Subject<string>();
  subjectSubscribed = false;
  subjectEvents: EventLog[] = [];
  customEventType = '';
  private subjectSubscription?: Subscription;

  constructor() {
    // Set up effect to log signal changes
    effect(() => {
      console.log('Signal counter changed:', this.counterSignal());
    });

    // Set up effect to log theme changes
    effect(() => {
      console.log('Signal theme changed:', this.themeSignal());
    });
  }

  // Signal methods
  incrementSignal() {
    this.counterSignal.update(value => value + 1);
  }

  decrementSignal() {
    this.counterSignal.update(value => value - 1);
  }

  resetSignal() {
    this.counterSignal.set(0);
  }

  updateUserNameSignal(event: any) {
    this.userNameSignal.set(event.target.value);
  }

  updateThemeSignal(theme: string) {
    this.themeSignal.set(theme);
  }

  // BehaviorSubject methods
  incrementBehaviorSubject() {
    const newValue = this.behaviorSubjectCounterValue + 1;
    this.behaviorSubjectCounterValue = newValue;
    this.behaviorSubjectCounter.next(newValue);
    this.logEvent('counter_increment', newValue, 'BehaviorSubject');
  }

  decrementBehaviorSubject() {
    const newValue = this.behaviorSubjectCounterValue - 1;
    this.behaviorSubjectCounterValue = newValue;
    this.behaviorSubjectCounter.next(newValue);
    this.logEvent('counter_decrement', newValue, 'BehaviorSubject');
  }

  resetBehaviorSubject() {
    this.behaviorSubjectCounterValue = 0;
    this.behaviorSubjectCounter.next(0);
    this.logEvent('counter_reset', 0, 'BehaviorSubject');
  }

  updateBehaviorSubjectUserName(event: any) {
    const newValue = event.target.value;
    this.behaviorSubjectUserNameValue = newValue;
    this.behaviorSubjectUserName.next(newValue);
    this.logEvent('username_update', newValue, 'BehaviorSubject');
  }

  subscribeToBehaviorSubject() {
    if (!this.behaviorSubjectSubscription) {
      this.behaviorSubjectSubscription = this.behaviorSubjectCounter.subscribe(value => {
        this.behaviorSubjectCounterValue = value;
      });
      this.behaviorSubjectSubscription.add(
        this.behaviorSubjectUserName.subscribe(value => {
          this.behaviorSubjectUserNameValue = value;
        })
      );
      this.behaviorSubjectSubscribed = true;
      this.logEvent('subscription', 'Subscribed to BehaviorSubject', 'BehaviorSubject');
    }
  }

  unsubscribeFromBehaviorSubject() {
    if (this.behaviorSubjectSubscription) {
      this.behaviorSubjectSubscription.unsubscribe();
      this.behaviorSubjectSubscription = undefined;
      this.behaviorSubjectSubscribed = false;
      this.logEvent('unsubscription', 'Unsubscribed from BehaviorSubject', 'BehaviorSubject');
    }
  }

  // Subject methods
  emitSubjectEvent(eventType: string) {
    if (eventType.trim()) {
      this.subject.next(eventType);
      this.logEvent('event_emitted', eventType, 'Subject');
    }
  }

  subscribeToSubject() {
    if (!this.subjectSubscription) {
      this.subjectSubscription = this.subject.subscribe(eventType => {
        this.logEvent('event_received', eventType, 'Subject');
      });
      this.subjectSubscribed = true;
      this.logEvent('subscription', 'Subscribed to Subject', 'Subject');
    }
  }

  unsubscribeFromSubject() {
    if (this.subjectSubscription) {
      this.subjectSubscription.unsubscribe();
      this.subjectSubscription = undefined;
      this.subjectSubscribed = false;
      this.logEvent('unsubscription', 'Unsubscribed from Subject', 'Subject');
    }
  }

  // Utility methods
  private logEvent(type: string, value: any, source: string) {
    const event: EventLog = {
      timestamp: new Date(),
      type,
      value,
      source
    };

    if (source === 'BehaviorSubject') {
      this.behaviorSubjectEvents.unshift(event);
      if (this.behaviorSubjectEvents.length > 10) {
        this.behaviorSubjectEvents.pop();
      }
    } else if (source === 'Subject') {
      this.subjectEvents.unshift(event);
      if (this.subjectEvents.length > 10) {
        this.subjectEvents.pop();
      }
    }
  }

  ngOnDestroy() {
    this.behaviorSubjectSubscription?.unsubscribe();
    this.subjectSubscription?.unsubscribe();
  }
} 