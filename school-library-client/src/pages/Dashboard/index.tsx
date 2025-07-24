import { Suspense } from 'react';

import { Profile } from 'components';
import type { IApi } from 'lib/api/types';

import Layout, { LayoutLeft, LayoutRight } from './layout.tsx';
import ListBook from './ListBook';
import ListBookRental from './ListBookRental';
import RentBookForm from './RentBookForm';
import useData from './useData';

import Fallback from '../../components/Fallback';

const Dashboard = () => {
  const { todayDate, page, setPage, rentForm, claims } = useData();

  const onEdit = (value: IApi['RentBook']) => {
    rentForm.current?.toggle(true, value.book, true, {
      id: value.id,
      user_id: claims?.user_id || 0,
      book_id: value?.book.book_id || 0,
      due_date: new Date(value?.due_date || ''),
      return_date: value?.return_date ? new Date(value.return_date) : new Date(),
      status: value.status
    });
  };

  const onRent = (data: IApi['Books']) => {
    rentForm.current?.toggle(true, data, false, {
      user_id: claims?.user_id || 0,
      book_id: data.id,
      due_date: new Date(),
      return_date: undefined,
      status: 'BORROWED'
    });
  };

  return (
    <>
      <Layout>
        <LayoutLeft className="shadow-lg px-4 py-6 rounded-xl border-1 border-neutral-200">
          <Profile page={page} setPage={setPage} />
        </LayoutLeft>

        <LayoutRight>
          <div className="shadow-lg px-4 py-6 rounded-xl border-1 border-neutral-200 flex flex-col mb-8 bg-white">
            <span className="text-2xl font-inter-bold">{todayDate()}</span>
          </div>
          <Suspense fallback={<Fallback />}>
            {page === 'catalog' ? <ListBook onRent={onRent} /> : <ListBookRental onEdit={onEdit} />}
          </Suspense>
        </LayoutRight>
      </Layout>

      <RentBookForm ref={rentForm} setPage={setPage} />
    </>
  );
};

export default Dashboard;
