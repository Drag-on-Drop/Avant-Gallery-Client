import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'

const Footer = () => (
  <div className="footer">
    <hr/>
    <Navbar bg="light" fixed="bottom" style={{ color: 'grey', textAlign: 'right' }}>
      <Nav className="ml-auto">
        Developed by Isaac A., Will A., Steven D., Jason F.
      </Nav>
    </Navbar>
  </div>
)

export default Footer
