import { OctagonX } from 'lucide-react';

import { Show } from 'components';
import type { IApi } from 'lib/api/types';
import { useBookStore } from 'store/BookStore';

import Button from '../../../components/Button';

const ListBook = ({ onRent }: { onRent: (data: IApi['Books']) => void }) => {
  const bookResources = useBookStore((s) => s.bookResource);
  const books = bookResources?.read() || [];

  return (
    <div>
      <Show>
        <Show.When isTrue={books.length}>
          <div className="grid grid-cols-16 gap-6">
            {books?.map((book, idx) => (
              <div
                key={`book-${idx}`}
                className="flex flex-col bg-white shadow-sm border border-gray-200 rounded-lg xl:flex-row hover:bg-gray-100  col-span-16 lg:col-span-8"
              >
                <img
                  className="object-contain w-full rounded-t-lg h-80 pt-4 xl:pt-0 xl:object-cover xl:h-auto xl:w-48 xl:rounded-none xl:rounded-s-lg"
                  src={book.cover_url}
                  alt=""
                />
                <div className="flex flex-col justify-between p-4 leading-normal w-full">
                  <h5 className="mb-2 text-lg xl:text-2xl font-inter-bold tracking-tight text-gray-900">
                    {book.title}
                  </h5>
                  <div className="flex flex-col gap-1 mt-2 text-neutral-600 text-sm">
                    <span>Penulis: {book.author}</span>
                    <span>Penerbit: {book.publisher}</span>
                    <span>ISBN: {book.isbn}</span>
                    <span>Tahun: {book.published_year}</span>
                    <span>Total: {book.total_copies}</span>
                    <span>Total Tersedia: {book.available_copies}</span>
                  </div>
                  <Button className="self-end mt-4" onClick={() => onRent(book)}>
                    Rental Buku
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Show.When>
        <Show.Else>
          <span className="text-neutral-500 flex flex-col gap-3 justify-center items-center text-lg">
            <OctagonX className="w-10 h-10" />
            There is no todos data yet
          </span>
        </Show.Else>
      </Show>
    </div>
  );
};

export default ListBook;
