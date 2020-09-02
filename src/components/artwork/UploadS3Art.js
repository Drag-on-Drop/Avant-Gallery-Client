import React, { useState } from 'react'
import { addS3Artwork } from './../../api/artwork.js'
import messages from '../AutoDismissAlert/messages'
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap'

function UploadS3Art (props) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [url, setUrl] = useState('')
  const hiddenFileInput = React.useRef(null)

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
        console.log('artwork is: ', res.data.artwork)
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
      <Container>
        <Row className='justify-content-md-center'>
          <Col md='auto'>
            <br />
            <Form.Group controlId='Title'>
              <Form.Label>Image Title</Form.Label>
              <Form.Control
                type='text'
                required
                value={name}
                onChange={e => { setName(e.target.value) }}
                placeholder='Title'
              />
            </Form.Group>
            <Form.Group controlId='Description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='textarea'
                required
                rows='2'
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder='Description'
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className='justify-content-md-center'>
          <Col md='auto'>
            <Form.Group controlId='File'>
              <input
                type='file'
                ref={hiddenFileInput}
                style={{ display: 'none' }}
                onChange={e => {
                  setImage(e.target.files[0])
                  setUrl(URL.createObjectURL(e.target.files[0]))
                }}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className='justify-content-md-center'>
          <Col md='auto'>
            <Button
              onClick={() => hiddenFileInput.current.click()}
              variant='secondary' type='button' size='sm'>
              Upload Image
            </Button>
            <Button
              variant='dark' type='button'
              value='Upload' size='sm'
              onClick={uploadWithFormData}>
              Submit
            </Button>
            <br/>
          </Col>
        </Row>
        <Row className='justify-content-md-center'>
          <Col md='auto'>
            <br/>
            <Image className='thumbnail' src={url} />
          </Col>
        </Row>
      </Container>
    </Form>
  )
}

export default UploadS3Art
