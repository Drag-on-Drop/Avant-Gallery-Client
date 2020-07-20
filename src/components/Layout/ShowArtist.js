import React, { Component } from 'react'

import { showArtist } from '../../api/artist-api'
import messages from '../AutoDismissAlert/messages'
import ArtCardColumns from './../artwork/ArtCardColumns'

class ShowArtist extends Component {
  constructor (props) {
    super(props)

    this.state = { artist: null }
  }

  componentDidMount () {
    const id = this.props.match.params.id
    showArtist(id)
      .then(response => {
        console.log(response)
        this.setState({
          artist: response.data.artist,
          notFound: false
        })
      })
      .catch(error => {
        this.setState({
          artist: null,
          notFound: true
        })
        console.error(error)
        this.props.msgAlert({
          heading: 'Could not find that artist: ' + error.message,
          message: messages.showArtistFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    if (!this.state.artist && !this.state.notFound) {
      return (
        <div className="loading-artist">
          <p>Loading...</p>
        </div>
      )
    }

    if (this.state.notFound) {
      return (
        <div className="artist-not-found">
          <p>Could not find that artist. Sorry :(</p>
        </div>
      )
    }

    const { name, location, biography } = this.state.artist

    return (
      <React.Fragment>
        <br />
        <div className="show-artist">
          <h1>{name}</h1>
          <p style={{ color: 'grey' }}>{location}</p>
          <br />
          <p>{biography}</p>
        </div>
        <ArtCardColumns artList={this.state.artist.artwork} />
      </React.Fragment>
    )
  }
}

export default ShowArtist
