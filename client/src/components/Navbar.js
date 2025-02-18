import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/jazi_logo_removebg.png';
import '../App.css';

export default function Navbar() {
  return (
    <header className='nav-container'>
      <nav className='navbar'>
        <Link to='/'>
          <img src={logo} alt='Jazi AI Resume logo' className='logo' />
        </Link>
        <div className='right-nav'>
          {/* <NavLink to='/profile'>Profile</NavLink>
          <NavLink to='/aires'>AI Resume</NavLink> */}
          <NavLink to='/login'>
            <button className='btn-signin'>Sign in</button>
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
