import React, { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import messages from '../AutoDismissAlert/messages'
import { editArtwork } from '../../api/artwork'
import DestroyArt from './DestroyArt'

const UpdateArtModal = (props) => {
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
        console.log('props.art are: ', props.art)
        console.log('art is: ', art)
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
    <div>
      <Button variant="primary" onClick={handleShow}>Edit</Button>
      <Modal show={show} onHide={handleClose}>
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
            <Button variant="dark" type="submit" size="sm">Submit</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <DestroyArt msgAlert={props.msgAlert} user={props.user} />
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default UpdateArtModal
