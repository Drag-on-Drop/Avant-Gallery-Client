import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { patchImage } from '../../../api/image'
import messages from '../../Alerts/messages'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class PatchImage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: props.image.name,
      description: props.image.description,
      edited: false
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onUpdateArt = event => {
    event.preventDefault()

    const { user, history, msgAlert, setImage } = this.props

    editArt(this.state, user)
      .then(res => {
        const image = res.data.image
        setImage(image)
        this.setState({
          image: image,
          edited: true
        })
        msgAlert({
          heading: 'Edit Success',
          message: messages.patchImageSuccess,
          variant: 'success'
        })
        return image
      })
      .then(image => history.push(`/images/${image._id}`))
      .catch(error => {
        msgAlert({
          heading: 'Edit Failure: ' + error.message,
          message: messages.patchImageFailure,
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
        <h3>Edit this image piece</h3>
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
            <Form.Label>User Url</Form.Label>
            <Form.Control
              required
              type="text"
              name="imageUrl"
              value={imageUrl}
              placeholder="Enter User Url"
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
    )
  }
}

export default withRouter(PatchImage)
