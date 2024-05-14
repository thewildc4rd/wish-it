'use client';

import PublicListCard from '@/components/PublicListCard';
import { getCollection } from '@/utils/databaseUtils';
import React, { useEffect, useState } from 'react';

export default function Home() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    getCollection('lists').then((lists) => {
      const publicLists = lists.filter((list) => list.public);
      setLists(publicLists);
    });
  }, []);

  return (
    <main className='flex flex-col min-h-screen p-10'>
      <h1 className='text-4xl font-semibold text-center mb-5'>Public Lists</h1>
      <div className='flex flex-row gap-4'>
        {lists.map((list) => (
          <PublicListCard list={list} key={list.id} />
        ))}
      </div>
    </main>
  );
}
