import React from 'react';
import SignUpForm from '@/components/SignUpForm';

const page = (props) => {
  return (
    <main className='flex min-h-screen flex-col items-center gap-2 p-24'>
      <h1 className='text-6xl mb-10'>SIGNUP PAGE</h1>
      <SignUpForm />
    </main>
  );
};

export default page;
