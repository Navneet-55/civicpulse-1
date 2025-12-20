export interface Persona {
  id: string;
  role: string;
  subRole?: string;
  iconType: 'senior' | 'parent' | 'worker' | 'disability' | 'language';
  impactLevel: 'High' | 'Medium' | 'Low';
  quote: string;
  painPoints: string[];
  adjustments: string[];
  confidence: number;
}

export type ViewState = 'dashboard' | 'intake' | 'results' | 'impact';

export interface PolicyData {
  title: string;
  description: string;
  location: string;
  demographics: string[];
  fileName?: string;
  fileSize?: string;
  date: string;
}