import { EmergencyGuide, EmergencyContact, EducationSnippet } from './types';

// Sample Emergency Guides Data
export const emergencyGuides: EmergencyGuide[] = [
  {
    guideId: 'police-encounter',
    title: 'Police Encounter Rights',
    category: 'Citizen Rights',
    isPremium: false,
    keywords: ['police', 'traffic stop', 'search', 'arrest'],
    contentJson: {
      summary: 'Know your rights during police encounters to protect yourself and stay safe.',
      sections: [
        {
          title: 'Your Basic Rights',
          type: 'list',
          content: 'You have the right to remain silent\nYou have the right to refuse searches\nYou have the right to ask if you are free to leave\nYou have the right to an attorney'
        },
        {
          title: 'What to Do',
          type: 'text',
          content: 'Stay calm and keep your hands visible. Be polite and respectful. Do not argue or resist, even if you believe the stop is unfair.'
        },
        {
          title: 'Important Warning',
          type: 'warning',
          content: 'Never run from police or make sudden movements. This can escalate the situation dangerously.'
        }
      ],
      relatedContacts: ['aclu-hotline', 'legal-aid'],
      checklist: [
        'Keep hands visible at all times',
        'State clearly: "I am exercising my right to remain silent"',
        'Ask: "Am I free to leave?"',
        'Do not consent to searches',
        'Remember badge numbers and patrol car numbers',
        'Contact attorney as soon as possible'
      ]
    }
  },
  {
    guideId: 'tenant-rights',
    title: 'Tenant Rights & Eviction',
    category: 'Housing Rights',
    isPremium: true,
    keywords: ['eviction', 'landlord', 'rent', 'housing'],
    contentJson: {
      summary: 'Understand your rights as a tenant and what to do if facing eviction.',
      sections: [
        {
          title: 'Eviction Process',
          type: 'text',
          content: 'Landlords must follow legal procedures to evict tenants. They cannot simply change locks or shut off utilities.'
        },
        {
          title: 'Your Rights',
          type: 'list',
          content: 'Right to proper notice\nRight to contest eviction in court\nRight to habitable living conditions\nRight to privacy'
        }
      ],
      relatedContacts: ['tenant-union', 'housing-authority'],
      checklist: [
        'Document all communications with landlord',
        'Take photos of property conditions',
        'Keep all rent payment records',
        'Respond to eviction notice within required timeframe',
        'Seek legal assistance immediately'
      ]
    }
  },
  {
    guideId: 'workplace-rights',
    title: 'Workplace Rights & Discrimination',
    category: 'Employment Rights',
    isPremium: false,
    keywords: ['workplace', 'discrimination', 'harassment', 'wages'],
    contentJson: {
      summary: 'Know your rights in the workplace and how to address violations.',
      sections: [
        {
          title: 'Protected Rights',
          type: 'list',
          content: 'Right to fair wages\nRight to safe working conditions\nRight to be free from discrimination\nRight to organize'
        },
        {
          title: 'Reporting Violations',
          type: 'text',
          content: 'Document incidents thoroughly and report to HR or appropriate authorities. Keep copies of all communications.'
        }
      ],
      relatedContacts: ['eeoc', 'labor-board'],
      checklist: [
        'Document incidents with dates and witnesses',
        'Review employee handbook policies',
        'File complaint with HR if appropriate',
        'Contact EEOC if discrimination is involved',
        'Consult with employment attorney'
      ]
    }
  }
];

// Sample Emergency Contacts Data
export const emergencyContacts: EmergencyContact[] = [
  {
    contactId: 'aclu-hotline',
    name: 'ACLU Rights Hotline',
    phone: '1-877-6-PROFILE',
    email: 'legal@aclu.org',
    category: 'Legal Aid',
    situationType: 'Civil Rights',
    description: 'Free legal advice for civil rights violations',
    isPremium: false
  },
  {
    contactId: 'legal-aid',
    name: 'Legal Aid Society',
    phone: '1-800-LEGAL-AID',
    email: 'help@legalaid.org',
    category: 'Legal Aid',
    situationType: 'General Legal',
    description: 'Free legal services for low-income individuals',
    isPremium: false
  },
  {
    contactId: 'tenant-union',
    name: 'Tenants Union Hotline',
    phone: '1-800-TENANT-1',
    category: 'Housing',
    situationType: 'Tenant Rights',
    description: 'Support and advocacy for tenant rights',
    isPremium: true
  },
  {
    contactId: 'eeoc',
    name: 'EEOC Complaint Line',
    phone: '1-800-669-4000',
    category: 'Employment',
    situationType: 'Workplace Discrimination',
    description: 'File complaints about workplace discrimination',
    isPremium: false
  },
  {
    contactId: 'domestic-violence',
    name: 'National Domestic Violence Hotline',
    phone: '1-800-799-7233',
    category: 'Safety',
    situationType: 'Domestic Violence',
    description: '24/7 confidential support for domestic violence survivors',
    isPremium: false
  }
];

// Sample Education Snippets Data
export const educationSnippets: EducationSnippet[] = [
  {
    snippetId: 'miranda-rights',
    title: 'What Are Miranda Rights?',
    content: 'Miranda rights must be read when you are in custody AND being interrogated. Simply being arrested doesn\'t automatically trigger Miranda warnings.',
    category: 'Criminal Law',
    shareCount: 1250,
    tags: ['police', 'arrest', 'rights']
  },
  {
    snippetId: 'at-will-employment',
    title: 'At-Will Employment Explained',
    content: 'At-will employment means you can be fired for any reason or no reason at all - BUT not for illegal reasons like discrimination or retaliation.',
    category: 'Employment',
    shareCount: 890,
    tags: ['employment', 'firing', 'discrimination']
  },
  {
    snippetId: 'security-deposit',
    title: 'Security Deposit Rights',
    content: 'Landlords typically have 30 days to return your security deposit. They must provide an itemized list of any deductions for damages beyond normal wear and tear.',
    category: 'Housing',
    shareCount: 2100,
    tags: ['tenant', 'deposit', 'landlord']
  }
];

// Categories for filtering
export const categories = [
  'Citizen Rights',
  'Housing Rights',
  'Employment Rights',
  'Consumer Rights',
  'Family Rights',
  'Student Rights'
];

// Situation types for emergency contacts
export const situationTypes = [
  'Police Encounter',
  'Tenant Rights Violation',
  'Workplace Discrimination',
  'Consumer Fraud',
  'Domestic Violence',
  'Immigration Issues'
];
