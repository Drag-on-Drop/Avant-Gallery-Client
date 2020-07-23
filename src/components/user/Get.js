import React, { Component } from 'react'

import { getUser } from '../../api/user'
import { getUserArt } from '../../api/image'
import messages from '../alert/messages'
import ArtCardColumns from '../jsx/ArtCardColumns'

class ShowUser extends Component {
  constructor (props) {
    super(props)

    this.state = {
      user: null,
      images: null
    }
  }

  componentDidMount () {
    const id = this.props.match.params.id
    getUser(id)
      .then(response => {
        this.setState({
          user: response.data.user,
          images: response.data.images,
          notFound: false
        })
      })
      .catch(error => {
        this.setState({
          user: null,
          notFound: true
        })
        this.props.msgAlert({
          heading: 'Could not find that user: ' + error.message,
          message: messages.getUserFailure,
          variant: 'danger'
        })
      })
    // get image by this user
    getUserArt(id)
      .then(response => {
        console.log('show user image', response)
        this.setState({
          images: response.data.images
        })
        console.log('state', this.state)
      })
      .catch(error => {
        this.setState({
          images: null
        })
        this.props.msgAlert({
          heading: 'Could not retrieve image for this user: ' + error.message,
          message: messages.getUserArtFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    if (!this.state.user && !this.state.notFound) {
      return (
        <div className="loading-user">
          <p>Loading...</p>
        </div>
      )
    }

    if (this.state.notFound) {
      return (
        <div className="user-not-found">
          <p>Could not find that user. Sorry :(</p>
        </div>
      )
    }

    let artCards = ''
    if (this.state.images) {
      artCards = <ArtCardColumns artList={this.state.images} />
    }

    const { name, location, biography } = this.state.user

    return (
      <React.Fragment>
        <br />
        <div className="show-user">
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

export default ShowUser
