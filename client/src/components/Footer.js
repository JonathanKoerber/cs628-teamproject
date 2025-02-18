import React from 'react';
import data from '../data';
import '../App.css';

export default function Footer() {
  return (
    <footer>
      <p>
        © {new Date().getFullYear()} {data.footer}
      </p>
    </footer>
  );
}
