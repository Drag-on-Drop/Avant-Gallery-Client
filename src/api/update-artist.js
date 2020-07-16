import apiUrl from '../apiConfig'
import axios from 'axios'

export const updateArtist = (artist, user) => {
  return axios({
    url: apiUrl + '/update-artist',
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      credentials: {
        name: artist.name,
        location: artist.location,
        biography: artist.biography
      }
    }
  })
}
