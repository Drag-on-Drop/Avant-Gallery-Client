import React, { Component } from 'react'
import { showImage } from '../../api/image'
import messages from '../alert/messages'
import { Button } from 'react-bootstrap'
import DeleteImage from './Delete'
import ShowImageContainer from '../jsx/ShowImageContainer'
import { Link } from 'react-router-dom'

class GetImage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      image: null,
      notFound: false
    }
  }

  componentDidMount () {
    showImage(this.props.match.params.id)
      .then(res => {
        this.setState({
          image: res.data.image,
          notFound: false
        })
      })
      .then(() => this.props.setImage(this.state.image))
      .catch(error => {
        this.setState({
          image: null,
          notFound: true
        })
        this.props.msgAlert({
          heading: 'Could not find that image: ' + error.message,
          message: messages.showArtFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    if (!this.state.image && !this.state.notFound) {
      return (<div className="loading-image"><p>Loading...</p></div>)
    }
    if (this.state.notFound) {
      return (<div className="image-not-found"><p>Image Not Found</p></div>)
    }
    const { imageUrl, name, description, owner, createdAt } = this.state.image
    let ownerButtons = ''
    if (this.props.user && owner._id === this.props.user._id) {
      ownerButtons = (
        <div>
          <Link to={`/image/${this.props.match.params.id}/patch`}>
            <Button variant="info">Edit Image</Button>
          </Link>
          <DeleteImage msgAlert={this.props.msgAlert} user={this.props.user} />
        </div>
      )
    }

    return (
      <ShowImageContainer
        imageUrl={imageUrl}
        name={name}
        owner={owner}
        description={description}
        createdAt={createdAt}
        ownerButtons={ownerButtons}
      />
    )
  }
}

export default GetImage
