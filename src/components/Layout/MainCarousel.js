import React, { useState, useEffect } from 'react'
import { getRecentImages } from '../../api/artwork'
import { Carousel } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { Link } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import messages from '../AutoDismissAlert/messages'

const MainCarousel = (props) => {
  const [images, setImages] = useState([])

  const itemize = (images) => {
    return (
      <Carousel>
        {images.map((image) => (
          <Carousel.Item key={image._id}>
            <Link to={`/artworks/${image._id}`}>
              <img height={450} width={600} src={image.imageUrl}/>
            </Link>
            <p style={{ color: 'grey', textAlign: 'right' }}>{image.name}</p>
          </Carousel.Item>
        ))}
      </Carousel>
    )
  }

  useEffect(() => {
    getRecentImages()
      .then(response => setImages(response.data.artworks))
      .catch(error => {
        this.props.msgAlert({
          heading: 'Load Images Failed: ' + error.message,
          message: messages.loadCarouselFailure,
          variant: 'danger'
        })
      })
  }, [])

  return (
    <Container className="fluid-container">
      <Row className="align-me" float="center">
        <Col xs={2}></Col>
        <Col>
          {itemize(images)}
        </Col>
        <Col xs={2}></Col>
      </Row>
    </Container>
  )
}

export default MainCarousel
