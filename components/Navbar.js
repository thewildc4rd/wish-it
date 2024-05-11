'use client';

import { AuthContext } from '@/utils/AuthContext';
import { logOut } from '@/utils/auth';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { useAuth } from '@/utils/AuthContext';
import { useRouter } from 'next/navigation';

const Navbar = (props) => {
  const router = useRouter();
  const { userLoggedIn } = useAuth();

  return (
    <nav className='w-full h-10 flex justify-center gap-6 items-center p-10 bg-slate-50'>
      <div className='flex justify-end gap-x-6 items-center flex-wrap flex-1'>
        <Link href={'/'} className='text-3xl text-rw-orange font-semibold mr-auto'>
          Wish it
        </Link>

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
