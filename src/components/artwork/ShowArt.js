import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import UpdateArt from './UpdateArt'
import { showArtwork } from '../../api/artwork'
import messages from '../AutoDismissAlert/messages'
import { Image, Container, Row, Col, Button, Modal } from 'react-bootstrap'

const ShowArt = props => {
  const [art, setArt] = useState()
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  useEffect(() => {
    showArtwork(props.match.params.id)
      .then(res => setArt(res.data.artwork))
      .catch(error => props.msgAlert({
        heading: 'Could not find that art: ' + error.message,
        message: messages.showArtFailure,
        variant: 'danger'
      }))
  }, [])

  if (!art) { return <p>Loading...</p> }
  const { imageUrl, name, description, owner, createdAt } = art
  const { user, msgAlert } = props
  let ownerButtons = ''
  if (user && owner._id === user._id) {
    ownerButtons = (
      <Fragment>
        <UpdateArt {...props}
          art={art}
          user={user}
          name={name}
          setArt={setArt}
          msgAlert={msgAlert}
          description={description} />
      </Fragment>
    )
  }

  return (
    <Fragment>
      <br />
      <Container>
        <Row>
          <Col align="center">
            <Image className="image-view" src={imageUrl}/>
          </Col>
        </Row>
        <Row>
          <Col align="center">
            <Button className="placard" variant="light" onClick={handleShow}>
              <div>{name} by {owner.name}</div>
              <div>{description}</div>
              <div>posted on {createdAt.substring(0, 10)}</div>
            </Button>
          </Col>
        </Row>
      </Container>
      <Modal
        className="placard-modal"
        centered
        size="sm"
        show={show}
        onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{description}</p>

        </Modal.Body>
        <Modal.Footer className="text-justify">
          <p className="text-muted mr-auto">
            <Link to={`/artists/${owner._id}`}>
              {owner.name}
            </Link> <small>{createdAt.substring(0, 10)}</small>
          </p>
          {ownerButtons}
          <Button variant="outline-secondary" href={imageUrl}>▼</Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  )
}

export default ShowArt
