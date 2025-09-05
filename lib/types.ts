// User Types
export interface User {
  userId: string; // wallet address
  preferences: UserPreferences;
  purchasedPacks: string[];
}

export interface UserPreferences {
  categories: string[];
  location?: string;
  notifications: boolean;
}

// Emergency Guide Types
export interface EmergencyGuide {
  guideId: string;
  title: string;
  category: string;
  contentJson: GuideContent;
  keywords: string[];
  isPremium: boolean;
}

export interface GuideContent {
  summary: string;
  sections: GuideSection[];
  relatedContacts: string[];
  checklist: string[];
}

export interface GuideSection {
  title: string;
  content: string;
  type: 'text' | 'list' | 'warning' | 'tip';
}

// Emergency Contact Types
export interface EmergencyContact {
  contactId: string;
  name: string;
  phone: string;
  email?: string;
  category: string;
  situationType: string;
  description: string;
  isPremium: boolean;
}

// Checklist Types
export interface ChecklistItem {
  itemId: string;
  guideId: string;
  stepText: string;
  completed: boolean;
  order: number;
}

// Session Log Types
export interface SessionLog {
  logId: string;
  userId: string;
  timestamp: Date;
  action: string;
  guideId?: string;
}

// Education Snippet Types
export interface EducationSnippet {
  snippetId: string;
  title: string;
  content: string;
  category: string;
  shareCount: number;
  tags: string[];
}

// UI Component Types
export interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'interactive';
  onClick?: () => void;
}

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'destructive' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export interface ListItemProps {
  children: React.ReactNode;
  variant?: 'withIcon' | 'withArrow';
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}
