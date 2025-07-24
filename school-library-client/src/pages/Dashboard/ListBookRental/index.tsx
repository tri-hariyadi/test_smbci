import { OctagonX } from 'lucide-react';

import { Button } from 'components';
import type { IApi } from 'lib/api/types';
import { formatDate } from 'lib/utils.ts';
import { useBookStore } from 'store/BookStore';

import Show from '../../../components/Show';

const ListBookRental = ({ onEdit }: { onEdit: (value: IApi['RentBook']) => void }) => {
  const bookRentResource = useBookStore((s) => s.bookRentResource);
  const bookRent = bookRentResource?.read() || [];

  return (
    <div className="flex justify-center">
      <Show>
        <Show.When isTrue={bookRent.length}>
          <ul className="max-w-md divide-y divide-gray-200 min-w-md">
            {bookRent.map((rent, idx) => (
              <li key={`li-${idx}`} className="pb-3 sm:pb-4 pt-4 overflow-hidden">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <img className="w-24 h-auto" src={rent.book.cover_url} alt="cover_book" />
                  <div className="flex-1 flex flex-col justify-between gap-4">
                    <Show>
                      <Show.When isTrue={rent.return_date}>
                        <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm self-end">
                          Return date: {formatDate(rent.return_date!)}
                        </span>
                      </Show.When>
                      <Show.Else>
                        <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm self-end">
                          Due date: {formatDate(rent.due_date)}
                        </span>
                      </Show.Else>
                    </Show>
                    <div className="flex justify-between items-center gap-2">
                      <div className="flex flex-col flex-1">
                        <span className="text-sm font-medium text-gray-900 mb-1">{rent.book.title}</span>
                        <span className="text-sm text-gray-500 truncate">ISBN: {rent.book.isbn}</span>
                        <span className="text-sm text-gray-500 truncate">Penulis: {rent.book.author}</span>
                        <span className="text-sm text-gray-500 truncate">Penerbit: {rent.book.publisher}</span>
                      </div>
                      <Button onClick={() => onEdit(rent)}>Return</Button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Show.When>
        <Show.Else>
          <span className="text-neutral-500 flex flex-col gap-3 justify-center items-center text-lg">
            <OctagonX className="w-10 h-10" />
            Belum ada transaksi rental buku.
          </span>
        </Show.Else>
      </Show>
    </div>
  );
};

export default ListBookRental;
