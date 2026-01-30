import React from 'react';
import ReactDOM from "react-dom/client";
import './index.css';
import App from './App';
import BookContextProvier from './GlobalContext/BookContext';

 
 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BookContextProvier>
    <App />
  </BookContextProvier>
);
 