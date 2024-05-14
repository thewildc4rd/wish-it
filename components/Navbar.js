'use client';

import { logOut } from '@/authentication/authUtils';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { useAuth } from '@/authentication/AuthContext';
import { useRouter } from 'next/navigation';

const Navbar = (props) => {
  const router = useRouter();
  const { userLoggedIn } = useAuth();

  return (
    <nav className='w-full h-10 flex justify-center gap-6 items-center p-10 bg-slate-50'>
      <div className='flex gap-x-6 items-center flex-wrap w-full'>
        <div className=' mr-auto flex gap-x-6 items-center'>
          <Link
            href={'/'}
            className='text-2xl bg-pink-700 text-white p-2 px-3 rounded-2xl font-semibold'
          >
            Wish it
          </Link>
          {userLoggedIn && (
            <Link href={'/my-lists'} className='font-medium text-lg'>
              My lists
            </Link>
          )}
        </div>

        {userLoggedIn && (
          <button
            className='font-medium text-lg'
            onClick={async () => {
              await logOut();
              router.push('/');
            }}
          >
            Log out
          </button>
        )}

        {!userLoggedIn && (
          <>
            <Link className='font-medium text-lg' href={'/login'}>
              Log in
            </Link>
            <Link className='font-medium text-lg' href={'/signup'}>
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
