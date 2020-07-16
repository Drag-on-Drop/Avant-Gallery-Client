import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { indexArtist } from '../../api/artist'
import messages from '../AutoDismissAlert/messages'

class IndexArtist extends Component {
  constructor () {
    super()
    this.state = {
      artists: null
    }
  }
  onIndexArtist = event => {
    event.preventDefault()
    const { msgAlert } = this.props
    indexArtist()
      .then(() => msgAlert({
        heading: 'Update Artist Success',
        message: messages.updateArtistSuccess,
        variant: 'success'
      }))
      .then((res) => {
        this.setState({
          artists: res.data.artist
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
  render () {
    let jsx
    if (this.state.artists === null) {
      jsx = <p>Loading... </p>
    } else if (this.state.books.length === 0) {
      jsx = <p>No artists</p>
    } else {
      jsx = (
        <ul>
          {this.state.artists.map(artist => {
            return (
              <li key={artist._id}>
                <Link to={`/artists/${artist._id}`}>
                  {artist.name}
                </Link>
              </li>
            )
          })}
        </ul>
      )
    }
    return (
      <div>
        <h2>Artist Page</h2>
        {jsx}
      </div>
    )
  }
}

export default withRouter(IndexArtist)
