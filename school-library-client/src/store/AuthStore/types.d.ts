import type { IApi } from 'lib/api/types';

export interface UserState {
  user: IApi['UserProfile'] | null;
  isLoading: boolean;
  setUserLoading: (v: boolean) => void;
  setUser: (v: UserState['user']) => void;
}

export interface AuthState {
  isAuthenticate: boolean;
  revalidate: number;
  lastFetch: number;
  setIsAuthenticate: (v: boolean) => void;
  setLastFetch: (v: number) => void;
}
