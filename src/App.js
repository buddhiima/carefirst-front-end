import React from "react";
import { useState, useEffect } from "react";
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js'
import backdrop from './assets/backdrop.png';

function App() {

  useEffect(() => {
    document.title = 'Home'
  }, [])


  return (
    <div className="App">
      <header className="App-header">
        <Navbar/>
      </header>
      <body>
        <div className="container">
          <div className="row">
            <button type="button" class=" call-to-action-btn btn btn-primary btn-lg">ORDER NOW</button>
            <img
            src={backdrop}  
            alt="Brand logo"  
          /> 
          </div>
        </div>
        <Footer/>
      </body>
    </div>
  );
}

export default App;
