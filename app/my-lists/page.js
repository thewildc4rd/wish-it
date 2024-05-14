'use client';
import ListCard from '@/components/ListCard';
import { auth } from '@/config/firebase';
import { getCollection } from '@/utils/databaseUtils';
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
              <Button
                variant='contained'
                color='secondary'
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <MenuOpenIcon /> : <MenuIcon />}
              </Button>
              <Button variant='contained' onClick={() => router.push('/new-list')}>
                Add List
              </Button>
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
