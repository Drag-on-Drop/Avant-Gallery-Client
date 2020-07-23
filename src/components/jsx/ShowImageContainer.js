import React from 'react'
import { Link } from 'react-router-dom'
import { Image, Container, Row, Col } from 'react-bootstrap'

const ShowImageContainer = props => {
  return (
    <div className="show-image">
      <br/>
      <Container>
        <Row justify-center>
          <Col><Image src={props.imageUrl} fluid/></Col>
        </Row>
      </Container>
      <a href={props.imageUrl}>Download</a>
      <p>{props.name} by <Link to={`/users/${props.owner._id}`}>
        {props.owner.name}
      </Link>
      </p>
      <p>About the image:</p>
      <p>{props.description}</p>
      <small className="text-muted">Posted on {props.createdAt.substring(0, 10)}</small>
      {props.ownerButtons}
    </div>
  )
}

export default ShowImageContainer
