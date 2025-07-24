import type { IApi } from 'lib/api/types';

export interface RentBookProps {
  isEdited: boolean;
  onClose: (value: boolean) => void;
  formValue?: {
    id?: number;
    user_id: number;
    book_id: number;
    due_date: Date;
    return_date?: Date;
    status?: 'BORROWED' | 'RETURNED' | 'LATE';
  };
  book: Partial<IApi['RentBook']['book']>;
  setPage: (value: string) => void;
}

export interface RentBookFormRefObject {
  toggle: (
    open: boolean,
    book: Partial<IApi['RentBook']['book']>,
    isEdit?: boolean,
    formValue?: RentBookProps['formValue']
  ) => void;
}
