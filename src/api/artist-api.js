import apiUrl from '../apiConfig'
import axios from 'axios'

export const showArtist = (artistId) => {
  return axios({
    url: apiUrl + `/artists/${artistId}`,
    method: 'GET'
  })
}
