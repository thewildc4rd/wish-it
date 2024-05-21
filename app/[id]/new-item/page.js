'use client';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Box, FormControl, Grid, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { getItemDataFromUrl } from '@/utils/databaseUtils';
import DefaultImage from '@/components/DefaultImage';
import { useRouter } from 'next/navigation';

const NewItem = ({ params }) => {
  const router = useRouter();
  const id = params.id;
  const [errMsg, setErrMsg] = useState('');
  const [formData, setFormData] = useState({
    url: '',
    image: '',
    title: '',
    brand: '',
    price: 0,
    colour: '',
  });

  const handleUploadImage = (e) => {
    // get the file uploaded
    console.log('upload imag');
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);

    // when the image loads, set the thumbnail to it
    reader.onloadend = function (e) {
      setFormData({ ...formData, image: reader.result });
    };
  };

  const onSumbit = (event) => {
    event.preventDefault();
    // const formData = new FormData(event.currentTarget);
    const data = { ...formData };
    console.log('hewo');
    // addList(data).then(() => {
    //   router.push('/my-lists');
    // });
  };

  const autofillFields = () => {
    getItemDataFromUrl(formData.url).then((data) => {
      setFormData({ ...formData, image: data.image, title: data.title, price: data.price });
    });
  };

  return (
    <main className='flex flex-col items-center min-h-screen p-10'>
      <div className='flex flex-row w-full items-center justify-center mb-10'>
        <button
          type='button'
          className='bg-secondary mr-auto py-2 px-3 rounded-lg text-white'
          onClick={() => router.push(`/${id}`)}
        >
          back
        </button>
        <h1 className='text-4xl font-semibold text-center mr-auto'>New Item</h1>
      </div>
      <Box component='form' onSubmit={onSumbit} noValidate>
        <Grid width={'384px'} container flexDirection='column' gap={'20px'} flex={1}>
          <div className='flex flex-col'>
            <div className='flex flex-col gap-4'>
              <TextField
                required
                label='Url'
                variant='outlined'
                value={formData.url}
                onChange={(e) => {
                  setFormData({ ...formData, url: e.target.value });
                  setErrMsg('');
                }}
              />
              <button
                className='bg-primary text-white p-2 rounded-lg'
                onClick={autofillFields}
                type='button'
              >
                Autofill fields
              </button>
              {formData.image && (
                <Box
                  component='img'
                  className='rounded-lg'
                  src={formData.image}
                  width={'100%'}
                  height={'384px'}
                  sx={{ objectFit: 'cover' }}
                />
              )}
              {!formData.image && <DefaultImage height={'384px'} />}
              <button
                type='button'
                className=' bg-gray-100 text-primary p-2 rounded-lg'
                onChange={handleUploadImage}
              >
                Upload File
                <input type='file' accept='.jpg, .jpeg, .png' hidden />
              </button>
              <TextField
                required
                label='Title'
                variant='outlined'
                value={formData.title}
                onChange={(e) => {
                  setFormData({ ...formData, title: e.target.value });
                  setErrMsg('');
                }}
              />
              <TextField
                required
                label='Brand'
                variant='outlined'
                value={formData.brand}
                onChange={(e) => {
                  setFormData({ ...formData, brand: e.target.value });
                  setErrMsg('');
                }}
              />
              <FormControl>
                <InputLabel htmlFor='price'>Price</InputLabel>
                <OutlinedInput
                  required
                  label='Price'
                  id='price'
                  type='number'
                  startAdornment={<InputAdornment position='start'>$</InputAdornment>}
                  value={formData.price}
                  onChange={(e) => {
                    setFormData({ ...formData, price: e.target.value });
                    setErrMsg('');
                  }}
                />
              </FormControl>
              <TextField
                required
                label='Colour'
                variant='outlined'
                value={formData.colour}
                onChange={(e) => {
                  setFormData({ ...formData, colour: e.target.value });
                  setErrMsg('');
                }}
              />
              <TextField label='Notes' multiline rows={4} />
            </div>
            <div className='flex flex-row mt-4 gap-2 justify-center'>
              <button
                type='submit'
                className='px-3 py-2 bg-secondary text-white rounded-lg w-full'
                onClick={() => {
                  router.push('/');
                }}
              >
                Add Item
              </button>
            </div>
          </div>
        </Grid>
      </Box>
    </main>
  );
};

export default NewItem;
