'use client';

import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { logIn } from '@/authentication/AuthUtils';

const LogInForm = (props) => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  return (
    <div className='flex flex-col gap-2'>
      <input
        className='border-slate-200 p-2 border-2 rounded-xl'
        placeholder='Email'
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className='border-slate-200 p-2 border-2 rounded-xl'
        placeholder='Password'
        type='password'
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className='bg-slate-200 px-2 py-1 border-2 rounded-xl'
        onClick={async () => {
          await logIn(email, password);
          router.push('/');
        }}
      >
        Log in
      </button>
      {errMsg && <div className='text-red-700 text-center'>{errMsg}</div>}
    </div>
  );
};

export default LogInForm;
