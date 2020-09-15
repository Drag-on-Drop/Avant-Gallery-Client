import React, { Component } from 'react'

import { showArtist } from '../../api/artist-api'
import { showArtistArt } from '../../api/artwork'
import messages from '../AutoDismissAlert/messages'
import ArtCardColumns from './../artwork/ArtCardColumns'
import Spinner from 'react-bootstrap/Spinner'

class ShowArtist extends Component {
  constructor (props) {
    super(props)

    this.state = {
      artist: null,
      artworks: null,
      loadingArt: false
    }
  }

  componentDidMount () {
    const id = this.props.match.params.id
    this.renderArtist(id)
    this.renderArtistArt(id)
  }

  componentDidUpdate (prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      const id = this.props.match.params.id
      this.renderArtist(id)
      this.renderArtistArt(id)
    }
  }

  renderArtist (id) {
    showArtist(id)
      .then(response => {
        this.setState(() => ({
          artist: response.data.artist,
          artworks: response.data.artworks,
          notFound: false
        }))
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
  }

  renderArtistArt (id) {
    showArtistArt(id)
      .then(response => {
        this.setState(() => ({
          artworks: response.data.artworks,
          loadingArt: true
        }))
      })
      .catch(error => {
        this.setState({
          artworks: null,
          loadingArt: false
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
        {this.state.loadingArt ? artCards
          : <div>
            <Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="secondary" />
            <Spinner animation="grow" variant="success" />
            <Spinner animation="grow" variant="danger" />
            <Spinner animation="grow" variant="warning" />
            <Spinner animation="grow" variant="info" />
            <Spinner animation="grow" variant="light" />
            <Spinner animation="grow" variant="dark" />
          </div>}
      </React.Fragment>
    )
  }
}

export default ShowArtist
