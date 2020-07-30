import React, { useState, useEffect } from 'react'
import { getRecentImages } from '../../api/artwork'
import { Carousel } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { Link } from 'react-router-dom'
import Col from 'react-bootstrap/Col'

const MainCarousel = () => {
  const [images, setImages] = useState([])

  const itemize = (images) => {
    console.log('images', images)
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
    getRecentImages(5)
      .then(response => setImages(response.data.artworks))
      .then(() => console.log('images', images))
      .catch(console.error)
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
