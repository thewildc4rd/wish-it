'use client';

import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signUp } from '@/authentication/authUtils';
import { addUser } from '@/utils/databaseUtils';
import { Button, TextField } from '@mui/material';

const SignUpForm = (props) => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const onSubmit = () => {
    try {
      signUp(email, password).then((res) => {
        addUser(res.user.uid, { first, last, email }).then(() => {
          router.push('/');
        });
      });
    } catch (err) {
      setErrMsg('Invalid email or password');
    }
  };

  return (
    <div className='flex flex-col gap-4 w-96'>
      <TextField
        required
        label='First name'
        variant='outlined'
        value={first}
        onChange={(e) => {
          setFirst(e.target.value);
          setErrMsg('');
        }}
      />
      <TextField
        required
        label='Last name'
        variant='outlined'
        value={last}
        onChange={(e) => {
          setLast(e.target.value);
          setErrMsg('');
        }}
      />
      <TextField
        required
        label='Email'
        variant='outlined'
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setErrMsg('');
        }}
      />
      <TextField
        required
        label='Password'
        type='password'
        variant='outlined'
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setErrMsg('');
        }}
      />
      <Button variant='contained' onClick={onSubmit}>
        Sign Up
      </Button>
      <div className='text-red-700 text-center'>{errMsg}</div>

      <div className='text-center py-2'>
        Already have an account?
        <a className='ml-1 font-semibold' href='/login'>
          Log in
        </a>
      </div>
      {/* <div className='flex flex-row w-full items-center gap-3'>
        <div className='flex-1 h-[2px] bg-slate-100 rounded-lg' />
        <span className=''>OR</span>
        <div className='flex-1 h-[2px] bg-slate-100 rounded-lg' />
      </div> */}
    </div>
  );
};

export default SignUpForm;
