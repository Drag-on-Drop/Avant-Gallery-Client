import apiUrl from '../apiConfig'
import axios from 'axios'

export const addImage = (formData, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/images',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: formData
  })
}

// s3 upload
export const addS3Image = (contentType, formData, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/post-image',
    headers: {
      'Authorization': `Token token=${user.token}`,
      'Content-Type': contentType
    },
    data: formData
  })
}

export const showImage = (artId) => {
  return axios({
    url: apiUrl + `/images/${artId}`,
    method: 'GET'
  })
}

export const indexImage = () => {
  return axios({
    url: apiUrl + '/images/',
    method: 'GET'
  })
}

export const getUserArt = (userId) => {
  return axios({
    url: apiUrl + `/images/user/${userId}`
  })
}

export const deleteImage = (artId, user) => {
  return axios({
    url: apiUrl + `/images/${artId}`,
    method: 'DELETE',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const editImage = (formData, artId, user) => {
  return axios({
    url: apiUrl + `/images/${artId}/patch`,
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: formData
  })
}

export const getRecentImages = (num) => {
  return axios({
    url: apiUrl + '/images/recent',
    method: 'GET',
    data: { num: num }
  })
}

// export const indexUserImage = (userId) => {
//   return axios({
//     url: apiUrl + `/images/${userId}`,
//     method: 'GET'
//   })
// }
