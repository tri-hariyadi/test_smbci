import { type ChangeEvent, useEffect, useRef } from 'react';

import { LayoutList, List, LogOut, Search } from 'lucide-react';

import DummyProfile from 'assets/dummy_profile.png';
import { Button } from 'components';
import { cn } from 'lib/utils.ts';
import { useUserStore } from 'store/AuthStore';
import { useBookStore } from 'store/BookStore';
import { useSearchStore } from 'store/SearchStore';

import type { ProfileProps } from './types';

const Profile = ({ page, setPage }: ProfileProps) => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const search = useSearchStore();
  const searchBook = useBookStore((state) => state.searchBook);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleLogout = async () => {
    window.localStorage.removeItem('access_token');
    window.location.replace('/sign-in');
    setUser(null);
  };

  useEffect(() => {
    return () => {
      search.setKeyword('');
    };
  }, []);

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    search.setKeyword(e.target.value);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      searchBook(search.keyword);
    }, 600);
  };

  const btnClassName = 'text-black flex gap-2 items-center px-4 py-2 rounded-md hover:bg-[#EDEBEB]';

  return (
    <div className="flex flex-col bg-white min-w-72 md:min-w-full">
      <img
        src={DummyProfile}
        alt="foto-profile"
        className="object-fill w-[120px] h-[120px] relative left-1/2 -translate-x-1/2 mb-4"
      />
      <h2 className="text-center font-inter-bold text-[18px] capitalize">Hay, {user?.full_name}</h2>
      <h3 className="text-center text-sm mt-1">{user?.email}</h3>
      <h2 className="mt-8 mb-4 font-inter-semibold">Library</h2>
      <div className="hidden bg-[#F6F5F5] rounded-lg md:flex justify-center items-center px-4 py-2 outline outline-1 outline-transparent focus-within:outline-blue-500 mb-6">
        <Search className="w-6 h-6 text-zinc-600 mr-2" />
        <input
          placeholder="Cari Buku (judul, penulis, penerbit, kategory)"
          type="text"
          autoComplete="off"
          onChange={onSearch}
          className="text-black focus:outline-none focus:ring-0 focus:border-none h-8 w-full"
        />
      </div>
      <ul className="px-4">
        <li className="-mx-4 mb-2 hover:cursor-pointer">
          <Button
            variant="text"
            isBlock
            className={cn(btnClassName, page === 'catalog' ? 'bg-[#EDEBEB]' : 'bg-transparent')}
            onClick={() => setPage('catalog')}
          >
            <List className="w-5 h-5 text-black" />
            <span className="text-[16px]">Katalog Buku</span>
          </Button>
        </li>
        <li className="-mx-4 mb-2 hover:cursor-pointer">
          <Button
            variant="text"
            isBlock
            className={cn(btnClassName, page !== 'catalog' ? 'bg-[#EDEBEB]' : 'bg-transparent')}
            onClick={() => setPage('rental')}
          >
            <LayoutList className="w-5 h-5 text-red-600" />
            <span className="text-[16px]">Buku yang dirental</span>
          </Button>
        </li>
      </ul>
      <Button variant="danger" className="flex gap-2 mt-4 items-center self-center" onClick={handleLogout}>
        <LogOut className="w-5 h-5" />
        Logout
      </Button>
    </div>
  );
};

export default Profile;
