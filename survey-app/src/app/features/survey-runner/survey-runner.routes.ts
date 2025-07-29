import { Routes } from '@angular/router';
import { SurveyDisplayComponent } from './components/survey-display/survey-display.component';

export const SURVEY_RUNNER_ROUTES: Routes = [
  {
    path: '',
    component: SurveyDisplayComponent,
    title: 'Survey Runner'
  }
]; 