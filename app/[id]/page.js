'use client';
import { getCollection, getList } from '@/utils/databaseUtils';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const List = ({ params }) => {
  const router = useRouter();
  const id = params.id;
  const [list, setList] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    getList(id).then((listData) => {
      // if no valid list was found
      if (!listData) {
        router.push('/');
        return;
      }
      setList(listData);
    });

    getCollection('items').then((items) => {
      setItems(items);
    });
  }, []);

  return (
    <main className='flex min-h-screen flex-col px-10 py-5'>
      <h1 className='text-4xl font-semibold mb-10 text-center'>{list.title}</h1>
      <div className='flex flex-row'>
        {items.map((item) => (
          <div key={item.id} className='h-full bg-slate-200 p-3 rounded-lg shadow-lg'>
            <h3 className='text-xl font-semibold cursor-pointer'>{item.title}</h3>
            <h4 className='text-lg mb-3 cursor-pointer'>{item.brand}</h4>
            <div
              className='w-60 h-60 bg-center rounded-xl cursor-pointer'
              // style={{
              //   backgroundImage: `url("${list.image}")`,
              // }}
            />
          </div>
        ))}
      </div>
    </main>
  );
};

export default List;
