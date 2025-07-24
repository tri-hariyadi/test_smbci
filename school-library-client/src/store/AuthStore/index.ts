import { persist } from 'zustand/middleware';
import { create } from 'zustand/react';

import type { AuthState, UserState } from './types';

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoading: true,
  setUser: (v) => {
    set({ user: v });
  },
  setUserLoading: (v) => {
    set({ isLoading: v });
  }
}));

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticate: false,
      revalidate: 15 * 60 * 1000,
      lastFetch: 0,
      setIsAuthenticate: (v) => set({ isAuthenticate: v }),
      setLastFetch: (v) => set({ lastFetch: v })
    }),
    {
      name: 'auth-store'
    }
  )
);
