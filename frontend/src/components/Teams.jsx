import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Teams() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [r1, setR1] = useState([]);
    const navigate= useNavigate()
    useEffect(() => {
        async function teamCheck() {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get("http://localhost:5001/api/teams", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log(response.data)
                setR1(response.data);
                console.log("Response data:", response.data);
                
                // Log the response data
            } catch (err) {
                console.error("Error details:", err);
                setError("Error fetching teams data");
            } finally {
                setLoading(false);
            }
        }
        teamCheck();
    }, []);

    if (loading) return  <div role="status" className='flex flex-col justify-center items-center h-screen'>
    <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    
</div>;
    if (error) return <div>{error}</div>;
    function timecheck(deet) {
      const endDate = new Date(deet.team.end_dt);
      const currentDate = new Date();
      const timeDiff = endDate - currentDate;
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      return days;
  }
  
    function deetspage(deet){
        // Assuming `deet` is an object with the properties you need
        navigate(`/teamsdeets?role=${deet.role}&proj_name=${deet.proj_name}&supervisor_name=${deet.supervisor_name}&curr_ph=${deet.team.curr_ph}&no_ph=${deet.team.no_ph}&due=${timecheck(deet)}&tname=${deet.team.team_name}`);


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
          <a href="/dashboard" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0" aria-current="page">Dashboard</a>
        </li>
        <li>
          <a href="/" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 ">About</a>
        </li>
        <li>
          <a href="/teams" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0">Teams</a>
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
        <div className='h-screen'>

        <h1 className='mt-5 p-10 text-3xl '>Your Teams</h1>
        <div className='grid grid-cols-3 gap-2 px-10 py-2'>
            {r1.length === 0 ? (
                <div>No teams available</div>
            ) : (
                r1.map((deet, index) => (
                    <div className="rounded-xl shadow-xl py-10 px-2 flex flex-col justify-center items-center hover:bg-blue-50 cursor-pointer outline-cyan-500" key={index} onClick={()=>deetspage(deet)}>
                        <h2 className='text-2xl font-bold mt-1 bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-violet-500'>{deet.team.team_name}</h2> {/* Change 'name' to the appropriate property */}
                        {/* You can add more details here */}
                        
                        <h2 className='mt-2'>Your Role: {deet.role}</h2>
                        <h2 className='mt-2'>Project:   {deet.proj_name}</h2>
                        <h2 className='mt-2'>Deadline In :  <span className='text-yellow-500'>{timecheck(deet)
                            }</span> days</h2>
                        
                    </div>
                ))
            )}
        </div>
        </div>






    </>
  )
}

export default Teams