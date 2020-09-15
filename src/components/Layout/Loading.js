import React from 'react'
import { Spinner, Container, Row, Col } from 'react-bootstrap'

const Loading = () => (
  <Container id="loader"> {/* id="loader" is css to center Loading */}
    <Row>
      <Col>
        <Spinner animation="grow" variant="primary" />
        <Spinner animation="grow" variant="secondary" />
        <Spinner animation="grow" variant="success" />
        <Spinner animation="grow" variant="danger" />
        <Spinner animation="grow" variant="warning" />
        <Spinner animation="grow" variant="info" />
        <Spinner animation="grow" variant="dark" />
      </Col>
    </Row>
  </Container>
)

export default Loading
