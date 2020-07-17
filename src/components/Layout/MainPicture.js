import React from 'react'
// import Layout from '../Layout/Layout'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

const MainPicture = () => (
  <Container>
    <Row>
      <Col>
        <h1>Main Picture</h1>
        <Image src="https://i.imgur.com/XedXDn5.jpg" alt="Art" fluid/>
        <h6>Main Picture Description</h6>
      </Col>
    </Row>
  </Container>
)

export default MainPicture
