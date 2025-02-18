import React, { useState, useEffect } from 'react';
import data from '../data';
import '../App.css';

const images = data.carousel;
console.log(images);

export default function Carousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='carousel-container'>
      <div className='carousel-img'>
        <img
          src={images[current].src}
          alt={`slide-${current}`}
          className='carousel-img'
        />
      </div>
      <div className='carousel-buttons'>
        {images.map((_, index) => (
          <button
            key={index}
            className={index === current ? 'active' : ''}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
  );
}
