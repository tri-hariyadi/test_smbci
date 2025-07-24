import { forwardRef, useImperativeHandle, useRef, useState } from 'react';

import { Modal } from 'components';

import RentBookFormComponent from './RentBookFormComponent.tsx';
import type { RentBookFormRefObject, RentBookProps } from './types';

import type { ModalRefObject } from '../../../components/Modal/types';

const RentBookForm = forwardRef<RentBookFormRefObject, { setPage: (value: string) => void }>(({ setPage }, ref) => {
  const modalRef = useRef<ModalRefObject>(null);
  const [isEdited, setIsEdited] = useState(false);
  const [formValue, setFormValue] = useState<RentBookProps['formValue']>(undefined);
  const [book, setBook] = useState<RentBookProps['book']>({});

  useImperativeHandle(
    ref,
    () => ({
      toggle(open, book, isEdit, formValue) {
        modalRef.current?.toggle(open);
        setIsEdited(isEdit || false);
        setFormValue(formValue);
        setBook(book);
      }
    }),
    []
  );
  return (
    <Modal
      ref={modalRef}
      title={isEdited ? 'Pengembalian Buku' : 'Rental Buku'}
      className="w-full md:max-w-2xl px-4 sm:px-10 py-8 sm:py-10"
    >
      <RentBookFormComponent
        isEdited={isEdited}
        formValue={formValue}
        book={book}
        setPage={setPage}
        onClose={(value) => modalRef.current?.toggle(value)}
      />
    </Modal>
  );
});

export default RentBookForm;
