import React from 'react'
import NavbarCustomer from './customer/NavbarCustomer.js';
import Footer from './Footer.js'
import backdrop from '../assets/backdrop.png';

const Home = () => {
  return (
    <>
      <header className="App-header">
        <NavbarCustomer/>
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
          <div className="row">
            <Footer/>
          </div>
      </body>
    </>
  )
}

export default Home

