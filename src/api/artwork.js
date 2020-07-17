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
    url: apiUrl + `/artworks/${artId}`,
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: formData
  })
}
