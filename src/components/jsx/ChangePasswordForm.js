import React from 'react'
import { Form, Button } from 'react-bootstrap'

const ChangePasswordForm = props => {
  return (
    <div className="col-sm-10 col-md-6 mx-auto mt-5">
      <h3>Change Password</h3>
      <Form onSubmit={props.onChangePassword}>
        <Form.Group controlId="oldPassword">
          <Form.Label>Old password</Form.Label>
          <Form.Control
            required
            name="oldPassword"
            value={props.oldPassword}
            type="password"
            placeholder="Old Password"
            onChange={props.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="newPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            required
            name="newPassword"
            value={props.newPassword}
            type="password"
            placeholder="New Password"
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

export default ChangePasswordForm
