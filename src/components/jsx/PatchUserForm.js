import React from 'react'
import { Form, Button } from 'react-bootstrap'

const PatchUserForm = props => {
  return (
    <div className="col-sm-10 col-md-6 mx-auto mt-5">
      <h3>Update User</h3>
      <Form onSubmit={props.onPatchUser}>
        <Form.Group controlId="Name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            value={props.state.name}
            type="string"
            placeholder="Name"
            onChange={props.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="location">
          <Form.Label>Location</Form.Label>
          <Form.Control
            name="location"
            value={props.state.location}
            type="string"
            placeholder="Location"
            onChange={props.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="Biography">
          <Form.Label>Biography</Form.Label>
          <Form.Control
            name="biography"
            value={props.state.biography}
            type="string"
            placeholder="Biography"
            as="textarea"
            onChange={props.handleChange}
          />
        </Form.Group>
        <Button variant="dark" type="submit" size="sm">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default PatchUserForm
