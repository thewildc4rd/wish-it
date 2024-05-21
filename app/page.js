'use client';

import ListCard from '@/components/ListCard';
import { getCollection, getListsWithItems } from '@/utils/databaseUtils';
import React, { useEffect, useState } from 'react';

export default function Home() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    getListsWithItems().then((lists) => {
      const publicLists = lists.filter((list) => list.public == true);
      setLists(publicLists);
    });
  }, []);

  return (
    <main className='flex flex-col min-h-screen p-10'>
      <h1 className='text-4xl font-semibold text-center mb-5'>Public Lists</h1>
      <div className='flex flex-row gap-4 flex-wrap'>
        {lists.map((list) => (
          <ListCard list={list} forMyList={false} key={list.id} />
        ))}
      </div>
    </main>
  );
}
