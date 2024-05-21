'use client';
import DefaultImage from '@/components/DefaultImage';
import { getListWithItems } from '@/utils/databaseUtils';
import { Box, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const List = ({ params }) => {
  const router = useRouter();
  const id = params.id;
  const [list, setList] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    getListWithItems(id).then((listData) => {
      // if no valid list was found
      if (!listData) {
        router.push('/');
        return;
      }
      setList(listData);
      setItems(listData.items);
    });
  }, []);

  return (
    <main className='flex min-h-screen flex-col px-10 py-5'>
      <div className='flex flex-row'>
        <div className='items-center gap-3 mr-auto'>
          <button
            className='px-3 py-2 bg-primary text-white rounded-lg'
            onClick={() => router.push(`/${list.id}/new-item`)}
          >
            Add item
          </button>
        </div>
        <h1 className='text-4xl font-semibold mb-10 text-center mr-auto'>{list.title}</h1>
      </div>

      <div className='flex flex-row'>
        {items.map((item) => (
          <div key={item.id} className='h-full bg-gray-100 p-3 rounded-lg shadow-lg'>
            <h3 className='text-xl font-semibold cursor-pointer'>{item.title}</h3>
            <h4 className='text-lg'>{item.brand}</h4>
            <h4 className='text-lg font-semibold mb-3 cursor-pointer text-pink-800'>
              {'$' + item.price}
            </h4>

            {item.image && (
              <Box
                component='img'
                className='rounded-lg cursor-pointer'
                src={item.image}
                width={'240px'}
                height={'240px'}
                sx={{ objectFit: 'cover' }}
              />
            )}
            {!item.image && (
              <DefaultImage className={'cursor-pointer'} height={'240px'} width={'240px'} />
            )}
            <div className='flex flex-row flex-wrap gap-1 mt-2 w-full'>
              {[...item.tags, item.colour].map((tag, idx) => (
                <div
                  key={idx}
                  className='py-1 px-2 text-sm bg-gray-700 text-emerald-50 w-fit rounded-lg'
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default List;
