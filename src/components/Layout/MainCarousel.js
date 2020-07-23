import React, { useState, useEffect } from 'react'
import { getRecentImages } from '../../api/image'
import { Link } from 'react-router-dom'
import { Carousel, Container, Row, Col } from 'react-bootstrap'

const MainCarousel = () => {
  const [images, setImages] = useState([])

  const itemize = (images) => {
    return (
      <Carousel>
        {images.map((image) => (
          <Carousel.Item key={image._id}>
            <Link to={`/images/${image._id}`}>
              <img height={450} width={600} src={image.imageUrl} fluid/>
            </Link>
            <p style={{ color: 'grey', textAlign: 'right' }}>{image.name}</p>
          </Carousel.Item>
        ))}
      </Carousel>
    )
  }

  useEffect(() => {
    getRecentImages(5)
      .then(response => setImages(response.data.images))
      .then(() => console.log('images', images))
      .catch(console.error)
  }, [])

  return (
    <Container className="fluid">
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
