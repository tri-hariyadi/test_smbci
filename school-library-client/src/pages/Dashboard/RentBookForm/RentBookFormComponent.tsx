import { Save, X } from 'lucide-react';
import { toast } from 'react-toastify';

import { Button, InputDateTime } from 'components';
import api from 'lib/api/api.ts';
import type { IApi } from 'lib/api/types';
import { useForm } from 'lib/hooks/useForm.ts';

import type { RentBookProps } from './types';

const RentBookFormComponent = ({
  isEdited,
  onClose,
  book,
  setPage,
  formValue = {
    id: undefined,
    book_id: 0,
    user_id: 0,
    due_date: new Date(),
    return_date: undefined,
    status: 'BORROWED'
  }
}: RentBookProps) => {
  const { values, errors, handleSubmit, onChange, isLoading, setIsLoading } = useForm(formValue);

  const onSubmit = () =>
    handleSubmit(async (value) => {
      if (!value) return;
      setIsLoading(true);
      let resp: IApi['Response'];
      if (isEdited) {
        resp = await api.returnBook(value.id, {
          book_id: value.book_id,
          due_date: value.due_date,
          return_date: value.return_date,
          user_id: value.user_id,
          status: value.status
        });
      } else {
        resp = await api.rentBook({
          book_id: value.book_id,
          due_date: value.due_date,
          return_date: value.return_date,
          user_id: value.user_id,
          status: value.status
        });
      }
      if (resp.status) {
        toast.success('Berhasil rental buku');
        onClose(false);
        setPage('rent');
      }
      setIsLoading(false);
    });

  return (
    <div>
      <div className="flex space-x-4 rtl:space-x-reverse mb-6">
        <div className="shrink-0">
          <img className="w-24 h-auto" src={book.cover_url} alt="cover_book" />
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <div className="*:block space-y-1">
              <span className="text-sm font-medium text-gray-900 truncate mb-1">{book.title}</span>
              <span className="text-sm text-gray-500 truncate">ISBN: {book.isbn}</span>
              <span className="text-sm text-gray-500 truncate">Penulis: {book.author}</span>
              <span className="text-sm text-gray-500 truncate">Penerbit: {book.publisher}</span>
            </div>
          </div>
        </div>
      </div>

      <InputDateTime
        value={values.due_date}
        id="due_date"
        error={errors.due_date}
        label="Tanggal Keterlambatan Pengembalian(Due Date)"
        onChange={(e) => onChange({ due_date: e })}
        disabled={isEdited}
      />
      {isEdited && (
        <InputDateTime
          value={values?.return_date || new Date()}
          id="return_date"
          error={errors.return_date}
          label="Tanggal Pengembalian Buku"
          onChange={(e) => onChange({ return_date: e })}
        />
      )}
      <div className="flex gap-2 items-center justify-end mt-6">
        <Button
          variant="danger"
          className="self-end flex gap-2 justify-center items-center"
          onClick={() => onClose(false)}
        >
          <X className="h-5 w-5" />
          Cancel
        </Button>
        <Button className="self-end flex gap-2 justify-center items-center" isLoading={isLoading} onClick={onSubmit}>
          <Save className="h-5 w-5" />
          Submit
        </Button>
      </div>
    </div>
  );
};

export default RentBookFormComponent;
