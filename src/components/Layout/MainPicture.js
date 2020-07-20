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
        <Image src="https://images.pexels.com/photos/2570059/pexels-photo-2570059.jpeg" alt="Art" fluid/>
        <p style={{ color: 'grey', textAlign: 'right' }}>Loc. Unknown</p>
      </Col>
    </Row>
  </Container>
)

export default MainPicture
