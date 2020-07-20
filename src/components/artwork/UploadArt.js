import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { addS3Artwork } from '../../api/artwork'
import messages from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
// import { File } from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class UploadArt extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      imageUrl: null
    }
  }

  handleChange = event => {
    // const editedField =
    // Object.assign({}, this.state, editedField)
    if (event.target.files) {
      console.log(event.target.files, 'what is event.target.files')
      this.setState({
        imageUrl: event.target.files[0]
      })
      console.log(this.state.imageUrl, 'what is state image url')
    } else {
      this.setState({
        [event.target.name]: event.target.value
      })
    }
  }

  createArt = event => {
    event.preventDefault()
    console.log('create art!', event.target)
    const { msgAlert, history, setArt, user } = this.props
    let link = ''

    const formData = new FormData()
    formData.append('name', this.state.name)
    formData.append('imageUrl', this.state.imageUrl)
    formData.append('description', this.state.description)

    addS3Artwork('multipart/form-data', formData, user)
      .then(res => {
        link = res.data.artwork._id
        setArt(res.data.artwork)
      })
      .then(() => msgAlert({
        heading: 'Upload Success',
        message: messages.artUploadSuccess,
        variant: 'success'
      }))
      // Redirect to /artworks/:id
      .then(() => history.push(`/artworks/${link}`))
      .catch(error => {
        this.setState({ name: '', description: '', imageUrl: '' })
        msgAlert({
          heading: 'Failed to post: ' + error.message,
          message: messages.artUploadFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { name, description } = this.state

    return (
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <h3>Post your art here</h3>
        <Form onSubmit={this.createArt}>
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
              type="file"
              name="imageUrl"
              placeholder="Enter Image Url"
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

export default withRouter(UploadArt)
