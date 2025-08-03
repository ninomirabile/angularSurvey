import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatChipsModule,
    MatSlideToggleModule
  ],
  template: `
    <mat-toolbar class="header-toolbar">
      <div class="toolbar-content">
        <!-- Logo and Title -->
        <div class="logo-section" routerLink="/welcome" style="cursor: pointer;">
          <mat-icon class="logo-icon">quiz</mat-icon>
          <span class="app-title">Angular 20 Survey Builder</span>
          <mat-chip color="primary" size="small">Educational</mat-chip>
        </div>

        <!-- Navigation Menu -->
        <nav class="nav-menu">
          <a mat-button routerLink="/survey-builder" routerLinkActive="active">
            <mat-icon>edit</mat-icon>
            Survey Builder
          </a>
          <a mat-button routerLink="/survey-runner" routerLinkActive="active">
            <mat-icon>play_arrow</mat-icon>
            Survey Runner
          </a>
          <a mat-button routerLink="/analytics" routerLinkActive="active">
            <mat-icon>analytics</mat-icon>
            Analytics
          </a>
          <a mat-button routerLink="/admin" routerLinkActive="active">
            <mat-icon>admin_panel_settings</mat-icon>
            Admin
          </a>
        </nav>

        <!-- Right Side Actions -->
        <div class="actions-section">
          <!-- Theme Toggle -->
          <mat-slide-toggle 
            [checked]="isDarkTheme()" 
            (change)="toggleTheme()"
            color="primary"
          >
            <mat-icon>{{ isDarkTheme() ? 'dark_mode' : 'light_mode' }}</mat-icon>
          </mat-slide-toggle>

          <!-- Angular Features Demo -->
          <button mat-icon-button [matMenuTriggerFor]="featuresMenu">
            <mat-icon>code</mat-icon>
          </button>
          <mat-menu #featuresMenu="matMenu">
            <button mat-menu-item (click)="showSignalsDemo()">
              <mat-icon>memory</mat-icon>
              <span>Signals Demo</span>
            </button>
            <button mat-menu-item (click)="showLazyLoadingDemo()">
              <mat-icon>download</mat-icon>
              <span>Lazy Loading</span>
            </button>
            <button mat-menu-item (click)="showControlFlowDemo()">
              <mat-icon>code</mat-icon>
              <span>Control Flow</span>
            </button>
            <button mat-menu-item (click)="showStandaloneDemo()">
              <mat-icon>extension</mat-icon>
              <span>Standalone Components</span>
            </button>
          </mat-menu>

          <!-- Performance Info -->
          <button mat-icon-button (click)="showPerformanceInfo()">
            <mat-icon>speed</mat-icon>
          </button>
        </div>
      </div>
    </mat-toolbar>
  `,
  styles: [`
    .header-toolbar {
      background-color: var(--toolbar-background);
      border-bottom: 1px solid var(--border-color);
      box-shadow: 0 2px 4px var(--shadow-color);
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
    }

    .toolbar-content {
      @apply flex items-center justify-between w-full max-w-7xl mx-auto px-4;
    }

    .logo-section {
      @apply flex items-center gap-3;
      transition: opacity 0.2s ease;
    }

    .logo-section:hover {
      opacity: 0.8;
    }

    .logo-icon {
      @apply text-blue-600 text-2xl;
    }

    .app-title {
      @apply text-lg font-semibold;
      color: var(--text-primary);
    }

    .nav-menu {
      @apply flex items-center gap-2;
    }

    .nav-menu a {
      @apply flex items-center gap-2 px-3 py-2 rounded-lg transition-colors;
      color: var(--text-primary);
    }

    .nav-menu a:hover {
      background-color: var(--surface-color);
    }

    .nav-menu a.active {
      background-color: var(--primary-color);
      color: white;
    }

    .learn-button {
      @apply bg-gradient-to-r from-blue-500 to-purple-600 text-white;
    }

    .learn-button:hover {
      @apply from-blue-600 to-purple-700;
    }

    .actions-section {
      @apply flex items-center gap-3;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .nav-menu {
        @apply hidden;
      }
      
      .app-title {
        @apply text-base;
      }
    }
  `]
})
export class HeaderComponent {
  private readonly themeService = inject(ThemeService);
  private readonly router = inject(Router);

  readonly isDarkTheme = computed(() => this.themeService.isDarkMode());

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  showSignalsDemo(): void {
    this.router.navigate(['/learn/signals']);
  }

  showLazyLoadingDemo(): void {
    this.router.navigate(['/learn/lazy-loading']);
  }

  showControlFlowDemo(): void {
    this.router.navigate(['/learn/control-flow']);
  }

  showStandaloneDemo(): void {
    this.router.navigate(['/learn/standalone']);
  }

  showPerformanceInfo(): void {
    const performanceInfo = {
      initialBundle: '126KB',
      lazyChunks: '4 chunks',
      changeDetection: 'OnPush',
      signals: 'Active',
      animations: 'Enabled'
    };
    
    console.log('Performance Information:', performanceInfo);
    alert(`Performance Information:\n\n• Initial Bundle: ${performanceInfo.initialBundle}\n• Lazy Chunks: ${performanceInfo.lazyChunks}\n• Change Detection: ${performanceInfo.changeDetection}\n• Signals: ${performanceInfo.signals}\n• Animations: ${performanceInfo.animations}\n\nCheck the Dev Tools for real-time metrics!`);
  }
} 