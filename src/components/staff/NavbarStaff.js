import { Container } from "react-bootstrap"
import  Nav  from "react-bootstrap/Nav"
import  Navbar  from "react-bootstrap/Navbar"
import { NavLink } from "react-router-dom"
import { Person } from 'react-bootstrap-icons';
import '../../index.css'
import logo from '../../assets/logo.png'

const NavbarStaff = () => {
  return (
    <Navbar bg="light" variant="light" expand="lg">
        <Container fluid>
            <Navbar.Brand href='/' >
              <img src={logo} alt="brand logo" height="36"></img>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll"/>
            <Navbar.Collapse>
                <Nav
                    className="me-auto my-2 my-lg-2"
                    style={{maxHeight: '100px'}}
                    navbarScroll
                >
                <NavLink className="nav-link" to="/">HOME</NavLink>
                <NavLink className="nav-link" to="/">ORDERS</NavLink>
                <NavLink className="nav-link" to="/staff/products">PRODUCTS</NavLink>
                <NavLink className="nav-link" to="/staff/stock">STOCK</NavLink>
                </Nav>
                <NavLink className="nav-link" to="/">LOGOUT</NavLink>
                <NavLink className="nav-link cart-icon" to="/"><a href="#"><Person/></a></NavLink>
                
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default NavbarStaff