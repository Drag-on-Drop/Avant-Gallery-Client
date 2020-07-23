import React, { useState } from 'react'
import { addS3Image } from './../../api/image'
import messages from '../alert/messages'
import PostImageForm from '../jsx/PostImageForm'

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
    const { msgAlert, history, setImage, user } = props
    addS3Image('multipart/form-data', formData, user)
      .then(res => {
        link = res.data.image._id
        setImage(res.data.image)
      })
      .then(() => msgAlert({
        heading: 'Post Art Success',
        message: messages.artUploadSuccess,
        variant: 'success'
      }))
      .then(() => history.push(`/images/${link}`))
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
    <PostImageForm
      name={name}
      setName={setName}
      description={description}
      setDescription={setDescription }
      image={image} setImage={setImage}
      uploadWithFormData={uploadWithFormData}
    />
  )
}

export default UploadS3Art
