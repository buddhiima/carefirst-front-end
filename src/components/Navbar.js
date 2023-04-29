import logo from '../assets/logo.png'
import '../index.css'
import 'bootstrap/dist/css/bootstrap.css';
import { Cart } from 'react-bootstrap-icons';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div class="container">
          <div class="row">
            <div class="col col-lg-10">
              <nav class="navbar navbar-expand-lg navbar-light">
                <a class="navbar-brand" href="#">
                  <img  
                    src={logo}  
                    width="50"  
                    height="50"  
                    className="d-inline-block align-top"  
                    alt="Brand logo"  
                  />  
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                  <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li class="nav-item active">
                      <a class="nav-link active" href="#">HOME <span class="sr-only"></span></a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">BROWSE</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">ABOUT US</a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
            <div class="col">
                <nav class="navbar navbar-expand-lg navbar-light">
                  <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li class="nav-item">
                      <a class="nav-link" href="#">ACCOUNT <span class="sr-only"></span></a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#"><Cart/></a>
                    </li>
                  </ul>
                </nav>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
