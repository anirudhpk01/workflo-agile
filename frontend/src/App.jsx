import { useState, useEffect } from 'react';
import axios from "axios";
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard';
import Teams from './components/Teams';
import TeamsDeets from './components/TeamsDeets';
import Login from './components/Login';
import About from './components/About';
import Pricing from './components/Pricing';
import Leaderboard from './components/Leaderboard';
import Scrumdeets from './components/Scrumdeets';
function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/teams' element={<Teams/>}/>
          <Route path='/teamsdeets' element={<TeamsDeets/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/" element={<About/>}/>
          <Route path="/pricing" element={<Pricing/>}/>
          <Route path="/leaderboard" element={<Leaderboard/>}/>
          <Route path="/scrumdet" element={<Scrumdeets/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
