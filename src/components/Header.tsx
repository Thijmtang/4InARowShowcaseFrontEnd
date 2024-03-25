import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../lib/context/AuthContext';
import { updateToast, updateErrorToast } from '../lib/services/ToastService';
import { toast } from 'react-toastify';


function Header() {
  const { user, logout, userHasRole} = useAuth();
  
  const logOutEvent = async () => {
    const id = toast.loading("Een moment geduld...");
    
    try {
      await logout();
      updateToast(id, "Uitgelogd",  'success', true);
    } catch(err) {
      updateErrorToast(id);
    }
  }

  let navLinks = <></>;

  if(!user) {
    navLinks =  <>
      <NavLink to={"/register"} className='nav-link'>Registreren</NavLink>
      <NavLink to={"/login"} className='nav-link'>Login</NavLink>
    </>;
  } else {
    let adminRoutes = <></>;

    if(userHasRole(user, 'Admin')) {
      adminRoutes = <>
            <NavLink to={"/admin"} className='nav-link'>Gebruikers</NavLink>
      </>;

    }

    navLinks = <>
      {adminRoutes}
      <button className='nav-link' onClick={logOutEvent}>Uitloggen</button>
    </>;
  }

  return (<>  
    <Navbar expand="lg" className="bg-body-tertiary mb-4 justify-content-end" >
      <Container>
        <Navbar.Brand href="">
          <NavLink to={""} className='nav-link'>4 op een rij Baby</NavLink>  
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
          <Nav>
            {navLinks}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </>);  
}

export default Header