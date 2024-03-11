import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../lib/context/AuthContext';


function Header() {
  const { user, loggedIn} = useAuth();
  console.log(loggedIn);
  return (
    <>  
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="">4 op een rij Baby</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to={""} className='nav-link'>Home</NavLink>
            {loggedIn && (
              <NavLink to={"/login"} className='nav-link'>Login</NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>

);  
}

export default Header