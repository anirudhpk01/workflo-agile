import axios from 'axios';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

function TeamsDeets() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [r,setR]= useState([])
  useEffect(()=>{
    async function getdet() {
        const token = localStorage.getItem('token');
        const res = await axios.get("http://localhost:5001/api/teamdet", {
            headers: { Authorization: `Bearer ${token}` },
        });
        setR(res.data)
        

        
    }

    getdet()

  },[])

  // Extract values from query parameters
  const role = queryParams.get("role");
  const proj_name = queryParams.get("proj_name");
  const supervisor_name = queryParams.get("supervisor_name");
  const curr_ph = queryParams.get("curr_ph");
  const no_ph = queryParams.get("no_ph");
  const due = queryParams.get("due");
  const tname = queryParams.get("tname");
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
          <a href="/teams" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0">Back to Teams</a>
        </li>
        <li>
          <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 ">Pricing</a>
        </li>
        <li>
          <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 ">Log Out</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
    <h1 className='text-center text-4xl font-bold mt-1 bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-violet-500'>{tname}</h1>
    <div className='h-screen w-screen grid grid-cols-6 p-10 gap-5'>
        
        <div className='w-full rounded-sm shadow-2xl col-span-4 mb-32'>

        <div className='p-10'>
      <h2 className='text-center text-2xl font-semibold p-4 rounded-lg shadow-sm hover:bg-blue-50'>Your Role: {role}</h2>
      <h2 className='text-center text-2xl font-semibold p-4 rounded-lg shadow-sm hover:bg-blue-50'>Project: {proj_name}</h2>
      <h2 className='text-center text-2xl font-semibold p-4 rounded-lg shadow-sm hover:bg-blue-50'>SCRUM Master: {supervisor_name}</h2>
      <h2 className='text-center text-2xl font-semibold p-4 rounded-lg shadow-sm hover:bg-blue-50'>Current sprint: {curr_ph}</h2>
      <h2 className='text-center text-2xl font-semibold p-4 rounded-lg shadow-sm hover:bg-blue-50'>Total sprints: {no_ph}</h2>
      <h2 className='text-center text-2xl font-semibold p-4 rounded-lg shadow-sm hover:bg-blue-50'>Time left: {due} days</h2>
      </div>


      </div>
      <div className='w-full rounded-sm shadow-2xl col-span-2 bg-blue-50 mb-32'>
        <h1 className='text-center mt-5'>Team Members</h1>
        <div>
            {r.map((e)=>{
                return <div className='rounded-lg shadow-lg mt-2 p-5 mx-3 hover:bg-blue-100'>{e}</div>
            })}
        </div>
      </div>
    </div>
    </>
  );
}

export default TeamsDeets;
