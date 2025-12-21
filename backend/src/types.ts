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

export interface PolicyData {
  title: string;
  description: string;
  location: string;
  demographics: string[];
  fileName?: string;
  fileSize?: string;
  date: string;
}

export interface SimulationResponse {
  score: number;
  personas: Persona[];
  analysis?: string;
}

export interface HistoryItem {
  id: string;
  prompt: string; // JSON string of PolicyData
  result: string; // JSON string of SimulationResponse
  createdAt: string;
  userId?: string;
}

export interface SimulateRequest {
  prompt: string; // JSON string of PolicyData
  userId?: string;
}

export interface SimulateResponse {
  result: string; // JSON string of SimulationResponse
}


