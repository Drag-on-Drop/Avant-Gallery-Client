import React, { Component } from 'react'
import { getImage } from '../../../api/image'
import messages from '../../Alerts/messages'

class GetImage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      image: null,
      notFound: false
    }
  }

  componentDidMount () {
    getImage(this.props.match.params.id)
      .then(res => {
        this.setState({
          image: res.data.image,
          notFound: false
        })
      })
      .catch(error => {
        this.setState({
          image: null,
          notFound: true
        })
        console.error(error)
        this.props.msgAlert({
          heading: 'Could not find that image: ' + error.message,
          message: messages.showArtFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    if (!this.state.image && !this.state.notFound) {
      return (
        <div className="loading-image">
          <p>Loading...</p>
        </div>
      )
    }
    if (this.state.notFound) {
      return (
        <div className="image-not-found">
          <p>Sorry, we could not find that particular piece of image.</p>
        </div>
      )
    }

    const { imageUrl, name, description, owner, createdAt } = this.state.image

    // Some of these paragraphs should be pulled into a React component
    return (
      <div className="show-image">
        <a href={imageUrl}>{imageUrl}</a>
        <p>{name}, by {owner.name}</p>
        <p>Description: {description}</p>
        <p>Email: {owner.email}</p>
        <p>Location: {owner.location}</p>
        <p>Biography: {owner.biography}</p>
        <p>Posted on: {createdAt}</p>
      </div>
    )
  }
}

export default GetImage
