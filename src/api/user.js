import apiUrl from '../apiConfig'
import axios from 'axios'

export const patchUser = (state, user) => {
  // console.log('what is user', user)
  // console.log('what is id', id)
  // console.log('this is the token', user.token)
  return axios({
    url: apiUrl + `/artists/${user._id}/patch`,
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      credentials: {
        name: state.name,
        location: state.location,
        biography: state.biography,
        email: state.email
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
