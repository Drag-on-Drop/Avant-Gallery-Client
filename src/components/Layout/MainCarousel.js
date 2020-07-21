import React, { useState, useEffect } from 'react'
import { getRecentImages } from '../../api/artwork'
import { Carousel } from 'react-bootstrap'

const MainCarousel = () => {
  const [images, setImages] = useState([])

  const itemize = (images) => {
    console.log('images', images)
    return (
      <Carousel>
        {images.map((image) => (
          <Carousel.Item key={image._id}>
            <img src={image.imageUrl} />
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
    <div className="main-carousel">
      <Carousel>
        {itemize(images)}
      </Carousel>
    </div>
  )
}

export default MainCarousel
