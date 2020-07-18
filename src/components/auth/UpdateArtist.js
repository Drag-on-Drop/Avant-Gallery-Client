import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { updateArtist } from '../../api/artist'
import messages from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import Col from 'react-bootstrap/Col'

class UpdateArtist extends Component {
  constructor () {
    super()

    this.state = {
      name: this.props.user.name,
      location: this.props.user.location,
      biography: this.props.user.biography
    }
  }

  handleChange = event => this.setState({ [event.target.name]: event.target.value
  })

  onUpdateArtist = event => {
    event.preventDefault()

    const { msgAlert, history, user } = this.props

    updateArtist(this.state, user)
      // .then(console.log(user, 'what is user'))
      .then(() => msgAlert({
        heading: 'Update Artist Success',
        message: messages.updateArtistSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/'))
      .catch(error => {
        this.setState({ name: '', location: '', biography: '', email: '' })
        msgAlert({
          heading: 'Update Artist Failed with error: ' + error.message,
          message: messages.updateArtistFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { name, location, biography } = this.state

    return (
      // <div className="row">
      // <div className="col-sm-10 col-md-8 mx-auto mt-5">
      <div className="col-sm-10 col-md-6 mx-auto mt-5">
        <h3>Update Artist</h3>
        <Form onSubmit={this.onUpdateArtist}>
          <Form.Group controlId="Name">
            <Form.Label>Name</Form.Label>
            <Form.Control

              name="name"
              value={name}
              type="string"
              placeholder="Name"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="location">
            <Form.Label>Location</Form.Label>
            <Form.Control

              name="location"
              value={location}
              type="string"
              placeholder="Location"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="Biography">
            <Form.Label>Biography</Form.Label>
            <Form.Control

              name="biography"
              value={biography}
              type="string"
              placeholder="Biography"
              as="textarea"
              onChange={this.handleChange}
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
      // </div>
      // </div>
    )
  }
}

export default withRouter(UpdateArtist)
