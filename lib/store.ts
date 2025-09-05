import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, EmergencyGuide, EmergencyContact, ChecklistItem, SessionLog } from './types';
import { emergencyGuides, emergencyContacts } from './data';

interface AppState {
  // User state
  user: User | null;
  isAuthenticated: boolean;
  
  // Content state
  guides: EmergencyGuide[];
  contacts: EmergencyContact[];
  checklists: Record<string, ChecklistItem[]>;
  
  // UI state
  activeTab: 'dashboard' | 'guides' | 'contacts' | 'education';
  searchQuery: string;
  selectedCategory: string;
  isLoading: boolean;
  error: string | null;
  
  // Premium state
  purchasedPacks: string[];
  
  // Session state
  sessionLogs: SessionLog[];
  
  // Actions
  setUser: (user: User | null) => void;
  setActiveTab: (tab: 'dashboard' | 'guides' | 'contacts' | 'education') => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Guide actions
  getGuideById: (id: string) => EmergencyGuide | undefined;
  getGuidesByCategory: (category: string) => EmergencyGuide[];
  searchGuides: (query: string) => EmergencyGuide[];
  
  // Contact actions
  getContactById: (id: string) => EmergencyContact | undefined;
  getContactsByCategory: (category: string) => EmergencyContact[];
  getContactsBySituation: (situationType: string) => EmergencyContact[];
  searchContacts: (query: string) => EmergencyContact[];
  
  // Checklist actions
  getChecklistForGuide: (guideId: string) => ChecklistItem[];
  toggleChecklistItem: (guideId: string, itemId: string) => void;
  resetChecklist: (guideId: string) => void;
  
  // Premium actions
  purchasePack: (packId: string) => void;
  isPremiumUnlocked: (contentId: string) => boolean;
  
  // Session actions
  logAction: (action: string, guideId?: string) => void;
  getSessionStats: () => { totalActions: number; guidesAccessed: number; contactsCalled: number };
  
  // Initialization
  initialize: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      guides: emergencyGuides,
      contacts: emergencyContacts,
      checklists: {},
      activeTab: 'dashboard',
      searchQuery: '',
      selectedCategory: '',
      isLoading: false,
      error: null,
      purchasedPacks: [],
      sessionLogs: [],

      // Basic setters
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setActiveTab: (activeTab) => set({ activeTab }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),

      // Guide actions
      getGuideById: (id) => {
        const { guides } = get();
        return guides.find(guide => guide.guideId === id);
      },

      getGuidesByCategory: (category) => {
        const { guides } = get();
        return guides.filter(guide => guide.category === category);
      },

      searchGuides: (query) => {
        const { guides } = get();
        if (!query.trim()) return guides;
        
        const normalizedQuery = query.toLowerCase();
        return guides.filter(guide => 
          guide.title.toLowerCase().includes(normalizedQuery) ||
          guide.category.toLowerCase().includes(normalizedQuery) ||
          guide.keywords.some(keyword => keyword.toLowerCase().includes(normalizedQuery)) ||
          guide.contentJson.summary.toLowerCase().includes(normalizedQuery)
        );
      },

      // Contact actions
      getContactById: (id) => {
        const { contacts } = get();
        return contacts.find(contact => contact.contactId === id);
      },

      getContactsByCategory: (category) => {
        const { contacts } = get();
        return contacts.filter(contact => contact.category === category);
      },

      getContactsBySituation: (situationType) => {
        const { contacts } = get();
        return contacts.filter(contact => contact.situationType === situationType);
      },

      searchContacts: (query) => {
        const { contacts } = get();
        if (!query.trim()) return contacts;
        
        const normalizedQuery = query.toLowerCase();
        return contacts.filter(contact => 
          contact.name.toLowerCase().includes(normalizedQuery) ||
          contact.category.toLowerCase().includes(normalizedQuery) ||
          contact.situationType.toLowerCase().includes(normalizedQuery) ||
          contact.description.toLowerCase().includes(normalizedQuery)
        );
      },

      // Checklist actions
      getChecklistForGuide: (guideId) => {
        const { checklists, guides } = get();
        
        if (checklists[guideId]) {
          return checklists[guideId];
        }
        
        // Create checklist from guide data
        const guide = guides.find(g => g.guideId === guideId);
        if (!guide) return [];
        
        const checklistItems: ChecklistItem[] = guide.contentJson.checklist.map((item, index) => ({
          itemId: `${guideId}-${index}`,
          guideId,
          stepText: item,
          completed: false,
          order: index
        }));
        
        set(state => ({
          checklists: {
            ...state.checklists,
            [guideId]: checklistItems
          }
        }));
        
        return checklistItems;
      },

      toggleChecklistItem: (guideId, itemId) => {
        set(state => {
          const checklist = state.checklists[guideId] || [];
          const updatedChecklist = checklist.map(item =>
            item.itemId === itemId ? { ...item, completed: !item.completed } : item
          );
          
          return {
            checklists: {
              ...state.checklists,
              [guideId]: updatedChecklist
            }
          };
        });
        
        // Log the action
        get().logAction('checklist_item_toggled', guideId);
      },

      resetChecklist: (guideId) => {
        set(state => {
          const checklist = state.checklists[guideId] || [];
          const resetChecklist = checklist.map(item => ({ ...item, completed: false }));
          
          return {
            checklists: {
              ...state.checklists,
              [guideId]: resetChecklist
            }
          };
        });
        
        get().logAction('checklist_reset', guideId);
      },

      // Premium actions
      purchasePack: (packId) => {
        set(state => ({
          purchasedPacks: [...state.purchasedPacks, packId]
        }));
        
        get().logAction('pack_purchased', packId);
      },

      isPremiumUnlocked: (contentId) => {
        const { purchasedPacks } = get();
        return purchasedPacks.includes(contentId) || purchasedPacks.includes('premium_all');
      },

      // Session actions
      logAction: (action, guideId) => {
        const sessionLog: SessionLog = {
          logId: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          userId: get().user?.userId || 'anonymous',
          timestamp: new Date(),
          action,
          guideId
        };
        
        set(state => ({
          sessionLogs: [...state.sessionLogs, sessionLog]
        }));
      },

      getSessionStats: () => {
        const { sessionLogs } = get();
        
        const totalActions = sessionLogs.length;
        const guidesAccessed = new Set(
          sessionLogs
            .filter(log => log.action === 'guide_viewed' && log.guideId)
            .map(log => log.guideId)
        ).size;
        const contactsCalled = sessionLogs.filter(log => log.action === 'contact_called').length;
        
        return { totalActions, guidesAccessed, contactsCalled };
      },

      // Initialization
      initialize: () => {
        // Initialize checklists for all guides
        const { guides } = get();
        const initialChecklists: Record<string, ChecklistItem[]> = {};
        
        guides.forEach(guide => {
          initialChecklists[guide.guideId] = guide.contentJson.checklist.map((item, index) => ({
            itemId: `${guide.guideId}-${index}`,
            guideId: guide.guideId,
            stepText: item,
            completed: false,
            order: index
          }));
        });
        
        set({ checklists: initialChecklists });
        
        // Log app initialization
        get().logAction('app_initialized');
      }
    }),
    {
      name: 'rights-guardian-store',
      partialize: (state) => ({
        user: state.user,
        purchasedPacks: state.purchasedPacks,
        checklists: state.checklists,
        sessionLogs: state.sessionLogs.slice(-100) // Keep only last 100 logs
      })
    }
  )
);

// Selectors for common use cases
export const useUser = () => useAppStore(state => state.user);
export const useIsAuthenticated = () => useAppStore(state => state.isAuthenticated);
export const useActiveTab = () => useAppStore(state => state.activeTab);
export const useSearchQuery = () => useAppStore(state => state.searchQuery);
export const useSelectedCategory = () => useAppStore(state => state.selectedCategory);
export const useIsLoading = () => useAppStore(state => state.isLoading);
export const useError = () => useAppStore(state => state.error);

// Computed selectors
export const useFilteredGuides = () => useAppStore(state => {
  const { guides, searchQuery, selectedCategory } = state;
  let filtered = guides;
  
  if (selectedCategory) {
    filtered = filtered.filter(guide => guide.category === selectedCategory);
  }
  
  if (searchQuery) {
    filtered = state.searchGuides(searchQuery);
  }
  
  return filtered;
});

export const useFilteredContacts = () => useAppStore(state => {
  const { contacts, searchQuery, selectedCategory } = state;
  let filtered = contacts;
  
  if (selectedCategory) {
    filtered = filtered.filter(contact => contact.category === selectedCategory);
  }
  
  if (searchQuery) {
    filtered = state.searchContacts(searchQuery);
  }
  
  return filtered;
});

export const useSessionStats = () => useAppStore(state => state.getSessionStats());
