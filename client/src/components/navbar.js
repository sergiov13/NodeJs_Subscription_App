import React from "react";
import NavBar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";

export default function Navbar() {
  return (
    <NavBar bg="dark" variant="dark">
      <Container>
        <NavBar.Brand>Navbar</NavBar.Brand>
        <Nav className="me-auto">
          <LinkContainer to='/'>
            <Nav.Link >Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/list'>
            <Nav.Link>List</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/create'>
            <Nav.Link>Create</Nav.Link>
          </LinkContainer>
        </Nav>
      </Container>
    </NavBar>
  );
}
