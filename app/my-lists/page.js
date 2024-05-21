'use client';
import ListCard from '@/components/ListCard';
import { auth } from '@/config/firebase';
import { getCollection, getListsWithItems } from '@/utils/databaseUtils';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';

const MyLists = (props) => {
  const router = useRouter();
  const [lists, setLists] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    getListsWithItems().then((lists) => {
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
            <div className='flex flex-row items-center gap-2 mr-auto'>
              <button
                className='px-3 py-2 bg-secondary text-white rounded-lg'
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <MenuOpenIcon /> : <MenuIcon />}
              </button>
              <button
                className='px-3 py-2 bg-primary text-white rounded-lg'
                onClick={() => router.push('/new-list')}
              >
                Add List
              </button>
            </div>
            <h1 className='text-4xl font-semibold text-center mr-auto'>My Lists</h1>
          </div>
          <div className='flex flex-row gap-4 flex-wrap'>
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
