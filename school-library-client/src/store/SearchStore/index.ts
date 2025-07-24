import { create } from 'zustand/react';

import type { SearchState } from 'store/SearchStore/types';

export const useSearchStore = create<SearchState>((set) => ({
  keyword: '',
  setKeyword: (keyword) => set({ keyword })
}));
