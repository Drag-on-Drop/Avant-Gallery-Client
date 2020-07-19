import apiUrl from '../apiConfig'
import axios from 'axios'

export const patchUser = (user) => {
  // console.log('what is user', user._id)
  return axios({
    url: apiUrl + '/patch-user',
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      credentials: {
        name: user.name,
        location: user.location,
        biography: user.biography,
        email: user.email
      }
    }
  })
}

export const indexUser = () => {
  return axios({
    url: apiUrl + '/artists',
    method: 'GET'
  })
}

export const getUser = (userId) => {
  return axios({
    url: apiUrl + `/artists/${userId}`,
    method: 'GET'
  })
}
