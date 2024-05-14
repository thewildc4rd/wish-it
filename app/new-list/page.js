'use client';
import DefaultImage from '@/components/DefaultImage';
import { Box, Button, MenuItem, TextField } from '@mui/material';
import React, { useState } from 'react';

const NewList = (props) => {
  const [title, setTitle] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [image, setImage] = useState('');

  const handleUploadImage = (e) => {
    // get the file uploaded
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);

    // when the image loads, set the thumbnail to it
    reader.onloadend = function (e) {
      setImage(reader.result);
    };
  };

  return (
    <main className='flex flex-col items-center min-h-screen'>
      <h1 className='text-4xl font-semibold text-center p-10'>New List</h1>
      <div className='flex flex-col w-96 gap-5'>
        <TextField
          label='Title'
          variant='outlined'
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <TextField
          label={'Visability'}
          id='outlined-select-currency'
          select
          defaultValue={true}
          value={isPublic}
        >
          {[
            { label: 'Public', value: true },
            { label: 'Private', value: false },
          ].map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        {image && (
          <Box
            component='img'
            className='rounded-lg'
            src={image}
            width={'100%'}
            height={'384px'}
            sx={{ borderRadius: '25px', objectFit: 'cover' }}
          />
        )}
        {!image && <DefaultImage height={'384px'} />}
        <Button variant='contained' component='label' onChange={handleUploadImage}>
          Upload File
          <input type='file' accept='.jpg, .jpeg, .png' hidden />
        </Button>
      </div>
    </main>
  );
};

export default NewList;
