import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    loadComponent: () => import('./shared/ui/welcome/welcome.component').then(m => m.WelcomeComponent)
  },
  {
    path: 'learn',
    loadComponent: () => import('./shared/ui/educational/educational-nav.component').then(m => m.EducationalNavComponent),
    children: [
      {
        path: 'lazy-loading',
        loadComponent: () => import('./shared/ui/educational/lazy-loading-demo.component').then(m => m.LazyLoadingDemoComponent)
      },
      {
        path: 'reactive-forms',
        loadComponent: () => import('./shared/ui/educational/reactive-forms-demo.component').then(m => m.ReactiveFormsDemoComponent)
      },
      {
        path: 'subjects',
        loadComponent: () => import('./shared/ui/educational/subjects-demo.component').then(m => m.SubjectsDemoComponent)
      },
      {
        path: 'signals',
        loadComponent: () => import('./shared/ui/educational/signals-demo.component').then(m => m.SignalsDemoComponent)
      },
      {
        path: 'control-flow',
        loadComponent: () => import('./shared/ui/educational/control-flow-demo.component').then(m => m.ControlFlowDemoComponent)
      },
      {
        path: 'standalone',
        loadComponent: () => import('./shared/ui/educational/standalone-demo.component').then(m => m.StandaloneDemoComponent)
      },
      {
        path: '',
        redirectTo: 'lazy-loading',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'survey-builder',
    loadChildren: () => import('./features/survey-builder/survey-builder.routes').then(m => m.SURVEY_BUILDER_ROUTES)
  },
  {
    path: 'survey-runner',
    loadChildren: () => import('./features/survey-runner/survey-runner.routes').then(m => m.SURVEY_RUNNER_ROUTES)
  },
  {
    path: 'analytics',
    loadChildren: () => import('./features/analytics/analytics.routes').then(m => m.ANALYTICS_ROUTES)
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES)
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
