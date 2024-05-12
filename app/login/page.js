import LogInForm from '@/components/LogInForm';
import React from 'react';

const page = (props) => {
  return (
    <main className='flex min-h-screen flex-col items-center gap-2 p-24'>
      <div className='flex flex-col items-center gap-2 px-4 py-6 rounded-xl shadow-gray-300 shadow-2xl'>
        <h1 className='text-4xl mb-6'>Welcome Back!</h1>
        <LogInForm />
      </div>
    </main>
  );
};

export default page;
