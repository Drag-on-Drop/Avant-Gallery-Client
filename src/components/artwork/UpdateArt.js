import React, { Fragment, useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import messages from '../AutoDismissAlert/messages'
import { editArtwork } from '../../api/artwork'
import DestroyArt from './DestroyArt'

const UpdateArt = (props) => {
  const [show, setShow] = useState(false)
  const [art, setArt] = useState({
    name: props.name,
    description: props.description
  })

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const handleChange = e => {
    e.preventDefault()
    const updatedField = { [e.target.name]: e.target.value }
    setArt({ ...art, ...updatedField })
  }

  useEffect(() => {
    setArt({
      name: props.name,
      description: props.description
    })
  }, [props])

  const handleSubmit = e => {
    e.preventDefault()
    editArtwork(art, props.match.params.id, props.user)
      .then(() => {
        props.msgAlert({
          heading: 'Edit Success',
          message: messages.artEditSuccess,
          variant: 'success'
        })
        handleClose()
        props.setArt({
          ...props.art,
          name: art.name,
          description: art.description
        })
      })
      .catch(error => {
        props.msgAlert({
          heading: 'Edit Failure: ' + error.message,
          message: messages.artEditFailure,
          variant: 'danger'
        })
      })
  }

  return (
    <Fragment>
      <Button variant="success" onClick={handleShow}>Edit</Button>
      <Modal size="sm" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Artwork</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                type="text"
                name="name"
                value={art.name}
                onChange={handleChange}
                placeholder="Enter Piece Title"
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                required
                type="text"
                name="description"
                value={art.description}
                onChange={handleChange}
                placeholder="Enter Description"
              />
            </Form.Group>
            <Modal.Footer>
              <Button
                type="Submit"
                variant="dark"
                className="mr-auto">
                Submit
              </Button>
              <DestroyArt
                user={props.user}
                msgAlert={props.msgAlert}/>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </Fragment>
  )
}

export default UpdateArt
