import React, { Component } from 'react'

import { showArtist } from '../../api/artist-api'
import { showArtistArt } from '../../api/artwork'
import messages from '../AutoDismissAlert/messages'
import ArtCardColumns from './../artwork/ArtCardColumns'

class ShowArtist extends Component {
  constructor (props) {
    super(props)

    this.state = {
      artist: null,
      artworks: null
    }
  }

  componentDidMount () {
    const id = this.props.match.params.id
    showArtist(id)
      .then(response => {
        this.setState({
          artist: response.data.artist,
          artworks: response.data.artworks,
          notFound: false
        })
      })
      .catch(error => {
        this.setState({
          artist: null,
          notFound: true
        })
        this.props.msgAlert({
          heading: 'Could not find that artist: ' + error.message,
          message: messages.showArtistFailure,
          variant: 'danger'
        })
      })
    // get art by this user
    showArtistArt(id)
      .then(response => {
        this.setState({
          artworks: response.data.artworks
        })
      })
      .catch(error => {
        this.setState({
          artworks: null
        })
        this.props.msgAlert({
          heading: 'Could not retrieve art for this artist: ' + error.message,
          message: messages.showArtistArtFailure,
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

    let artCards = ''
    if (this.state.artworks) {
      artCards = <ArtCardColumns artList={this.state.artworks} />
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
        {artCards}
      </React.Fragment>
    )
  }
}

export default ShowArtist
