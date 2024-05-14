import { getUserFullName } from '@/utils/databaseUtils';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import DefaultImage from './DefaultImage';
import { Box } from '@mui/material';

const PublicListCard = ({ list }) => {
  const [creator, setCreator] = useState('');
  const router = useRouter();

  useEffect(() => {
    getUserFullName(list.creatorId).then((name) => {
      setCreator(name);
    });
  }, []);

  return (
    <div className='h-full bg-gray-100 p-4 rounded-lg shadow-lg cursor-pointer'>
      <h3 className='text-xl font-semibold' onClick={() => router.push(`/${list.id}`)}>
        {list.title}
      </h3>
      <h4 className='text-base mb-5'>Creator: {creator}</h4>
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

export default PublicListCard;
