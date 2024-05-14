import { useRouter } from 'next/navigation';
import React from 'react';
import DefaultImage from './DefaultImage';
import { Box } from '@mui/material';

const MyListCard = ({ list }) => {
  const router = useRouter();

  return (
    <div className='h-full bg-gray-100 p-4 rounded-lg shadow-lg'>
      <h3
        className='text-xl font-semibold mb-3 cursor-pointer'
        onClick={() => router.push(`/${list.id}`)}
      >
        {list.title}
      </h3>
      {list.image && (
        <Box
          component='img'
          className='rounded-lg'
          src={list.image}
          width={'240px'}
          height={'240px'}
          sx={{ objectFit: 'cover' }}
        />
      )}
      {!list.image && <DefaultImage height={'240px'} width={'240px'} />}
    </div>
  );
};

export default MyListCard;
