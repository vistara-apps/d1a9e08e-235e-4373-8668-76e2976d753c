// App Configuration
export const APP_CONFIG = {
  name: 'RightsGuardian',
  tagline: 'Your pocket guide to instant legal clarity and emergency action',
  version: '1.0.0',
  supportEmail: 'support@rightsguardian.app',
  emergencyNumber: '911',
  crisisNumber: '988'
};

// Pricing Configuration
export const PRICING = {
  emergencyPack: 0.50,
  monthlyUnlimited: 5.00,
  premiumGuideAccess: 1.00
};

// Feature Flags
export const FEATURES = {
  premiumContent: true,
  socialSharing: true,
  offlineMode: false,
  pushNotifications: true,
  locationServices: false
};

// API Endpoints (for future implementation)
export const API_ENDPOINTS = {
  contacts: '/api/contacts',
  guides: '/api/guides',
  education: '/api/education',
  user: '/api/user',
  analytics: '/api/analytics'
};

// Local Storage Keys
export const STORAGE_KEYS = {
  userPreferences: 'rg_user_preferences',
  completedSteps: 'rg_completed_steps',
  purchasedPacks: 'rg_purchased_packs',
  likedSnippets: 'rg_liked_snippets'
};

// Color Palette (matching design system)
export const COLORS = {
  bg: 'hsl(215 25% 95%)',
  error: 'hsl(0 80% 50%)',
  accent: 'hsl(160 70% 45%)',
  border: 'hsl(215 20% 85%)',
  primary: 'hsl(220 80% 50%)',
  surface: 'hsl(215 25% 98%)',
  textPrimary: 'hsl(215 20% 20%)',
  textSecondary: 'hsl(215 20% 40%)'
};

// Animation Durations
export const ANIMATIONS = {
  fast: 150,
  base: 200,
  slow: 400
};
