import axios from 'axios';
import React, { useState } from 'react';

function Login() {
  const [r, setR] = useState('jdoe@apple.com'); // Sample email for testing
  const [p, setP] = useState('applePass123'); // Sample password for testing

  async function loginCheck() {
    try {
      // Sending POST request to the backend login API
      const response = await axios.post('http://localhost:5001/api/login', {
        usermail: r, // User email
        password: p, // Password
      });

      // Store the token received from the backend in local storage
      localStorage.setItem('token', response.data.token);
      console.log('Login successful, token stored:', response.data.token);
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
    }
  }

  return (
    <>
    <nav class="bg-white border-gray-200 ">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap ">WorkFlo</span>
    </a>
    <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 " aria-controls="navbar-default" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div class="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white ">
        
        <li>
          <a href="/" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 ">About</a>
        </li>
        <li>
          <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 ">Pricing</a>
        </li>
        <li>
          <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 ">Help</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
    <div className='h-screen flex flex-col justify-center'>
      
      <h1 className='text-center text-4xl font-bold'>Sign In</h1>
      <h2 className='text-center mt-4 text-sm '>Login to your WorkFlo account</h2>
      <div className='p-10 mx-28 flex justify-center '>
      <input
        type="text"
        placeholder="Email"
        value={r}
        className='outline p-3 rounded-md'
        onChange={(e) => setR(e.target.value)} // Update user email
      />
      </div>
      <div className='p-10 mx-28 flex justify-center'>
      <input
        type="password"
        placeholder="Password"
        value={p}
        className='outline p-3 rounded-md'
        onChange={(e) => setP(e.target.value)} // Update password
      />
      </div>
      <div className='flex justify-center'>
      <button type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={loginCheck}>Login</button>
      </div>
    </div>
    </>
  );
}

export default Login;
