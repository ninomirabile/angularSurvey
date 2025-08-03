import { Routes } from '@angular/router';
import { SurveySelectorComponent } from './components/survey-selector/survey-selector.component';
import { SurveyDisplayComponent } from './components/survey-display/survey-display.component';

export const SURVEY_RUNNER_ROUTES: Routes = [
  {
    path: '',
    component: SurveySelectorComponent,
    title: 'Survey Runner - Select Survey'
  },
  {
    path: ':surveyId',
    component: SurveyDisplayComponent,
    title: 'Survey Runner - Take Survey'
  }
]; 