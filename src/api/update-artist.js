import apiUrl from '../apiConfig'
import axios from 'axios'

export const updateArtist = (account, user) => {
  return axios({
    url: apiUrl + '/update-artist',
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      account: {
        name: account.name,
        location: account.location,
        biography: account.biography,
        email: account.email
      }
    }
  })
}
