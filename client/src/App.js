import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

import AIRes from './pages/AIRes';
import Home from './pages/Home';
import Layout from './pages/Layout';
import Login from './pages/Login';
import NoPage from './pages/NoPage'
import Profile from './pages/Profile';
import Resume from './pages/Resume';
import './App.css';
import {useDispatch, useSelector} from "react-redux";

function App() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    console.log("app.js", user);

    const [authenticated, setAuthenticated] = React.useState(false);
    // if(!user.isAuthenticated){
    //     return(
    //         // <BrowserRouter>
    //         //     <Routes>
    //         //         <Route path="/login" component={Login} />
    //         //     </Routes>
    //         // </BrowserRouter>
    //         <h1>Hello world</h1>
    //     )
   // }
  return (
      <BrowserRouter>
          <Routes>
         <Route path="/" element={<Layout />}>
                <Route index element={<Home/>}/>
                <Route path="profile" element={<Profile/>}/>
                {/* Adding Authentication for Resume Page (User needs to be logged in) */}    
                <Route path="resume" element={authenticated ? <Resume /> : <Navigate to="/login" />} />
                {/* <Route path="resume" element={<Resume/>}/> */}
                <Route path="aires" element={<AIRes />}/>
                <Route path="*" element={<NoPage/>}/>
              <Route path={"/login"} element={<Login/>}/>
            </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
