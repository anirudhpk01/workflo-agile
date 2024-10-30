import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Leaderboard() {
    const [data, setData] = useState([]); // Initialize data as an empty array

    useEffect(() => {
        async function getLeaderboard() {
            try {
                const res = await axios.get("http://localhost:5001/api/lead");
                setData(res.data); // Assuming your API returns an array of objects
            } catch (error) {
                console.error('Error fetching leaderboard:', error);
            }
        }

        getLeaderboard();
    }, []);

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
          <a href="/dashboard" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0" aria-current="page">Dashboard</a>
        </li>
        <li>
          <a href="/" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 ">About</a>
        </li>
        <li>
          <a href="/leaderboard" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0">Leaderboard</a>
        </li>
        <li>
          <a href="/pricing" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 ">Pricing</a>
        </li>
        <li>
          <a href="/teams" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 ">Teams</a>
        </li>
        <li>
          <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 ">Log Out</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
        <div>
            <div className='flex justify-center m-5 p-5  shadow-sm rounded-lg'>
            <h1 className='font-bold text-4xl '>Leaderboard</h1>
            </div>
            <div className='flex justify-center flex-col mb-20 w-50% p-5 mx-52 rounded-sm shadow-md'>
            {data.length > 0 ? (
                data.map((e, index) => (
                    <div className='flex justify-between'>
                    <h1 key={index} className={index === 0 ? 'text-blue-500 text-3xl font-light text-center p-2 shadow-md' : 'text-xl font-semibold text-center shadow-md'}>
                        {e.user_name}
                    </h1>
                    <h1>{e.contrib_index}</h1>
                    </div>
                    
                ))
            ) : (
                <h1></h1>
            )}
            </div>
        </div>
        </>
    );
}

export default Leaderboard;
