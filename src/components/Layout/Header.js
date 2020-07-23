import React, { Fragment } from 'react'
import { Nav, Navbar } from 'react-bootstrap'

const authenticatedOptions = (user) => {
  return (
    <Fragment>
      <Nav.Link href="#upload-image">Upload Art</Nav.Link>
      <Nav.Link href={`#users/${user._id}`}>My Profile</Nav.Link>
      <Nav.Link href="#user-settings">User Settings</Nav.Link>
      <Nav.Link href="#sign-out">Sign Out</Nav.Link>
    </Fragment>
  )
}

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
    <Nav.Link href="#/">Home</Nav.Link>
    <Nav.Link href="#images">Art</Nav.Link>
    <Nav.Link href="#view-users">Users</Nav.Link>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar bg="dark" variant="dark" expand="md">
    <Navbar.Brand href="#">Gallery d&apos;Art</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
        { alwaysOptions }
        { user ? authenticatedOptions(user) : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
