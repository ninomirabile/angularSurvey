import { Routes } from '@angular/router';
import { DashboardComponent } from './features/admin/components/dashboard.component';
import { SurveyEditorComponent } from './features/survey-builder/components/survey-editor/survey-editor.component';
import { SurveyBuilderComponent } from './features/survey-builder/survey-builder.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/admin',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: DashboardComponent
  },
  {
    path: 'survey-editor',
    component: SurveyEditorComponent
  },
  {
    path: 'survey-builder',
    component: SurveyBuilderComponent
  },
  {
    path: '**',
    redirectTo: '/admin'
  }
];
