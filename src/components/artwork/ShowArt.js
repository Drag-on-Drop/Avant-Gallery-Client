import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { showArtwork } from '../../api/artwork'
import messages from '../AutoDismissAlert/messages'
import DestroyArt from './DestroyArt'

class ShowArt extends Component {
  constructor (props) {
    super(props)
    console.log('initial props are', this.props)
    console.log('initial user is', this.props.user)

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
        // console.log('the owner id inside the state is:', this.state.art.owner._id)
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
    console.log('user inside render is', this.props.user)
    // console.log('inside render the owner id inside the state is:', this.state.art)
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

    // Some of these paragraphs should be pulled into a React component
    return (
      <div className="show-art">
        <img src={imageUrl}/>
        <a href={imageUrl}>Download</a>
        <p>{name}, by <Link to={`/artists/${owner._id}`}>
          {owner.name}
        </Link>
        </p>
        <p>Description: {description}</p>
        <p>Email: {owner.email}</p>
        <p>Location: {owner.location}</p>
        <p>Biography: {owner.biography}</p>
        <p>Posted on: {createdAt}</p>
        < DestroyArt msgAlert={this.props.msgAlert} user={this.props.user} />
      </div>
    )
  }
}

export default ShowArt
