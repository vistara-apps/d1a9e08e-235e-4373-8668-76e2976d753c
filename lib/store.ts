import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { EmergencyGuide, EmergencyContact, EducationSnippet, ChecklistItem, User, SessionLog } from './types';
import { emergencyGuides, emergencyContacts, educationSnippets } from './data';

// User preferences and session state
interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  preferences: {
    categories: string[];
    location?: string;
    notifications: boolean;
    theme: 'light' | 'dark' | 'auto';
  };
  purchasedPacks: string[];
  sessionLogs: SessionLog[];
  setUser: (user: User | null) => void;
  updatePreferences: (preferences: Partial<UserState['preferences']>) => void;
  addPurchasedPack: (packId: string) => void;
  logAction: (action: string, guideId?: string) => void;
}

// App content state
interface ContentState {
  guides: EmergencyGuide[];
  contacts: EmergencyContact[];
  snippets: EducationSnippet[];
  checklists: Record<string, ChecklistItem[]>;
  searchQuery: string;
  selectedCategory: string;
  favoriteGuides: string[];
  favoriteContacts: string[];
  recentlyViewed: string[];
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  toggleFavoriteGuide: (guideId: string) => void;
  toggleFavoriteContact: (contactId: string) => void;
  addToRecentlyViewed: (itemId: string) => void;
  updateChecklistItem: (guideId: string, itemId: string, completed: boolean) => void;
  resetChecklist: (guideId: string) => void;
}

// UI state
interface UIState {
  activeTab: 'dashboard' | 'guides' | 'contacts' | 'education';
  isLoading: boolean;
  error: string | null;
  modals: {
    guide: { isOpen: boolean; guideId: string | null };
    contact: { isOpen: boolean; contactId: string | null };
    premium: { isOpen: boolean };
    settings: { isOpen: boolean };
  };
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    timestamp: Date;
  }>;
  setActiveTab: (tab: UIState['activeTab']) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  openModal: (modal: keyof UIState['modals'], id?: string) => void;
  closeModal: (modal: keyof UIState['modals']) => void;
  addNotification: (notification: Omit<UIState['notifications'][0], 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

// Create user store with persistence
export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      preferences: {
        categories: [],
        notifications: true,
        theme: 'auto',
      },
      purchasedPacks: [],
      sessionLogs: [],
      
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      
      updatePreferences: (newPreferences) =>
        set((state) => ({
          preferences: { ...state.preferences, ...newPreferences },
        })),
      
      addPurchasedPack: (packId) =>
        set((state) => ({
          purchasedPacks: [...new Set([...state.purchasedPacks, packId])],
        })),
      
      logAction: (action, guideId) => {
        const log: SessionLog = {
          logId: Math.random().toString(36).substr(2, 9),
          userId: get().user?.userId || 'anonymous',
          timestamp: new Date(),
          action,
          guideId,
        };
        set((state) => ({
          sessionLogs: [log, ...state.sessionLogs.slice(0, 99)], // Keep last 100 logs
        }));
      },
    }),
    {
      name: 'rights-guardian-user',
      partialize: (state) => ({
        user: state.user,
        preferences: state.preferences,
        purchasedPacks: state.purchasedPacks,
      }),
    }
  )
);

// Create content store with persistence for user data
export const useContentStore = create<ContentState>()(
  persist(
    (set, get) => ({
      guides: emergencyGuides,
      contacts: emergencyContacts,
      snippets: educationSnippets,
      checklists: {},
      searchQuery: '',
      selectedCategory: '',
      favoriteGuides: [],
      favoriteContacts: [],
      recentlyViewed: [],
      
      setSearchQuery: (query) => set({ searchQuery: query }),
      
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      
      toggleFavoriteGuide: (guideId) =>
        set((state) => ({
          favoriteGuides: state.favoriteGuides.includes(guideId)
            ? state.favoriteGuides.filter((id) => id !== guideId)
            : [...state.favoriteGuides, guideId],
        })),
      
      toggleFavoriteContact: (contactId) =>
        set((state) => ({
          favoriteContacts: state.favoriteContacts.includes(contactId)
            ? state.favoriteContacts.filter((id) => id !== contactId)
            : [...state.favoriteContacts, contactId],
        })),
      
      addToRecentlyViewed: (itemId) =>
        set((state) => ({
          recentlyViewed: [
            itemId,
            ...state.recentlyViewed.filter((id) => id !== itemId),
          ].slice(0, 10), // Keep last 10 items
        })),
      
      updateChecklistItem: (guideId, itemId, completed) =>
        set((state) => {
          const guide = state.guides.find((g) => g.guideId === guideId);
          if (!guide) return state;
          
          const currentChecklist = state.checklists[guideId] || [];
          const existingItem = currentChecklist.find((item) => item.itemId === itemId);
          
          if (existingItem) {
            return {
              checklists: {
                ...state.checklists,
                [guideId]: currentChecklist.map((item) =>
                  item.itemId === itemId ? { ...item, completed } : item
                ),
              },
            };
          } else {
            // Create new checklist item
            const newItem: ChecklistItem = {
              itemId,
              guideId,
              stepText: guide.contentJson.checklist.find((_, index) => index.toString() === itemId) || '',
              completed,
              order: parseInt(itemId),
            };
            
            return {
              checklists: {
                ...state.checklists,
                [guideId]: [...currentChecklist, newItem],
              },
            };
          }
        }),
      
      resetChecklist: (guideId) =>
        set((state) => ({
          checklists: {
            ...state.checklists,
            [guideId]: [],
          },
        })),
    }),
    {
      name: 'rights-guardian-content',
      partialize: (state) => ({
        favoriteGuides: state.favoriteGuides,
        favoriteContacts: state.favoriteContacts,
        recentlyViewed: state.recentlyViewed,
        checklists: state.checklists,
      }),
    }
  )
);

// Create UI store (not persisted)
export const useUIStore = create<UIState>((set, get) => ({
  activeTab: 'dashboard',
  isLoading: false,
  error: null,
  modals: {
    guide: { isOpen: false, guideId: null },
    contact: { isOpen: false, contactId: null },
    premium: { isOpen: false },
    settings: { isOpen: false },
  },
  notifications: [],
  
  setActiveTab: (tab) => set({ activeTab: tab }),
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  setError: (error) => set({ error }),
  
  openModal: (modal, id) =>
    set((state) => ({
      modals: {
        ...state.modals,
        [modal]: { isOpen: true, ...(id && { [`${modal}Id`]: id }) },
      },
    })),
  
  closeModal: (modal) =>
    set((state) => ({
      modals: {
        ...state.modals,
        [modal]: { isOpen: false, [`${modal}Id`]: null },
      },
    })),
  
  addNotification: (notification) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification = {
      ...notification,
      id,
      timestamp: new Date(),
    };
    
    set((state) => ({
      notifications: [newNotification, ...state.notifications],
    }));
    
    // Auto-remove notification after 5 seconds
    setTimeout(() => {
      get().removeNotification(id);
    }, 5000);
  },
  
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
  
  clearNotifications: () => set({ notifications: [] }),
}));

// Computed selectors
export const useFilteredGuides = () => {
  const { guides, searchQuery, selectedCategory } = useContentStore();
  const { favoriteGuides } = useContentStore();
  
  return guides.filter((guide) => {
    const matchesSearch = !searchQuery || 
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = !selectedCategory || guide.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    // Prioritize favorites
    const aIsFavorite = favoriteGuides.includes(a.guideId);
    const bIsFavorite = favoriteGuides.includes(b.guideId);
    
    if (aIsFavorite && !bIsFavorite) return -1;
    if (!aIsFavorite && bIsFavorite) return 1;
    
    // Then sort by title
    return a.title.localeCompare(b.title);
  });
};

export const useFilteredContacts = () => {
  const { contacts, searchQuery, selectedCategory } = useContentStore();
  const { favoriteContacts } = useContentStore();
  
  return contacts.filter((contact) => {
    const matchesSearch = !searchQuery || 
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || contact.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    // Prioritize favorites
    const aIsFavorite = favoriteContacts.includes(a.contactId);
    const bIsFavorite = favoriteContacts.includes(b.contactId);
    
    if (aIsFavorite && !bIsFavorite) return -1;
    if (!aIsFavorite && bIsFavorite) return 1;
    
    // Then sort by name
    return a.name.localeCompare(b.name);
  });
};

export const useFilteredSnippets = () => {
  const { snippets, searchQuery, selectedCategory } = useContentStore();
  
  return snippets.filter((snippet) => {
    const matchesSearch = !searchQuery || 
      snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = !selectedCategory || snippet.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  }).sort((a, b) => b.shareCount - a.shareCount); // Sort by popularity
};

// Analytics and insights
export const useAnalytics = () => {
  const { sessionLogs } = useUserStore();
  const { recentlyViewed, favoriteGuides, favoriteContacts } = useContentStore();
  
  const totalActions = sessionLogs.length;
  const uniqueGuidesViewed = new Set(sessionLogs.filter(log => log.guideId).map(log => log.guideId)).size;
  const mostViewedGuides = sessionLogs
    .filter(log => log.guideId && log.action === 'view_guide')
    .reduce((acc, log) => {
      acc[log.guideId!] = (acc[log.guideId!] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  
  return {
    totalActions,
    uniqueGuidesViewed,
    mostViewedGuides,
    recentlyViewedCount: recentlyViewed.length,
    favoritesCount: favoriteGuides.length + favoriteContacts.length,
    lastActiveDate: sessionLogs[0]?.timestamp,
  };
};
