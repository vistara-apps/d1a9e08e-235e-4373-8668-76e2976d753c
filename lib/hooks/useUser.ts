import { useState, useEffect } from 'react';
import { User } from '@/lib/types';

export function useUser(userId?: string) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      fetchUser(userId);
    }
  }, [userId]);

  const fetchUser = async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/user?userId=${id}`);
      const data = await response.json();
      
      if (data.success) {
        setUser(data.data);
      } else {
        setError(data.error || 'Failed to fetch user');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  const updatePreferences = async (preferences: Partial<User['preferences']>) => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.userId,
          preferences
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setUser(data.data);
        return data.data;
      } else {
        setError(data.error || 'Failed to update preferences');
        return null;
      }
    } catch (err) {
      setError('Network error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const purchasePack = async (packId: string, transactionHash?: string) => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.userId,
          packId,
          transactionHash
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setUser(data.data);
        return data.data;
      } else {
        setError(data.error || 'Failed to process purchase');
        return null;
      }
    } catch (err) {
      setError('Network error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const hasAccess = (contentId: string, isPremium: boolean) => {
    if (!isPremium) return true;
    if (!user) return false;
    return user.purchasedPacks.includes(contentId) || user.purchasedPacks.includes('premium-all');
  };

  return {
    user,
    loading,
    error,
    updatePreferences,
    purchasePack,
    hasAccess,
    refetch: () => user && fetchUser(user.userId)
  };
}
