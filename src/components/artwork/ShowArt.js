import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { showArtwork } from '../../api/artwork'
import UpdateArtModal from './UpdateModal'
import messages from '../AutoDismissAlert/messages'
import { Image, Container, Row, Col, Button } from 'react-bootstrap'

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
      .then(res => {
        this.setState({
          art: res.data.artwork,
          notFound: false
        })
      })
      .then(() => this.props.setArt(this.state.art))
      .catch(error => {
        this.setState({
          art: null,
          notFound: true
        })
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
    const { user, msgAlert } = this.props

    let ownerButtons = ''
    if (user && owner._id === user._id) {
      ownerButtons = (
        <div>
          <Link to={`/artwork/${this.props.match.params.id}/patch`}>
            <Button variant="info">Edit Artwork</Button>
          </Link>
          <UpdateArtModal {...this.props} name={name} description={description} user={user} msgAlert={msgAlert} />
        </div>
      )
    }

    // Some of these paragraphs should be pulled into a React component
    return (
      <div className="show-art">
        <br />
        <Container>
          <Row>
            <Col>
              <Image src={imageUrl}/>
            </Col>
          </Row>
        </Container>
        <a href={imageUrl}>Download</a>
        <p>{name} by <Link to={`/artists/${owner._id}`}>
          {owner.name}
        </Link>
        </p>
        <p>About the art:</p>
        <p>{description}</p>
        <small className="text-muted">Posted on {createdAt.substring(0, 10)}</small>
        {ownerButtons}
      </div>
    )
  }
}

export default ShowArt
