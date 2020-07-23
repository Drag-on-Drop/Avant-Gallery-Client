import React from 'react'
import { Form, Button } from 'react-bootstrap'

const PatchForm = props => {
  return (
    <div>
      <h3>Edit this image piece</h3>
      <Form onSubmit={props.onPatchImage}>

        <Form.Group controlId="name">
          <Form.Label>Piece Title</Form.Label>
          <Form.Control
            required
            type="text"
            name="name"
            value={props.name}
            placeholder="Enter Piece Title"
            onChange={props.handleChange}
          />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            required
            type="text"
            name="description"
            value={props.description}
            placeholder="Enter Description"
            onChange={props.handleChange}
          />
        </Form.Group>

        <Button
          variant="dark"
          type="submit"
          size="sm"
        >
          Submit
        </Button>

      </Form>
    </div>
  )
}

export default PatchForm
