import type { Advisory, SearchResult, DemoApplication } from '../types';

export const advisories: Advisory[] = [
  {
    id: 'adv-1',
    category: 'General Advisory',
    title: 'Verify all information before submission',
    content:
      'Ensure all details entered in your application match your travel documents exactly. Errors may cause delays or rejection. This is demo information.',
    severity: 'info',
  },
  {
    id: 'adv-2',
    category: 'Application Safety',
    title: 'Beware of unofficial agents',
    content:
      'Apply only through official channels. Unauthorised agents may charge excessive fees or submit incorrect applications. This is demo information.',
    severity: 'warning',
  },
  {
    id: 'adv-3',
    category: 'Travel Information',
    title: 'Passport validity requirement',
    content:
      'Your passport must have a minimum of 6 months validity beyond your intended stay in India. Ensure you check this before applying. This is demo information.',
    severity: 'info',
  },
  {
    id: 'adv-4',
    category: 'Document Requirements',
    title: 'Original documents may be required',
    content:
      'While applications are submitted online, you may be required to present original documents at the port of entry or interview. This is demo information.',
    severity: 'caution',
  },
  {
    id: 'adv-5',
    category: 'General Advisory',
    title: 'This is an academic demo prototype',
    content:
      'This portal is a redesign prototype for HMI academic evaluation. No real visa applications, payments, or government processes are handled here.',
    severity: 'warning',
  },
];

export const searchResults: SearchResult[] = [
  {
    id: 'sr-1',
    title: 'Tourist Visa Requirements',
    excerpt:
      'Documents and eligibility criteria for tourist visa applications including passport validity, photographs, and financial proof.',
    category: 'Visa Requirements',
    href: '/visa/tourist',
  },
  {
    id: 'sr-2',
    title: 'Business Visa Requirements',
    excerpt:
      'Requirements for business visa including invitation letter, company documents, and financial proof.',
    category: 'Visa Requirements',
    href: '/visa/business',
  },
  {
    id: 'sr-3',
    title: 'Visa Fees — Demo Information',
    excerpt:
      'Demo fee information for various visa categories. Actual fees vary by nationality and visa type. Always verify from official sources.',
    category: 'Visa Fees',
    href: '/visa-types',
  },
  {
    id: 'sr-4',
    title: 'Processing Times — Demo Information',
    excerpt:
      'Demo processing times range from 3 to 15 business days depending on visa category and nationality.',
    category: 'Processing Information',
    href: '/visa-types',
  },
  {
    id: 'sr-5',
    title: 'Documents Required — General Guide',
    excerpt:
      'Common documents required across all visa types: valid passport, photographs, application form, financial proof.',
    category: 'Documents Required',
    href: '/visa-types',
  },
  {
    id: 'sr-6',
    title: 'Track Application Status',
    excerpt:
      'Use your Application ID and Date of Birth to check the current status of your visa application.',
    category: 'Application Status',
    href: '/track',
  },
  {
    id: 'sr-7',
    title: 'Visa Types Overview',
    excerpt:
      'Explore Tourist, Business, Medical, Student, Employment, and other visa categories available for travel to India.',
    category: 'Visa Types',
    href: '/visa-types',
  },
  {
    id: 'sr-8',
    title: 'Medical Visa Requirements',
    excerpt:
      'Requirements for medical visa including hospital letter, medical documentation, and financial proof.',
    category: 'Visa Requirements',
    href: '/visa/medical',
  },
  {
    id: 'sr-9',
    title: 'Student Visa Requirements',
    excerpt:
      'Requirements for student visa including admission letter from a recognised institution and financial proof.',
    category: 'Visa Requirements',
    href: '/visa/student',
  },
  {
    id: 'sr-10',
    title: 'How to Apply — Step by Step',
    excerpt:
      'Learn the 7-step application process: Visa Selection, Eligibility, Applicant Details, Travel Details, Documents, Review, and Confirmation.',
    category: 'Application Status',
    href: '/apply',
  },
];

export const demoApplications: DemoApplication[] = [
  {
    id: 'IVO-2024-001',
    name: 'Demo Applicant A',
    visaType: 'Tourist Visa',
    status: 'processing',
    submittedDate: '2024-11-01',
    lastUpdated: '2024-11-05',
  },
  {
    id: 'IVO-2024-002',
    name: 'Demo Applicant B',
    visaType: 'Business Visa',
    status: 'review',
    submittedDate: '2024-11-03',
    lastUpdated: '2024-11-04',
  },
  {
    id: 'IVO-2024-003',
    name: 'Demo Applicant C',
    visaType: 'Medical Visa',
    status: 'decision',
    submittedDate: '2024-10-28',
    lastUpdated: '2024-11-06',
  },
  {
    id: 'IVO-2024-004',
    name: 'Demo Applicant D',
    visaType: 'Student Visa',
    status: 'submitted',
    submittedDate: '2024-11-06',
    lastUpdated: '2024-11-06',
  },
];
