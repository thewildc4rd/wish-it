'use client';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
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
    notes: '',
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

  const submit = (e) => {
    e.preventDefault();
    // const formData = new FormData(event.currentTarget);
    const data = { ...formData };
    console.log(data);
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
    <main className='flex flex-col items-center min-h-screen'>
      <h1 className='text-4xl font-semibold text-center'>New Item</h1>
      <div className='flex flex-col gap-4 w-96 py-10'>
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
        <Button variant='outlined' component='label' onChange={handleUploadImage}>
          Upload File
          <input type='file' accept='.jpg, .jpeg, .png' hidden />
        </Button>
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
        <TextField
          label='Notes'
          multiline
          rows={4}
          value={formData.notes}
          onChange={(e) => {
            setFormData({ ...formData, notes: e.target.value });
            setErrMsg('');
          }}
        />
        <button
          type='submit'
          className='px-3 py-2 bg-secondary text-white rounded-lg w-full'
          onClick={(e) => {
            submit(e);
          }}
        >
          Add Item
        </button>
      </div>
    </main>
  );
};

export default NewItem;
