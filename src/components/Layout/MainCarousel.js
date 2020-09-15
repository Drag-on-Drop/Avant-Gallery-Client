import React, { useState, useEffect } from 'react'
import { getRecentImages } from '../../api/artwork'
import { Carousel } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { Link } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import messages from '../AutoDismissAlert/messages'
import Loading from './Loading'

const MainCarousel = (props) => {
  const [images, setImages] = useState([])

  const itemize = (images) => {
    if (images.length === 0) {
      return (<Loading />)
    }

    return (
      <Carousel>
        {images.map((image) => (
          <Carousel.Item key={image._id}>
            <Link to={`/artworks/${image._id}`}>
              <img
                height="450"
                src={image.imageUrl}
                alt={`${image.name} by ${image.owner.name}`}
                className="d-block mw-100"/>
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
        props.msgAlert({
          heading: 'Load Images Failed: ' + error.message,
          message: messages.loadCarouselFailure,
          variant: 'danger'
        })
      })
  }, [])

  return (
    <Container className="fluid-container">
      <Row className="align-me" float="center">
        <Col>
          {itemize(images)}
        </Col>
      </Row>
    </Container>
  )
}

export default MainCarousel
