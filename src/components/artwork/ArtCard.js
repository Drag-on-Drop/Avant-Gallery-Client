import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ArtCard = props => {
  return (
    <Card>
      <Link to={`/artworks/${props.art._id}`}>
        <Card.Img variant="top" src={props.art.imageUrl} />
      </Link>
      <Card.Body>
        <Link to={`/artworks/${props.art._id}`}>
          <Card.Title>{props.art.name}</Card.Title>
        </Link>
        <Card.Text>by {
          <Link to={`/artists/${props.art.owner._id}`}>
            props.art.owner.name
          </Link>
        }
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">Posted on {(props.art.createdAt).substring(0, 10)}</small>
      </Card.Footer>
    </Card>
  )
}

export default ArtCard
