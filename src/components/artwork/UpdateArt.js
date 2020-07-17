import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { editArt } from '../../api/artwork'
import messages from '../AutoDismissAlert/messages'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class UpdateArt extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: props.artwork.name,
      description: props.artwork.description,
      edited: false
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onUpdateArt = event => {
    event.preventDefault()

    const { user, history, msgAlert, setArt } = this.props

    editArt(this.state, user)
      .then(res => {
        const artwork = res.data.artwork
        setArt(artwork)
        this.setState({
          artwork: artwork,
          edited: true
        })
        msgAlert({
          heading: 'Edit Success',
          message: messages.artEditSuccess,
          variant: 'success'
        })
        return artwork
      })
      .then(artwork => history.push(`/artworks/${artwork._id}`))
      .catch(error => {
        msgAlert({
          heading: 'Edit Failure: ' + error.message,
          message: messages.artEditFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    //
    const { name, description, imageUrl } = this.state
    // bootstrap form
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
          <Form.Group controlId="ImgUrl">
            <Form.Label>Image Url</Form.Label>
            <Form.Control
              required
              type="text"
              name="imageUrl"
              value={imageUrl}
              placeholder="Enter Image Url"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </div>
    )
  }
}

export default withRouter(UpdateArt)
