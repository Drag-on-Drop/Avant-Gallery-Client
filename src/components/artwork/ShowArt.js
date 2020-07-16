import React, { Component } from 'react'

import { showArtwork } from '../../api/artwork'
import messages from '../AutoDismissAlert/messages'

class ShowArt extends Component {
  constructor (props) {
    super(props)

    this.state = {
      art: null,
      notFound: false
    }
  }

  componentDidMount () {
    showArtwork(this.props.match.params.id)
      .then(response => {
        console.log(response)
        this.setState({
          art: response.data.artwork,
          notFound: false
        })
      })
      .catch(error => {
        this.setState({
          art: null,
          notFound: true
        })
        console.error(error)
        this.props.msgAlert({
          heading: 'Could not find that art: ' + error.message,
          message: messages.showArtFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    if (!this.state.art && !this.state.notFound) {
      return (
        <div className="loading-art">
          <p>Loading...</p>
        </div>
      )
    }

    if (this.state.notFound) {
      return (
        <div className="art-not-found">
          <p>Could not find that art piece. Sorry :(</p>
        </div>
      )
    }

    const { imageUrl, name, description, owner } = this.state.art

    return (
      <div className="show-art">
        <a href={imageUrl}>{imageUrl}</a>
        <p>{name}, by {owner}</p>
        <p>{description}</p>
      </div>
    )
  }
}

export default ShowArt
