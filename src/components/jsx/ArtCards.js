import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ArtCard = props => {
  return (
    <Link to={`/images/${props.image._id}`}>
      <Card>
        <Card.Img variant="top" src={props.image.imageUrl} />
        <Card.Body>
          <Card.Title>{props.image.name}</Card.Title>
          <Card.Text>by {props.image.owner.name}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Posted on {(props.image.createdAt).substring(0, 10)}</small>
        </Card.Footer>
      </Card>
    </Link>
  )
}

export default ArtCard
