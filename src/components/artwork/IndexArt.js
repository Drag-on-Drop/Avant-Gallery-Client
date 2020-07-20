import React, { Component } from 'react'
import { indexArtwork } from '../../api/artwork'
import ArtCardColumns from './ArtCardColumns'
import messages from '../AutoDismissAlert/messages'

class IndexArt extends Component {
  constructor (props) {
    super(props)

    this.state = {
      artworks: []
      // pageNumber: 1
    }
  }

  componentDidMount () {
    indexArtwork()
      .then(response => this.setState({
        artworks: response.data.artworks
      }))
      .then(console.log('user logged in is:', this.props.user))
      .catch(error => {
        this.setState({
          artworks: null
        })
        this.props.msgAlert({
          heading: 'Could not reach server: ' + error.message,
          message: messages.indexArtFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    console.log('render art', this.state.artworks)
    if (!this.state.artworks) {
      return (
        <div className="index-not-found">
          <p>Could not connect to server, please try again.</p>
        </div>
      )
    }
    return (
      <div>
        <br/>
        <ArtCardColumns artList={this.state.artworks} />
      </div>
    )
  }
}

export default IndexArt
