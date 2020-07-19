import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { postImage } from '../../../api/image'
import messages from '../../Alerts/messages'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class PostImage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      // price: '',
      imageUrl: ''
    }
  }

  handleChange = event => {
    // const editedField =
    // Object.assign({}, this.state, editedField)
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  postImage = event => {
    event.preventDefault()
    const { msgAlert, history, setImage, user } = this.props
    let link = ''

    postImage({ image: this.state }, user)
      .then(res => {
        link = res.data.image._id
        setImage(res.data.image)
      })
      .then(() => msgAlert({
        heading: 'Upload Success',
        message: messages.artUploadSuccess,
        variant: 'success'
      }))
      // Redirect to /images/:id
      .then(() => history.push(`/images/${link}`))
      .catch(error => {
        this.setState({ name: '', description: '', imageUrl: '' })
        msgAlert({
          heading: 'Error failed to post image: ' + error.message,
          message: messages.postImageFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { name, description, imageUrl } = this.state

    return (
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <h3>Post your image here</h3>
        <Form onSubmit={this.postImage}>
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

export default withRouter(PostImage)
