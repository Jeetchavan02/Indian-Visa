export interface VisaCategory {
  id: string;
  name: string;
  icon: string;
  shortDescription: string;
  description: string;
  eligibility: string[];
  documentsRequired: string[];
  validity: string;
  processingTime: string;
  fee: string;
  importantNotes: string[];
  maxStay: string;
  entries: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface Advisory {
  id: string;
  category: string;
  title: string;
  content: string;
  severity: 'info' | 'warning' | 'caution';
}

export interface SearchResult {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  href: string;
}

export interface ApplicationDraft {
  step: number;
  visaType: string;
  fullName: string;
  dateOfBirth: string;
  nationality: string;
  passportNumber: string;
  email: string;
  phone: string;
  purposeOfVisit: string;
  intendedArrivalDate: string;
  intendedDuration: string;
  portOfArrival: string;
}

export interface DemoApplication {
  id: string;
  name: string;
  visaType: string;
  status: 'submitted' | 'review' | 'processing' | 'decision';
  submittedDate: string;
  lastUpdated: string;
}

export type Language =
  | 'en'
  | 'hi'
  | 'mr'
  | 'ta'
  | 'te'
  | 'bn'
  | 'gu'
  | 'kn'
  | 'ml'
  | 'pa';

export interface Translation {
  [key: string]: string;
}

export interface AccessibilityState {
  fontSize: number;
  highContrast: boolean;
  reducedMotion: boolean;
}

export interface VisaFinderAnswers {
  purpose: string;
  duration: string;
  applicant: string;
  document: string;
}
