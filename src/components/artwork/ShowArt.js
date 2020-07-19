import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { showArtwork } from '../../api/artwork'
import messages from '../AutoDismissAlert/messages'
import UpdateArt from './UpdateArt'

class ShowArt extends Component {
  constructor (props) {
    super(props)

    this.state = {
      user: props.user,
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
        this.props.setArt(this.state.art)
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

    const { imageUrl, name, description, owner, createdAt } = this.state.art
    let editForm = ''

    console.log('user?', this.props.user)
    console.log('state user?', this.state.user)
    if (this.state.user) {
      console.log('user? in if', this.props.user)
      console.log('state user? in if', this.state.user)
      editForm = <UpdateArt
        artwork={this.state.art}
        msgAlert={this.props.msgAlert}
        user={this.props.user}
        setArt={this.props.setArt} />
    }

    // Some of these paragraphs should be pulled into a React component
    return (
      <div className="show-art">
        <a href={imageUrl}>{imageUrl}</a>
        <p>{name}, by <Link to={`/artists/${owner._id}`}>
          {owner.name}
        </Link>
        </p>
        <p>Description: {description}</p>
        <p>Email: {owner.email}</p>
        <p>Location: {owner.location}</p>
        <p>Biography: {owner.biography}</p>
        <p>Posted on: {createdAt}</p>
        {editForm}
      </div>
    )
  }
}

export default ShowArt
