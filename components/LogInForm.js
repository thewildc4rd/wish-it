'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { logIn } from '@/authentication/authUtils';
import { getUsers } from '@/utils/databaseUtils';

const LogInForm = (props) => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  return (
    <div className='flex flex-col gap-2 w-96'>
      <div className='font-semibold'>Email</div>
      <input
        className={`${
          email ? 'bg-pink-100  border-pink-200' : 'border-slate-100 bg-slate-50'
        } border-2 p-2 px-4 rounded-lg text-gray-700 transition-all`}
        placeholder='Email'
        onChange={(e) => {
          setEmail(e.target.value);
          setErrMsg('');
        }}
      />
      <div className='font-semibold mt-2'>Password</div>
      <input
        className={`${
          password ? 'bg-pink-100  border-pink-200' : 'border-slate-100 bg-slate-50'
        } border-2 p-2 px-4 rounded-lg text-gray-700 transition-all`}
        placeholder='Password'
        type='password'
        onChange={(e) => {
          setPassword(e.target.value);
          setErrMsg('');
        }}
      />
      <button
        className='bg-pink-500 text-white py-2 rounded-lg mt-2 hover:shadow-lg transition-all'
        onClick={async () => {
          try {
            await logIn(email, password);
            router.push('/');
          } catch (err) {
            setErrMsg('Invalid email or password');
          }
        }}
      >
        Log In
      </button>
      <div className='text-red-700 text-center'>{errMsg}</div>

      <div className='text-center py-2'>
        Don&apos;t have an account?
        <a className='ml-1 font-semibold' href='/signup'>
          Sign up
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

export default LogInForm;
