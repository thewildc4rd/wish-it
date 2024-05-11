import LogInForm from '@/components/LogInForm';
import React from 'react';

const page = (props) => {
  return (
    <main className='flex min-h-screen flex-col items-center gap-2 p-24'>
      <h1 className='text-6xl mb-10'>LOGIN PAGE</h1>
      <LogInForm />
    </main>
  );
};

export default page;
