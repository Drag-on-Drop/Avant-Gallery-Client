import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { updateArt } from '../../api/artwork'
import messages from '../AutoDismissAlert/messages'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class UpdateArt extends Component {
  constructor (props) {
    super(props)
    this.state = {
      artwork: props.artwork,
      name: props.artwork.name,
      description: props.artwork.description
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onUpdateArt = event => {
    event.preventDefault()
    // pass msgAlert, in the props
    const { user, history, setArt, msgAlert, match } = this.props
    const artwork = {
      name: this.state.name,
      description: this.state.description
    }
    updateArt(artwork, match.params.id, user)
      .then(() => {
        setArt(this.state.artwork)
        return this.state.artwork
      })
      .then(() => msgAlert({
        heading: 'Edit Success',
        message: messages.artEditSuccess,
        variant: 'success'
      }))
      // .then(() => history.push(`/artworks/${match.params.id}`))
      .then(() => history.push('/'))
      .catch(error => { console.log('the error is:', error) })
      // msgAlert({
      //   heading: 'Oh no! Edit Failure: ' + error.message,
      //   message: messages.artEditFailure,
      //   variant: 'danger'
      // })
  }
  render () {
    const { name, description } = this.state
    // bootstrap form
    return (
      <div>
        <h3>Edit this art piece</h3>
        <Form onSubmit={this.onUpdateArt}>
          <Form.Group controlId="name">
            <Form.Label>Piece Title</Form.Label>
            <Form.Control
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
              type="text"
              name="description"
              value={description}
              placeholder="Enter Description"
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
