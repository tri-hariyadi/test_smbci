import { useEffect, useRef, useState } from 'react';

import type { IApi } from 'lib/api/types';
import { parseJwt } from 'lib/utils.ts';
import { useBookStore } from 'store/BookStore';

import type { RentBookFormRefObject } from './RentBookForm/types';

const useData = () => {
  const createBookResource = useBookStore((state) => state.createBookResource);
  const createBookRentResource = useBookStore((state) => state.createBookRentResource);
  const [page, setPage] = useState('catalog');
  const rentForm = useRef<RentBookFormRefObject>(null);
  const claims = parseJwt<IApi['UserProfile']>(window.localStorage.getItem('access_token') || '');

  const todayDate = () => {
    const today = new Date();
    return today.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  useEffect(() => {
    if (page === 'catalog') {
      createBookResource();
    } else {
      if (claims) {
        createBookRentResource(claims.user_id);
      }
    }
  }, [page, claims]);

  return {
    todayDate,
    page,
    setPage,
    rentForm,
    claims
  };
};

export default useData;
