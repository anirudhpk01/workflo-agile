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
                setUsername(response.data.userName); // Assuming the response is { username: "..." }
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
        </>
    );
}

export default Dashboard;
