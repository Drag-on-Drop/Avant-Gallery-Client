import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ArtCard = props => {
  return (
    <Link to={`/artworks/${props.art._id}`}>
      <Card>
        <Card.Img variant="top" src={props.art.imageUrl} />
        <Card.Body>
          <Card.Title>{props.art.name}</Card.Title>
          <Card.Text>by {props.art.owner.name}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Posted on {(props.art.createdAt).substring(0, 10)}</small>
        </Card.Footer>
      </Card>
    </Link>
  )
}

export default ArtCard
