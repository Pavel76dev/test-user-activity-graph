import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

const [data, setData] = useState([])
useEffect(() => {
  fetch(`/users`)
  .then(res => res.json())
  .then(setData)
},[])
  console.log({data: data});
  
  return (
    <div className="App">
      <header className="App-header">
        <p>
        React
        </p>
      </header>
    </div>
  );
}

export default App;
