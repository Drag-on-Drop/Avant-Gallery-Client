import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import DestroyArt from './DestroyArt'
import { editArtwork } from '../../api/artwork'
import messages from '../AutoDismissAlert/messages'
import { Form, Button } from 'react-bootstrap'

class UpdateArt extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: this.props.art.name,
      description: this.props.art.description,
      edited: false
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onUpdateArt = event => {
    event.preventDefault()

    const { user, history, msgAlert, match } = this.props
    editArtwork(this.state, match.params.id, user)
      .then(() => msgAlert({
        heading: 'Edit Success',
        message: messages.artEditSuccess,
        variant: 'success'
      }))
      .then(() => history.push(`/artworks/${this.props.art._id}`))
      .catch(error => {
        msgAlert({
          heading: 'Edit Failure: ' + error.message,
          message: messages.artEditFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { name, description } = this.state
    return (
      <div>
        <h3>Edit this art piece</h3>
        <Form onSubmit={this.onUpdateArt}>
          <Form.Group controlId="name">
            <Form.Label>Piece Title</Form.Label>
            <Form.Control
              required
              type="text"
              name="name"
              value={name}
              placeholder="Enter Piece Title"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              required
              type="text"
              name="description"
              value={description}
              placeholder="Enter Description"
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
        <DestroyArt msgAlert={this.props.msgAlert} user={this.props.user} />
      </div>
    )
  }
}

export default withRouter(UpdateArt)
