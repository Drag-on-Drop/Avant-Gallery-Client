import apiUrl from '../apiConfig'
import axios from 'axios'

export const addArtwork = (formData, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/artworks',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: formData
  })
}

// s3 upload
export const addS3Artwork = (contentType, formData, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/post-artwork',
    headers: {
      'Authorization': `Token token=${user.token}`,
      'Content-Type': contentType
    },
    data: formData
  })
}

export const showArtwork = (artId) => {
  return axios({
    url: apiUrl + `/artworks/${artId}`,
    method: 'GET'
  })
}

export const indexArtwork = () => {
  return axios({
    url: apiUrl + '/artworks/',
    method: 'GET'
  })
}

export const showArtistArt = (artistId) => {
  return axios({
    url: apiUrl + `/artworks/user/${artistId}`
  })
}

// export const indexArtistArtwork = (artistId) => {
//   return axios({
//     url: apiUrl + `/artworks/${artistId}`,
//     method: 'GET'
//   })
// }

export const deleteArtwork = (artId, user) => {
  return axios({
    url: apiUrl + `/artworks/${artId}`,
    method: 'DELETE',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const editArtwork = (formData, artId, user) => {
  return axios({
    url: apiUrl + `/artworks/${artId}/patch`,
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: formData
  })
}
