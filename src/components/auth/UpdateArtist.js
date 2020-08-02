import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { updateArtist } from '../../api/artist'
import messages from '../AutoDismissAlert/messages'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class UpdateArtist extends Component {
  constructor (props) {
    super(props)
    this.state = {
      editedUser: this.props.user
    }
  }

  handleChange = event => {
    const editedUser = Object.assign({}, this.state.editedUser)
    editedUser[event.target.name] = event.target.value
    this.setState((prevUser) => ({ editedUser: editedUser }))
  }

  onUpdateArtist = event => {
    event.preventDefault()
    const { msgAlert, history, user, setUser } = this.props
    updateArtist(this.state.editedUser, user)
      .then(() => setUser(this.state.editedUser))
      .then(() => msgAlert({
        heading: 'Update Artist Success',
        message: messages.updateArtistSuccess,
        variant: 'success'
      }))
      .then(() => history.push(`/artists/${this.state.editedUser._id}`))
      .catch(error => {
        this.setState({ editedUser: this.props.user })
        msgAlert({
          heading: 'Update Artist Failed with error: ' + error.message,
          message: messages.updateArtistFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { name, location, biography } = this.state.editedUser

    return (
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
          <Button variant="dark" type="submit" size="sm">
            Submit
          </Button>
        </Form>
      </div>

    )
  }
}

export default withRouter(UpdateArtist)
