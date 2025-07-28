import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule
  ],
  template: `
    <mat-toolbar class="header-toolbar">
      <div class="header-content">
        <!-- Logo and Brand -->
        <div class="brand-section">
          <a routerLink="/" class="brand-link">
            <mat-icon class="brand-icon">quiz</mat-icon>
            <span class="brand-text">Survey Builder</span>
          </a>
        </div>

        <!-- Navigation Links -->
        <nav class="nav-links">
          <a 
            mat-button 
            routerLink="/admin" 
            routerLinkActive="active-link"
            class="nav-link">
            <mat-icon>dashboard</mat-icon>
            Dashboard
          </a>
          
          <a 
            mat-button 
            routerLink="/survey-builder" 
            routerLinkActive="active-link"
            class="nav-link">
            <mat-icon>edit</mat-icon>
            Builder
          </a>
          
          <a 
            mat-button 
            routerLink="/survey-editor" 
            routerLinkActive="active-link"
            class="nav-link">
            <mat-icon>preview</mat-icon>
            Editor
          </a>
        </nav>

        <!-- Right Side Actions -->
        <div class="header-actions">
          <!-- Notifications -->
          <button 
            mat-icon-button 
            [matMenuTriggerFor]="notificationsMenu"
            class="notifications-btn">
            <mat-icon [matBadge]="notificationCount()" matBadgeColor="warn">
              notifications
            </mat-icon>
          </button>

          <!-- User Menu -->
          <button 
            mat-icon-button 
            [matMenuTriggerFor]="userMenu"
            class="user-menu-btn">
            <mat-icon>account_circle</mat-icon>
          </button>
        </div>
      </div>
    </mat-toolbar>

    <!-- Simple Notifications Menu -->
    <mat-menu #notificationsMenu="matMenu">
      <div class="menu-header">
        <h3>Notifications</h3>
      </div>
      <div class="menu-content">
        <div class="notification-item" *ngFor="let notification of notifications()">
          <mat-icon>{{ notification.icon }}</mat-icon>
          <div class="notification-text">
            <div class="notification-title">{{ notification.title }}</div>
            <div class="notification-time">{{ notification.time }}</div>
          </div>
        </div>
      </div>
    </mat-menu>

    <!-- Simple User Menu -->
    <mat-menu #userMenu="matMenu">
      <button mat-menu-item routerLink="/admin/profile">
        <mat-icon>person</mat-icon>
        <span>Profile</span>
      </button>
      <button mat-menu-item routerLink="/admin/settings">
        <mat-icon>settings</mat-icon>
        <span>Settings</span>
      </button>
      <button mat-menu-item (click)="logout()">
        <mat-icon>logout</mat-icon>
        <span>Logout</span>
      </button>
    </mat-menu>
  `,
  styles: [`
    .header-toolbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      background: var(--mat-sys-surface);
      border-bottom: 1px solid var(--mat-sys-outline);
      height: 64px;
    }

    .header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 16px;
      height: 100%;
    }

    .brand-section {
      display: flex;
      align-items: center;
    }

    .brand-link {
      display: flex;
      align-items: center;
      gap: 8px;
      text-decoration: none;
      color: inherit;
      font-weight: 600;
      font-size: 1.2rem;
    }

    .brand-icon {
      color: #1976d2;
    }

    .brand-text {
      @media (max-width: 768px) {
        display: none;
      }
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 4px;
      color: var(--mat-sys-on-surface);
      text-decoration: none;
      padding: 8px 16px;
      border-radius: 8px;
      transition: all 0.2s ease;
    }

    .nav-link:hover {
      background: var(--mat-sys-surface-container);
    }

    .nav-link.active-link {
      background: #1976d2;
      color: white;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .notifications-btn,
    .user-menu-btn {
      color: var(--mat-sys-on-surface);
    }

    .notifications-btn:hover,
    .user-menu-btn:hover {
      background: var(--mat-sys-surface-container);
    }

    .menu-header {
      padding: 16px;
      border-bottom: 1px solid var(--mat-sys-outline);
    }

    .menu-header h3 {
      margin: 0;
      font-size: 1rem;
      font-weight: 600;
    }

    .menu-content {
      max-height: 300px;
      overflow-y: auto;
    }

    .notification-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      border-bottom: 1px solid var(--mat-sys-outline);
    }

    .notification-item:last-child {
      border-bottom: none;
    }

    .notification-text {
      flex: 1;
    }

    .notification-title {
      font-weight: 500;
      font-size: 0.9rem;
      margin-bottom: 2px;
    }

    .notification-time {
      font-size: 0.8rem;
      color: var(--mat-sys-on-surface-variant);
    }

    @media (max-width: 768px) {
      .nav-links {
        display: none;
      }
      
      .header-content {
        padding: 0 8px;
      }
    }
  `]
})
export class HeaderComponent {
  private readonly router = inject(Router);

  // Signals
  readonly notificationCount = signal(3);

  // Mock notifications data
  readonly notifications = signal([
    {
      icon: 'notifications',
      title: 'New Survey Response',
      time: '2 minutes ago'
    },
    {
      icon: 'warning',
      title: 'Survey Expiring Soon',
      time: '1 hour ago'
    },
    {
      icon: 'info',
      title: 'System Update',
      time: '2 hours ago'
    }
  ]);

  logout(): void {
    console.log('Logout');
    this.router.navigate(['/admin']);
  }
} 