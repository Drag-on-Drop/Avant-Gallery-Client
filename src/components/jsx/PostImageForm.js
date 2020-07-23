import React from 'react'
import { Form, Button } from 'react-bootstrap'

const PostImageForm = props => {
  return (
    <Form>
      <Form.Group controlId="Title">
        <Form.Label>Image Title</Form.Label>
        <Form.Control
          type="text"
          required
          value={props.name}
          onChange={(event) => { props.setName(event.target.value) }}
          placeholder="Title"
        />
      </Form.Group>

      <Form.Group controlId="Description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="textarea"
          required
          value={props.description}
          onChange={(event) => props.setDescription(event.target.value)}
          placeholder="Description"
        />
      </Form.Group>

      <Form.Group controlId="File">
        <Form.Label>Image</Form.Label>
        <input required
          type="file"
          name="image"
          onChange={(event) => props.setImage(event.target.files[0])} />
      </Form.Group>
      <Button
        variant="primary"
        type="button"
        value="Upload"
        onClick={props.uploadWithFormData}>
        Submit
      </Button>
    </Form>
  )
}

export default PostImageForm
