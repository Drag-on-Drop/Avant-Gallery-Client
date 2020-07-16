import React, { Component } from 'react'

import { showArtist } from '../../api/artist-api'
import messages from '../AutoDismissAlert/messages'

class ShowArtist extends Component {
  constructor (props) {
    super(props)

    // this.state = { user: null }

    this.state = {
      name: null,
      location: null,
      biography: null
    }
  }

  componentDidMount () {
    showArtist(this.props.match.params.id)
      .then(response => {
        console.log(response)
        this.setState({
          name: response.data.user.name,
          location: response.data.user.location,
          biography: response.data.user.biography,
          notFound: false
        })
      })
      .catch(error => {
        this.setState({
          name: null,
          location: null,
          biography: null,
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
    if (!this.state.art && !this.state.notFound) {
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

    const { name, location, biography } = this.state

    return (
      <div className="show-artist">
        <h1>{name}</h1>
        <h4>{location}</h4>
        <p>{biography}</p>
      </div>
    )
  }
}

export default ShowArtist
