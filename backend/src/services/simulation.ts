import { PolicyData, SimulationResponse, Persona } from '../types';

// Knowledge base for dynamic generation
const demographicTemplates: Record<string, any> = {
  "Senior Citizens": {
    role: "Senior Resident",
    iconType: "senior",
    quotes: [
      (location: string, title: string) => `Living in ${location} has been hard, and the "${title}" makes me worry about accessing my pharmacy.`,
      (location: string, title: string) => `I've lived in ${location} for 40 years. This change ignores those of us who can't walk long distances.`,
      () => "Fixed income makes it hard to adapt to these new costs proposed in the policy."
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
      (location: string, title: string) => `If "${title}" changes the schedule, I'll miss the daycare pickup window. I can't afford the late fees.`,
      (location: string) => `Navigating ${location} with a stroller is already a nightmare; this proposal doesn't help.`,
      () => "I need reliability more than speed. My kids depend on me being there on time."
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
      (location: string) => `I work two jobs in ${location}. This policy adds 30 minutes to my commute, which cuts into my sleep.`,
      (location: string, title: string) => `The "${title}" sounds nice for downtown, but it raises my rent in the outskirts.`,
      () => "Every dollar counts. Increasing fees means I skip a meal."
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
      (location: string, title: string) => `The "${title}" mentions efficiency, but does it mention elevators? I can't use stairs.`,
      (location: string) => `In ${location}, winter is tough. If you move the stop, you need to clear the snow for wheelchairs.`,
      () => "Access is a civil right, not an optional feature."
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
      (location: string, title: string) => `I do not understand the notices for "${title}". Are they evicting us?`,
      (location: string) => `My community in ${location} feels left out of the decision process.`,
      () => "We need information in our language to trust this change."
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
    iconType: "worker",
    quotes: [
      (location: string, title: string) => `Tuition is high enough. The "${title}" making transit more expensive forces me to skip classes.`,
      (location: string) => `Safe transport late at night in ${location} is critical for us studying late.`
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
  },
  "Veterans": {
    role: "Veteran",
    iconType: "worker",
    quotes: [
      (location: string) => `After serving, I came back to ${location} and now this policy makes it harder to access VA services.`,
      () => "The noise and crowds from this change trigger my PTSD. I need quiet spaces."
    ],
    painPoints: [
      "Access to VA healthcare facilities",
      "Sensory overload in crowded transit",
      "Lack of priority seating recognition"
    ],
    adjustments: [
      "Dedicated quiet hours on certain routes",
      "Priority access to VA-connected routes",
      "Veteran ID recognition for fare discounts"
    ]
  },
  "Small Business Owners": {
    role: "Small Business Owner",
    iconType: "worker",
    quotes: [
      (location: string, title: string) => `The "${title}" will reduce foot traffic to my store in ${location} by closing the nearby stop.`,
      () => "My employees can't afford the extra commute time. They'll quit."
    ],
    painPoints: [
      "Reduced customer accessibility",
      "Employee retention due to commute burden",
      "Parking restrictions affecting deliveries"
    ],
    adjustments: [
      "Business impact mitigation fund",
      "Employee transit subsidy partnerships",
      "Loading zone accommodations"
    ]
  },
  "Renters": {
    role: "Renter",
    iconType: "worker",
    quotes: [
      (location: string) => `Rent in ${location} is already too high. This policy will push it even higher.`,
      () => "I have no say in this. My landlord will just raise rent and blame the policy."
    ],
    painPoints: [
      "Rent increases outpacing income",
      "Lack of tenant protections",
      "Displacement risk"
    ],
    adjustments: [
      "Rent control measures",
      "Tenant relocation assistance",
      "Affordable housing set-asides"
    ]
  },
  "Homeowners": {
    role: "Homeowner",
    iconType: "worker",
    quotes: [
      (location: string) => `My property value in ${location} might go up, but my taxes will too.`,
      () => "I'm worried about construction noise and traffic during implementation."
    ],
    painPoints: [
      "Property tax increases",
      "Construction disruption",
      "Neighborhood character changes"
    ],
    adjustments: [
      "Property tax relief programs",
      "Construction mitigation plans",
      "Community input on design"
    ]
  },
  "Commuters": {
    role: "Daily Commuter",
    iconType: "worker",
    quotes: [
      (location: string) => `My commute from the suburbs to ${location} is already 90 minutes. This makes it worse.`,
      () => "I just want reliable service. Delays cost me my job."
    ],
    painPoints: [
      "Increased commute times",
      "Unreliable service during transitions",
      "Parking availability at transit hubs"
    ],
    adjustments: [
      "Express service during peak hours",
      "Park-and-ride expansion",
      "Real-time delay notifications"
    ]
  }
};

// Default fallback if demographic not found
const defaultTemplate = {
  role: "Local Resident",
  iconType: "senior" as const,
  quotes: [
    (location: string, title: string) => `I'm unsure how "${title}" will affect my daily routine in ${location}.`
  ],
  painPoints: ["Uncertainty about implementation timeline", "General cost of living increases"],
  adjustments: ["Town hall meetings for public feedback"]
};

export function generateSimulationResponse(policy: PolicyData): SimulationResponse {
  const { title, location, demographics } = policy;
  
  // Generate personas based on selected demographics
  const generatedPersonas: Persona[] = demographics.map((demo, index) => {
    const template = demographicTemplates[demo] || defaultTemplate;
    
    // Pick a random quote to make it feel alive
    const quoteFunctions = Array.isArray(template.quotes) ? template.quotes : [template.quotes];
    const randomQuoteFn = quoteFunctions[Math.floor(Math.random() * quoteFunctions.length)];
    const randomQuote = typeof randomQuoteFn === 'function' 
      ? randomQuoteFn(location, title)
      : randomQuoteFn;
    
    // Calculate a dynamic confidence score
    const confidence = 85 + Math.floor(Math.random() * 14);

    return {
      id: `#${demo.substring(0, 3).toUpperCase()}-${Math.floor(Math.random() * 9000) + 1000}`,
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
}

