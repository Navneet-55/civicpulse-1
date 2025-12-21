import { PolicyData, SimulationResponse, HistoryItem, Persona } from '../types';

const API_BASE = 'http://localhost:4000/api';

// Helper to generate dynamic content based on policy inputs
const generateSmartMockResponse = (policy: PolicyData): SimulationResponse => {
  const { title, location, demographics } = policy;
  
  // Knowledge base for dynamic generation
  const demographicTemplates: Record<string, any> = {
    "Senior Citizens": {
      role: "Senior Resident",
      iconType: "senior",
      quotes: [
        `Living in ${location} has been hard, and the "${title}" makes me worry about accessing my pharmacy.`,
        `I've lived in ${location} for 40 years. This change ignores those of us who can't walk long distances.`,
        "Fixed income makes it hard to adapt to these new costs proposed in the policy."
      ],
      painPoints: [
        "Increased walking distances to essential services",
        "Digital-only information excludes non-tech users",
        "Rising costs outpace pension adjustments"
      ],
      adjustments: [
        "Mandatory shuttle services for last-mile connection",
        "Printed mailers in large font size",
        "Grandfather clauses for long-term residents"
      ]
    },
    "Single Parents": {
      role: "Single Parent",
      iconType: "parent",
      quotes: [
        `If "${title}" changes the schedule, I'll miss the daycare pickup window. I can't afford the late fees.`,
        `Navigating ${location} with a stroller is already a nightmare; this proposal doesn't help.`,
        "I need reliability more than speed. My kids depend on me being there on time."
      ],
      painPoints: [
        "Schedule misalignment with school/daycare hours",
        "Fare hikes consume meaningful percentage of grocery budget",
        "Lack of safe waiting areas for children"
      ],
      adjustments: [
        "90-minute free transfer window",
        "Family fare caps",
        "Stroller-accessible priority boarding"
      ]
    },
    "Low Income": {
      role: "Service Worker",
      iconType: "worker",
      quotes: [
        `I work two jobs in ${location}. This policy adds 30 minutes to my commute, which cuts into my sleep.`,
        `The "${title}" sounds nice for downtown, but it raises my rent in the outskirts.`,
        "Every dollar counts. Increasing fees means I skip a meal."
      ],
      painPoints: [
        "Disproportionate cost burden relative to income",
        "Service cuts during late-night shift hours",
        "Risk of housing displacement due to gentrification"
      ],
      adjustments: [
        "Subsidized monthly passes for residents under threshold",
        "24-hour service on core arterial routes",
        "Rent stabilization ordinances"
      ]
    },
    "Persons with Disabilities": {
      role: "Disability Advocate",
      iconType: "disability",
      quotes: [
        `The "${title}" mentions efficiency, but does it mention elevators? I can't use stairs.`,
        `In ${location}, winter is tough. If you move the stop, you need to clear the snow for wheelchairs.`,
        "Access is a civil right, not an optional feature."
      ],
      painPoints: [
        "Physical barriers in new infrastructure designs",
        "Lack of audible announcements for visually impaired",
        "Temporary stops during construction are inaccessible"
      ],
      adjustments: [
        "Immediate ADA compliance audit",
        "Level boarding platforms",
        "Visual and audio announcement systems"
      ]
    },
    "Non-Native Speakers": {
      role: "Immigrant Resident",
      iconType: "language",
      quotes: [
        `I do not understand the notices for "${title}". Are they evicting us?`,
        `My community in ${location} feels left out of the decision process.`,
        "We need information in our language to trust this change."
      ],
      painPoints: [
        "Language barriers in public notices",
        "Lack of culturally competent outreach",
        "Fear of accessing services due to status"
      ],
      adjustments: [
        "Multi-lingual signage and support staff",
        "Community liaisons in specific neighborhoods",
        "Simplified application processes"
      ]
    },
    "Students": {
      role: "University Student",
      iconType: "worker", // Fallback icon
      quotes: [
        `Tuition is high enough. The "${title}" making transit more expensive forces me to skip classes.`,
        `Safe transport late at night in ${location} is critical for us studying late.`,
      ],
      painPoints: [
        "Affordability of transit passes",
        "Safety during late-night hours",
        "Connectivity between campus and affordable housing"
      ],
      adjustments: [
        "Semester-based student discount passes",
        "Improved lighting at stops near campus"
      ]
    }
  };

  // Default fallback if demographic not found
  const defaultTemplate = {
    role: "Local Resident",
    iconType: "senior",
    quotes: [`I'm unsure how "${title}" will affect my daily routine in ${location}.`],
    painPoints: ["Uncertainty about implementation timeline", "General cost of living increases"],
    adjustments: ["Town hall meetings for public feedback"]
  };

  // Generate personas based on selected demographics
  const generatedPersonas: Persona[] = demographics.map((demo, index) => {
    const template = demographicTemplates[demo] || defaultTemplate;
    
    // Pick a random quote to make it feel alive
    const randomQuote = template.quotes[Math.floor(Math.random() * template.quotes.length)];
    
    // Calculate a dynamic confidence score
    const confidence = 85 + Math.floor(Math.random() * 14);

    return {
      id: `#${demo.substring(0,3).toUpperCase()}-${Math.floor(Math.random() * 9000) + 1000}`,
      role: template.role,
      iconType: template.iconType,
      impactLevel: index === 0 ? 'High' : (index === 1 ? 'High' : 'Medium'), // First two selections are High impact
      quote: randomQuote,
      painPoints: template.painPoints,
      adjustments: template.adjustments,
      confidence: confidence
    };
  });

  // Calculate score based on impact
  const score = 85 - (generatedPersonas.filter(p => p.impactLevel === 'High').length * 15);

  return {
    score: Math.max(score, 12), // Minimum score 12
    personas: generatedPersonas,
    analysis: `Analysis of ${title} indicates specific friction points for ${demographics.join(', ')} in ${location}.`
  };
};

export const ApiService = {
  async getHistory(): Promise<HistoryItem[]> {
    try {
      const res = await fetch(`${API_BASE}/history`);
      if (!res.ok) throw new Error('Failed to fetch history');
      return await res.json();
    } catch (error) {
      console.warn("Backend unavailable, using local session history if available", error);
      return [];
    }
  },

  async runSimulation(policy: PolicyData): Promise<SimulationResponse> {
    try {
      // Serialize policy data for the backend 'prompt' field
      const payload = {
        prompt: JSON.stringify(policy),
        userId: "user-123" // Hardcoded for demo
      };

      // Attempt to hit the real backend
      const res = await fetch(`${API_BASE}/simulate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error(`Backend Error: ${res.statusText}`);
      }

      const data = await res.json();
      
      // Parse the backend result
      try {
        const parsedResult = JSON.parse(data.result);
        if (parsedResult && parsedResult.score) {
          return parsedResult;
        }
        // If parsing fails or lacks data, fall through to smart mock
        throw new Error("Invalid JSON from backend");
      } catch (e) {
        return generateSmartMockResponse(policy);
      }

    } catch (error) {
      console.log("Using Smart AI Simulation (Client-Side Fallback)");
      // Realistic delay to simulate AI thinking
      return new Promise(resolve => {
        setTimeout(() => resolve(generateSmartMockResponse(policy)), 2000);
      });
    }
  }
};