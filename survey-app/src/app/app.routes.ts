import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/admin',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.routes')
      .then(m => m.ADMIN_ROUTES),
    title: 'Admin Dashboard'
  },
  {
    path: 'survey-builder',
    loadChildren: () => import('./features/survey-builder/survey-builder.routes')
      .then(m => m.SURVEY_BUILDER_ROUTES),
    title: 'Survey Builder'
  },
  {
    path: 'survey-runner',
    loadChildren: () => import('./features/survey-runner/survey-runner.routes')
      .then(m => m.SURVEY_RUNNER_ROUTES),
    title: 'Survey Runner'
  },
  {
    path: 'analytics',
    loadChildren: () => import('./features/analytics/analytics.routes')
      .then(m => m.ANALYTICS_ROUTES),
    title: 'Analytics'
  },
  {
    path: 'embed/:id',
    loadChildren: () => import('./features/survey-runner/embed.routes')
      .then(m => m.EMBED_ROUTES),
    title: 'Embedded Survey'
  },
  {
    path: '**',
    redirectTo: '/admin'
  }
];
