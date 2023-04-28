import logo from './logo.svg';
import './index.css'
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <nav className="navbar">
            <ul>
                <li><img src="logo.png" alt="logo"></img></li> 
                <li>HOME</li> 
                <li>BROWSE</li>
                <li>ABOUT US</li> 
                <li><button id="cart-btn">CART</button></li>
                <li><button id="logout-btn">LOGOUT</button></li>
            </ul>
        </nav>
      </header>
    </div>
  );
}

export default App;
