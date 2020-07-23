import React from 'react'
import { Image, Container, Row, Col } from 'react-bootstrap'

const MainPicture = () => (
  <Container>
    <Row>
      <Col>
        <Image src="https://images.pexels.com/photos/2570059/pexels-photo-2570059.jpeg" alt="Art" height="30%" fluid/>
        <p style={{ color: 'grey', textAlign: 'right' }}>Loc. Unknown</p>
      </Col>
    </Row>
  </Container>
)

export default MainPicture
