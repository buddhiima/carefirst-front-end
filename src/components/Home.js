import React from 'react'
import NavbarCustomer from './customer/NavbarCustomer.js';
import Footer from './Footer.js'
import backdrop from '../assets/backdrop.png';
import { useNavigate } from "react-router-dom";

const Home = () => {

  let navigate = useNavigate(); 
    const routeChange = () =>{ 
    let path = `/customer/browse`; 
    navigate(path);
  }


  return (
    <>
      <header className="App-header">
        <NavbarCustomer/>
      </header>

      <body>
        <div className="container">
          <div className="row">
              <button type="button" class=" call-to-action-btn btn btn-primary btn-lg" onClick={routeChange}>ORDER NOW</button>
              <img
              src={backdrop}  
              alt="Brand logo"  
              /> 
          </div>

        </div>
          <div className="row">
            <Footer/>
          </div>
      </body>
    </>
  )
}

export default Home

