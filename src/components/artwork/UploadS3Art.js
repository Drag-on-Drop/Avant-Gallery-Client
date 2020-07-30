import React, { useState } from 'react'
import { addS3Artwork } from './../../api/artwork.js'
import messages from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function UploadS3Art (props) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')

  function uploadWithFormData () {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('image', image)

    let link = ''
    const { msgAlert, history, setArt, user } = props
    addS3Artwork('multipart/form-data', formData, user)
      .then(res => {
        link = res.data.artwork._id
        setArt(res.data.artwork)
      })
      .then(() => msgAlert({
        heading: 'Post Art Success',
        message: messages.artUploadSuccess,
        variant: 'success'
      }))
      .then(() => history.push(`/artworks/${link}`))
      .catch(error => {
        setName('')
        setDescription('')
        setImage(null)
        msgAlert({
          heading: 'Failed to post: ' + error.message,
          message: messages.artUploadFailure,
          variant: 'danger'
        })
      })
  }

  return (
    <Form>
      <Form.Group controlId="Title">
        <Form.Label>Image Title</Form.Label>
        <Form.Control
          type="text"
          required
          value={name}
          onChange={(event) => { setName(event.target.value) }}
          placeholder="Title"
        />
      </Form.Group>
      <Form.Group controlId="Description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="textarea"
          required
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Description"
        />
      </Form.Group>
      <Form.Group controlId="File">
        <Form.Label>Image</Form.Label>
        <br />
        <input
          required
          type="file"
          name="image"
          onChange={(event) => setImage(event.target.files[0])} />
      </Form.Group>
      <Button variant="dark" type="button" value="Upload" size="sm" onClick={uploadWithFormData}>
        Submit
      </Button>
    </Form>
  )
}

export default UploadS3Art
