import { useState, useEffect } from 'react';
import { useNavigate, useNavigation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Button from '../components/Button';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';
import data from '../data';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <div className='main-container'>
        <div className='text-content'>
          <h1>{data.title}</h1>
          <h3>{data.subtitle}</h3>
          <Button
            onClick={() => navigate('/resume')}
            label='Create new resume'
            className='btn-create'
          />
        </div>
        <Carousel />
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
}
