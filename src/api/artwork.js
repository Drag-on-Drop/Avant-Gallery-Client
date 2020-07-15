import apiUrl from '../apiConfig'
import axios from 'axios'

export const addArtwork = formData => {
  return axios({
    method: 'POST',
    url: apiUrl + '/artworks',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: formData
  })
}

export const showArtwork = formData => {
  return axios({
    url: apiUrl + '/artworks',
    method: 'GET',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: formData
  })
}

export const deleteArtwork = formData => {
  return axios({
    url: apiUrl + '/artworks',
    method: 'DELETE',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const editArtwork = formData => {
  return axios({
    url: apiUrl + '/artworks',
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: formData
  })
}
