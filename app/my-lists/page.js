'use client';
import HamburgerIcon from '@/components/HamburgerIcon';
import ListCard from '@/components/ListCard';
import { auth } from '@/config/firebase';
import { getCollection } from '@/utils/databaseUtils';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const MyLists = (props) => {
  const router = useRouter();
  const [lists, setLists] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    getCollection('lists').then((lists) => {
      const myLists = lists.filter((list) => list.creatorId == auth.currentUser.uid);
      setLists(myLists);
    });
  }, []);

  return (
    <main className='flex min-h-screen flex-col'>
      <div className='flex flex-row'>
        <div
          className={`flex-col ${
            sidebarOpen ? '' : 'hidden'
          } w-96 h-svh bg-slate-100 p-5 transition-all flex flex-col items-center`}
        ></div>
        <div className='flex flex-col h-full w-full p-10 pt-5'>
          <div className='flex flex-row items-center mb-7 '>
            <div className='flex flex-row items-center gap-3 mr-auto'>
              <button
                className=' bg-pink-700 p-2 rounded-lg'
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <HamburgerIcon />
              </button>
              <button
                className='bg-pink-600 p-2 rounded-lg text-white'
                onClick={() => router.push('/new-list')}
              >
                Add List
              </button>
            </div>
            <h1 className='text-4xl font-semibold text-center mr-auto'>My Lists</h1>
          </div>
          <div className='flex flex-row gap-4'>
            {lists.map((list) => (
              <ListCard list={list} forMyList={true} key={list.id} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default MyLists;
