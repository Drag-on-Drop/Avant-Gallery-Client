import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class CreateArt extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      // price: '',
      ImgUrl: ''
    }
  }

  handleChange = event => {
    // const editedField =
    // Object.assign({}, this.state, editedField)
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  createArt = event => {
    console.log('create art!', event.target)
  }

  render () {
    const { name, description, imgUrl } = this.state

    return (
      <div>
        <h3>Post your art here!</h3>
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
              type="text"
              name="imgUrl"
              value={imgUrl}
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

export default CreateArt
