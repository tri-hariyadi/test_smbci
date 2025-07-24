import { create } from 'zustand/react';

import api from 'lib/api/api.ts';
import { wrapPromise } from 'lib/utils.ts';
import type { BookState } from 'store/BookStore/types';

export const useBookStore = create<BookState>((set) => ({
  bookResource: null,
  bookRentResource: null,
  createBookResource: () => {
    const promise = api.getBooks().then((resp) => {
      return resp.data ?? [];
    });
    const wrapped = wrapPromise(promise);
    set({ bookResource: wrapped });
  },
  createBookRentResource: (userId: number) => {
    const promise = api.getRentBook(userId).then((resp) => {
      return resp.data ?? [];
    });
    const wrapped = wrapPromise(promise);
    set({ bookRentResource: wrapped });
  },
  searchBook: async (keyword) => {
    const promise = api.searchBook(keyword).then((resp) => {
      return resp.data ?? [];
    });
    const wrapped = wrapPromise(promise);
    set({ bookResource: wrapped });
  }
}));
