import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";

import AIRes from './pages/AIRes';
import Home from './pages/Home';
import Layout from './pages/Layout';
import LoginPage from './pages/LoginPage';
import Signup from "./components/Signup";
import NoPage from './pages/NoPage'
import Profile from './pages/Profile';
import Resume from './pages/Resume';
import './App.css';

function App() {




  return (
      <BrowserRouter>
          <Routes>
         <Route path="/" element={<Layout />}>
                <Route index element={<Home/>}/>
                <Route path="profile" element={<Profile/>}/>
                <Route path="resume" element={<Resume/>}/>
                <Route path="aires" element={<AIRes />}/>
                <Route path={"/signup"} element={<Signup/>}/>
                <Route path={"/login"} element={<LoginPage/>}/>
                <Route path="*" element={<NoPage/>}/>
            </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
