import React from 'react'
import { Form, Button } from 'react-bootstrap'

const SignInForm = props => {
  return (
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <h3>Sign In</h3>
        <Form onSubmit={props.onSignIn}>
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
          <Button variant="dark" type="submit" size="sm">Submit</Button>
        </Form>
      </div>
    </div>
  )
}

export default SignInForm
