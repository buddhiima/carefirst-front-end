import logo2 from '../assets/logo-with-name.png'
import '../index.css'
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <div className="container footer-bg">
        <div className="row" style={{marginTop:"2rem"}}>
            <div className="col col-lg-4">
              <ul>
                <li >
                  <a class="nav-link" href="#">Home</a>
                </li>
                <li >
                  <a class="nav-link" href="#">Browse</a>
                </li>
                <li >
                  <a class="nav-link" href="#">About us</a>
                </li>
              </ul>
            </div>
            <div className="col col-lg-4 d-flex justify-content-center">
              <img  
                  src={logo2}  
                  width="200rem"  
                  height="60rem"  
                  className="d-inline-block align-top"  
                  alt="Brand logo"  
                /> 
            </div>
            <div className="col col-lg-4 d-flex justify-content-end">
                <ul class="mr-0 mt-2 mt-lg-0 address">
                  <li>10, Spooner st,</li>
                  <li >Colombo 2</li>
                  <li >011-2865984</li>
                </ul>
            </div>
        </div>
        <div className="row">
          <div className="d-flex justify-content-center">
            <p>info@carefirst.lk</p>
          </div>
        </div>
    </div>
  );
}

export default App;
