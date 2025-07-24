import type { IApi } from 'lib/api/types';
import type { wrapPromise } from 'lib/utils.ts';

export interface BookState {
  // filterBooks: (search: string) => Promise<void>;
  bookResource: ReturnType<typeof wrapPromise<Array<IApi['Books']>>> | null;
  bookRentResource: ReturnType<typeof wrapPromise<Array<IApi['RentBook']>>> | null;
  createBookResource: () => void;
  createBookRentResource: (userId: number) => void;
  searchBook: (keyword: string) => Promise<void>;
}
