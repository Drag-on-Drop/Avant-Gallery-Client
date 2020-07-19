import apiUrl from '../apiConfig'
import axios from 'axios'

export const postImage = (formData, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/images',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: formData
  })
}

export const getImage = (imageId) => {
  return axios({
    url: apiUrl + `/images/${imageId}`,
    method: 'GET'
  })
}

export const indexImage = () => {
  return axios({
    url: apiUrl + '/images/',
    method: 'GET'
  })
}

export const deleteImage = (imageId, user) => {
  return axios({
    url: apiUrl + `/images/${imageId}`,
    method: 'DELETE',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const patchImage = (formData, imageId, user) => {
  return axios({
    url: apiUrl + `/images/${imageId}`,
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: formData
  })
}
