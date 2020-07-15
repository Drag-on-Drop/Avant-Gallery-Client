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

export const showArtwork = (formData, user) => {
  return axios({
    url: apiUrl + '/artworks',
    method: 'GET',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: formData
  })
}

export const deleteArtwork = (formData, user) => {
  return axios({
    url: apiUrl + '/artworks',
    method: 'DELETE',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const editArtwork = (formData, user) => {
  return axios({
    url: apiUrl + '/artworks',
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: formData
  })
}
