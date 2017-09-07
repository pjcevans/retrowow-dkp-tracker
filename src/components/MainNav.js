import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

const MainNav = (props) => {

  return(
    // <div>
    //   <h2>VanillaGaming DKP Tracker</h2>
    //   <ul>
    //    <li><Link to="/ce">Certus Excessum</Link></li>
    //    <li><Link to="/ggc">Goldshire Golfclub</Link></li>
    //    <li><Link to="/dp">De Profundis</Link></li>
    //  </ul>
    // </div>

  <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <p>VanillaGaming DKP Tracker</p>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem eventKey={1}><Link to="/ce">Certus Excessum</Link></NavItem>
        <NavItem eventKey={2}><Link to="/ggc">Goldshire Golfclub</Link></NavItem>
        <NavItem eventKey={3}><Link to="/dp">De Profundis</Link></NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  )
}
export default MainNav
