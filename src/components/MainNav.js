import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const MainNav = (props) => {

  return(
  <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <p>VanillaGaming DKP Tracker</p>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <LinkContainer to="/ce">
          <NavItem eventKey={1}>Certus Excessum</NavItem>
        </LinkContainer>
        <LinkContainer to="/ggc">
          <NavItem eventKey={2}>Goldshire Golfclub</NavItem>
        </LinkContainer>
        <LinkContainer to="/dp">
          <NavItem eventKey={3}>De Profundis</NavItem>
        </LinkContainer>
        <LinkContainer to="/ev">
          <NavItem eventKey={3}>Everest</NavItem>
        </LinkContainer>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  )
}
export default MainNav
