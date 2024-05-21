import { getUserFullName } from '@/utils/databaseUtils';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import DefaultImage from './DefaultImage';
import { Box } from '@mui/material';

const PublicListCard = ({ list, forMyList }) => {
  const [creator, setCreator] = useState('');
  const router = useRouter();

  useEffect(() => {
    getUserFullName(list.creatorId).then((name) => {
      setCreator(name);
    });
  }, []);

  return (
    <div className='h-full bg-gray-100 p-4 rounded-lg shadow-lg cursor-pointer'>
      <div className='flex flex-col mb-3'>
        <h3 className='text-xl font-semibold' onClick={() => router.push(`/${list.id}`)}>
          {list.title}
        </h3>
        {!forMyList && (
          <h4 className='text-base'>
            <span className='font-medium'>Creator:</span> {creator}
          </h4>
        )}
        <h4 className='text-base'>
          {list.items.length} {list.items.length != 1 ? 'items' : 'item'}
        </h4>
      </div>
      {list.image && (
        <Box
          component='img'
          className='rounded-lg cursor-pointer'
          src={list.image}
          width={'240px'}
          height={'240px'}
          sx={{ objectFit: 'cover' }}
          onClick={() => router.push(`/${list.id}`)}
        />
      )}
      {!list.image && (
        <DefaultImage
          className={'cursor-pointer'}
          height={'240px'}
          width={'240px'}
          onClick={() => router.push(`/${list.id}`)}
        />
      )}
    </div>
  );
};

export default PublicListCard;
