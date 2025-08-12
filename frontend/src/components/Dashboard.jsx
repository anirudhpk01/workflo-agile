import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import chillI from "../images/Screenshot 2024-10-28 174905.png"
import { useNavigate } from "react-router-dom";
function Dashboard() {
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tsk,setT]= useState([])
    const [prog,setProg]= useState(0.0)

    const [count,setCount]=useState(0)  //count of total tasks for the day
    const [wcount,setWcount]=useState(0) //total weekly tasks
    const[pcount,setPcount]=useState(0) //total phasely tasks
    const ctr=useRef(0)
    const [dt,setDt]=useState(0.0) //array of toggles for daily tasks
    const [wt,setWt]=useState(0.0) //array of toggles for weekly tasks
    const [pt,setPt]= useState(0.0) //array of toggles for phasely tasks
    const check=50
    var index=-1
    useEffect(() => {
        async function dashCheck() {
            const token = localStorage.getItem('token'); // Ensure 'token' is in quotes
            try {
                const response = await axios.get("http://localhost:5001/api/dash", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                // setUsername(response.data.userName); // Assuming the response is { username: "..." }
                setUsername("John Doe")
                setT(response.data.task);
                response.data.task.map((e)=>{
                    if(e.task_type=="DAILY"){
                    
                    setCount((c)=>c+1)
                }
                    else if(e.task_type=="WEEKLY"){
                        
                        setWcount((c)=>c+1)
                    }
                    else if(e.task_type=="PHASELY"){
                        
                        setPcount((c)=>c+1)
                    }
                })
                

                setLoading(false);
            } catch (err) {
                setError("Error fetching dashboard data");
                setLoading(false);
            }
        }

        dashCheck();
    }, []);

    if (loading) {
        return <div role="status" className='flex flex-col justify-center items-center h-screen'>
        <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        
    </div>;
    }

    if (error) {
        return <div>{error}</div>;
    }



   
    

const handleSubmit = async () => {
    console.log(count);
    const token1 = localStorage.getItem('token');

    try {
        const response = await axios.post(
            'http://localhost:5001/api/submit',
            { dp: (2*(dt/count))*100,
                wp: (2*(wt/wcount))*100,
                sp: (2*(pt/pcount))*100

             },
            {
                headers: {
                    Authorization: `Bearer ${token1}`
                }
            }
        );

        console.log('Submit successful:', response.data);
    } catch (error) {
        console.error('Error submitting count:', error);
    }
};



    // function taskUpdate(index) {
    //     // Toggle the task completion state at the current index
    //     if (toggle.current[index] === 0) {
    //         toggle.current[index] = 1;
    //         ctr.current += 1;
    //     } else {
    //         toggle.current[index] = 0;
    //         ctr.current -= 1;
    //     }
    
    //     // Calculate and update the progress based on completed tasks
    //     setProg((ctr.current / count) * 100);
    // }
    

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
          <a href="" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0  " aria-current="page">Dashboard</a>
        </li>
        <li>
          <a href="/" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 ">About</a>
        </li>
        <li>
          <a href="/teams" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 ">Teams</a>
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
        <div className='flex flex-col justify-center'>
            <h1 className='mt-5 p-5 text-5xl font-semibold text-center bg-clip-text text-transparent bg-gradient-to-r from-lime-300 to-blue-700'>Welcome, {username}!</h1>
            
            <div className='grid grid-cols-3 gap-2 gap-2 p-5'>

            <div className='shadow-lg rounded-lg p-4 mx-8 flex-col justify-center hover:bg-blue-50'>
                <h1 className='font-extrabold text-blue-900 text-center'>DAILY TASKS</h1>
                {tsk.map((ele)=>{
                    
                if(ele.task_type=="DAILY"){
                    
                return <div className='flex justify-between p-2 mt-2 rounded-lg shadow-md'><h2 className='text-center text-blue-400 mt-2'>{ele.task_name}</h2><div className='flex flex-col justify-center'><button onClick={(e)=>{if(e.target.innerText=="✔"){e.target.innerText="X"
                    setDt((f)=>f+1)}
                    else{
                        setDt((f)=>f-1)
                        e.target.innerText="✔"
                    }}} type="button" class="text-gray-900 text-sm bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-3xl text-sm  text-center text-blue-500 px-3 ">✔</button></div></div>}
            })}</div>
            
            <div className='shadow-lg rounded-lg p-4 mx-8 flex-col justify-center hover:bg-blue-50'>
                <h1 className='font-extrabold text-blue-900 text-center'>WEEKLY TASKS</h1>
                {tsk.map((ele)=>{
                    
                if(ele.task_type=="WEEKLY"){
                    
                return <div className='flex justify-between p-2 mt-2 rounded-lg shadow-md'><h2 className='text-center text-blue-400 mt-2'>{ele.task_name}</h2><div className='flex flex-col justify-center'><button onClick={(e)=>{if(e.target.innerText=="✔"){e.target.innerText="X"
                    setWt((f)=>f+1)}
                    else{
                        setWt((f)=>f-1)
                        e.target.innerText="✔"
                    }}} type="button" class="text-gray-900 text-sm bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-3xl text-sm  text-center text-blue-500 px-3 ">✔</button></div></div>}
            })}</div>
            <div className='shadow-xl rounded-lg p-4 mx-8 flex-col justify-center hover:bg-blue-50'>
                <h1 className='font-extrabold text-blue-900 text-center'>SPRINTLY TASKS</h1>
                {tsk.map((ele)=>{
                if(ele.task_type=="PHASELY"){
                    
                    return <div className='flex justify-between p-2 mt-2 rounded-lg shadow-md'><h2 className='text-center text-blue-400 mt-2'>{ele.task_name}</h2><div className='flex flex-col justify-center'><button onClick={(e)=>{if(e.target.innerText=="✔"){e.target.innerText="X"
                        setPt((f)=>f+1)}
                        else{
                            setPt((f)=>f-1)
                            e.target.innerText="✔"
                        }}} type="button" class="text-gray-900 text-sm bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-3xl text-sm  text-center text-blue-500 px-3 ">✔</button></div></div>}
            })}</div>
            </div>

            <div className='p-10 grid grid-cols-3 gap-1'>
                <div className='ml-6 p-8 rounded-xl shadow-md flex flex-col justify-center items-center hover:bg-blue-50'>
                    <h1 className='text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-violet-500'>Daily Progress</h1>
                    
                    <div class="bg-clip-text text-transparent bg-gradient-to-r from-lime-300 to-blue-700 text-3xl font-medium text-blue-100 text-center p-0.5 leading-none rounded-full mt-4 items-center flex justify-center h-20 " style={{width: `${2*(dt/count)*100}%`}}> {2*(dt/count)*100}%</div>
                </div>
                <div className='ml-6 p-8 rounded-xl shadow-md flex flex-col justify-center items-center hover:bg-blue-50 '>
                    <h1 className='text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-violet-500'>Weekly Progress</h1>

                    <div class="bg-clip-text text-transparent bg-gradient-to-r from-lime-300 to-blue-700 font-medium text-blue-100 text-center p-0.5 leading-none rounded-full mt-4 h-20 items-center flex justify-center text-3xl" style={{width: `${2*(wt/wcount)*100}%`}}> {2*(wt/wcount)*100}%</div>
                </div>
                <div className='ml-6 p-8 rounded-xl shadow-md flex flex-col justify-center items-center hover:bg-blue-50'>
                    <h1 className='text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-violet-500'>Sprint Progress</h1>

                    <div class="bg-clip-text text-transparent bg-gradient-to-r from-lime-300 to-blue-700 text-3xl font-medium text-blue-100 text-center p-0.5 leading-none rounded-full mt-4 items-center flex justify-center h-20 " style={{width: `${2*(pt/pcount)*100}%`}}> {2*(pt/pcount)*100}%</div>
                    
                </div>
                </div>
                <div className='flex justify-center w-100%'>
                <button onClick={handleSubmit} className='mb-10 text-2xl px-20 py-8 text-center font-light hover:text-lime-700  text-gray-900 text-sm bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-3xl text-sm  text-center text-blue-500 px-3 '>Track Progress</button>
                </div>
            



        </div>



        <footer class="bg-white ">
    <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div class="md:flex md:justify-between">
          <div class="mb-6 md:mb-0">
              <a href="https://flowbite.com/" class="flex items-center">
                  <img src="https://flowbite.com/docs/images/logo.svg" class="h-8 me-3" alt="FlowBite Logo" />
                  <span class="self-center text-2xl font-semibold whitespace-nowrap ">WorkFlo</span>
              </a>
          </div>
          <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                  <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase ">Resources</h2>
                  <ul class="text-gray-500  font-medium">
                      <li class="mb-4">
                          <a href="https://github.com/" class="hover:underline">GitHub</a>
                      </li>
                      <li>
                          <a href="https://tailwindcss.com/" class="hover:underline">Tailwind CSS</a>
                      </li>
                  </ul>
              </div>
              <div>
                  <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase ">Follow us</h2>
                  <ul class="text-gray-500  font-medium">
                      <li class="mb-4">
                          <a href="https://github.com/anirudhpk01" class="hover:underline ">Github</a>
                      </li>
                      <li>
                          <a href="https://discord.gg/" class="hover:underline">Discord</a>
                      </li>
                  </ul>
              </div>
              <div>
                  <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase ">Legal</h2>
                  <ul class="text-gray-500 font-medium">
                      <li class="mb-4">
                          <a href="#" class="hover:underline">Privacy Policy</a>
                      </li>
                      <li>
                          <a href="#" class="hover:underline">Terms &amp; Conditions</a>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
      <hr class="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
      <div class="sm:flex sm:items-center sm:justify-between">
          <span class="text-sm text-gray-500 sm:text-center ">© 2023 <a href="https://flowbite.com/" class="hover:underline">Flowbite™</a>. All Rights Reserved.
          </span>
          <div class="flex mt-4 sm:justify-center sm:mt-0">
              <a href="#" class="text-gray-500 hover:text-gray-900 ">
                  <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                        <path fill-rule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clip-rule="evenodd"/>
                    </svg>
                  <span class="sr-only">Facebook page</span>
              </a>
              <a href="#" class="text-gray-500 hover:text-gray-900 ">
                  <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 21 16">
                        <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z"/>
                    </svg>
                  <span class="sr-only">Discord community</span>
              </a>
              <a href="#" class="text-gray-500 hover:text-gray-900 ">
                  <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17">
                    <path fill-rule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" clip-rule="evenodd"/>
                </svg>
                  <span class="sr-only">Twitter page</span>
              </a>
              <a href="#" class="text-gray-500 hover:text-gray-900 ">
                  <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clip-rule="evenodd"/>
                  </svg>
                  <span class="sr-only">GitHub account</span>
              </a>
              <a href="#" class="text-gray-500 hover:text-gray-900 ">
                  <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 0a10 10 0 1 0 10 10A10.009 10.009 0 0 0 10 0Zm6.613 4.614a8.523 8.523 0 0 1 1.93 5.32 20.094 20.094 0 0 0-5.949-.274c-.059-.149-.122-.292-.184-.441a23.879 23.879 0 0 0-.566-1.239 11.41 11.41 0 0 0 4.769-3.366ZM8 1.707a8.821 8.821 0 0 1 2-.238 8.5 8.5 0 0 1 5.664 2.152 9.608 9.608 0 0 1-4.476 3.087A45.758 45.758 0 0 0 8 1.707ZM1.642 8.262a8.57 8.57 0 0 1 4.73-5.981A53.998 53.998 0 0 1 9.54 7.222a32.078 32.078 0 0 1-7.9 1.04h.002Zm2.01 7.46a8.51 8.51 0 0 1-2.2-5.707v-.262a31.64 31.64 0 0 0 8.777-1.219c.243.477.477.964.692 1.449-.114.032-.227.067-.336.1a13.569 13.569 0 0 0-6.942 5.636l.009.003ZM10 18.556a8.508 8.508 0 0 1-5.243-1.8 11.717 11.717 0 0 1 6.7-5.332.509.509 0 0 1 .055-.02 35.65 35.65 0 0 1 1.819 6.476 8.476 8.476 0 0 1-3.331.676Zm4.772-1.462A37.232 37.232 0 0 0 13.113 11a12.513 12.513 0 0 1 5.321.364 8.56 8.56 0 0 1-3.66 5.73h-.002Z" clip-rule="evenodd"/>
                </svg>
                  <span class="sr-only">Dribbble account</span>
              </a>
          </div>
      </div>
    </div>
</footer>

        </>
    );
}

export default Dashboard;
