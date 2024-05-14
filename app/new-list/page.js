'use client';
import DefaultImage from '@/components/DefaultImage';
import { auth } from '@/config/firebase';
import { addList } from '@/utils/databaseUtils';
import { Box, Button, Grid, MenuItem, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const NewList = (props) => {
  const router = useRouter();
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

  const onSumbit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      creatorId: auth.currentUser.uid,
      title: formData.get('title'),
      public: formData.get('public'),
      image,
    };
    addList(data).then(() => {
      router.push('/my-lists');
    });
  };

  return (
    <main className='flex flex-col items-center min-h-screen'>
      <h1 className='text-4xl font-semibold text-center p-10'>New List</h1>
      <Box component='form' onSubmit={onSumbit} noValidate>
        <Grid width={'384px'} container flexDirection='column' gap={'20px'} flex={1}>
          <TextField
            required
            label='Title'
            name='title'
            id='title'
            variant='outlined'
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          {image && (
            <Box
              component='img'
              className='rounded-lg'
              src={image}
              width={'100%'}
              height={'384px'}
              sx={{ objectFit: 'cover' }}
            />
          )}
          {!image && <DefaultImage height={'384px'} />}
          <Button variant='outlined' component='label' onChange={handleUploadImage}>
            Upload File
            <input type='file' accept='.jpg, .jpeg, .png' hidden />
          </Button>
          <TextField
            label={'Visability'}
            name='public'
            id='public'
            select
            defaultValue={true}
            value={isPublic}
            onChange={(e) => setIsPublic(e.target.value)}
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
          <Button type='submit'>Submit</Button>
        </Grid>
      </Box>
    </main>
  );
};

export default NewList;
