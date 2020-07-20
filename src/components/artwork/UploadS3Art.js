import React, { useState } from 'react'
import { addS3Artwork } from './../../api/artwork.js'

function UploadS3Art (props) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')

  function uploadWithFormData () {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('image', image)
    formData.append('description', description)

    addS3Artwork('multipart/form-data', formData, props.user)
  }

  return (
    <form>
      <label>
      Image Title
        <input type="text" value={name}
          onChange={(event) => { setName(event.target.value) }}
          placeholder="give a title to your upload" />
      </label>

      <label>
      Description
        <textarea value={description}
          onChange={(event) => setDescription(event.target.value)}></textarea>
      </label>

      <label>
      Image
        <input type="file" name="image"
          onChange={(event) => setImage(event.target.files[0])} />
      </label>

      <input type="button" value="Upload as Form" onClick={uploadWithFormData} />
    </form>
  )
}

export default UploadS3Art
