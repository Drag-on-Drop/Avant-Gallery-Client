import React from 'react'
import { Form, Button } from 'react-bootstrap'

const SignUpForm = props => {
  return (
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <h3>Sign Up</h3>
        <Form onSubmit={props.onSignUp}>
          <Form.Group controlId="name">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              required
              type="text"
              name="name"
              value={props.state.name}
              placeholder="Enter name"
              onChange={props.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              type="email"
              name="email"
              value={props.state.email}
              placeholder="Enter email"
              onChange={props.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              name="password"
              value={props.state.password}
              type="password"
              placeholder="Password"
              onChange={props.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="passwordConfirmation">
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control
              required
              name="passwordConfirmation"
              value={props.state.passwordConfirmation}
              type="password"
              placeholder="Confirm Password"
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
    </div>
  )
}

export default SignUpForm
