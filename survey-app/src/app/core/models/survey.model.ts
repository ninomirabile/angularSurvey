export interface Survey {
  id: string;
  title: string;
  description: string;
  isPublic: boolean;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  settings: SurveySettings;
  questions: Question[];
  responses?: SurveyResponse[];
  version: number;
  authorId?: string;
  tags?: string[];
}

export interface SurveySettings {
  allowAnonymous: boolean;
  requireEmail: boolean;
  maxResponses?: number;
  allowMultipleResponses: boolean;
  showProgressBar: boolean;
  showQuestionNumbers: boolean;
  enableBackButton: boolean;
  autoSave: boolean;
  theme: SurveyTheme;
}

export interface SurveyTheme {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  borderRadius: number;
  fontFamily: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  title: string;
  description?: string;
  required: boolean;
  order: number;
  options?: QuestionOption[];
  validation?: QuestionValidation;
  conditionalLogic?: ConditionalLogic;
}

export type QuestionType = 
  | 'text'
  | 'textarea'
  | 'number'
  | 'email'
  | 'phone'
  | 'date'
  | 'time'
  | 'datetime'
  | 'select'
  | 'multiselect'
  | 'radio'
  | 'checkbox'
  | 'rating'
  | 'scale'
  | 'file'
  | 'location'
  | 'signature';

export interface QuestionOption {
  id: string;
  label: string;
  value: string;
  order: number;
}

export interface QuestionValidation {
  minLength?: number;
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
  pattern?: string;
  customMessage?: string;
}

export interface ConditionalLogic {
  condition: 'equals' | 'not_equals' | 'contains' | 'not_contains' | 'greater_than' | 'less_than';
  questionId: string;
  value: any;
  action: 'show' | 'hide' | 'require' | 'skip';
}

export interface SurveyResponse {
  id: string;
  surveyId: string;
  respondentId?: string;
  email?: string;
  answers: Answer[];
  startedAt: Date;
  completedAt?: Date;
  isComplete: boolean;
  metadata?: ResponseMetadata;
}

export interface Answer {
  questionId: string;
  value: any;
  answeredAt: Date;
}

export interface ResponseMetadata {
  userAgent: string;
  ipAddress?: string;
  referrer?: string;
  sessionId: string;
  timeSpent: number;
}

export interface SurveyTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  survey: Partial<Survey>;
  isPublic: boolean;
  usageCount: number;
  createdAt: Date;
  updatedAt: Date;
} 