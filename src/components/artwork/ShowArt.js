import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { showArtwork } from '../../api/artwork'
import messages from '../AutoDismissAlert/messages'
import DestroyArt from './DestroyArt'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

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
      .then(res => {
        console.log(res)
        this.setState({
          art: res.data.artwork,
          notFound: false
        })
        console.log('art is:', this.state.art)
        console.log('setArt is:', this.props.setArt)
      })
      .then(() => this.props.setArt(this.state.art))
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

    let ownerButtons = ''
    if (this.props.user && owner._id === this.props.user._id) {
      ownerButtons = (
        <div>
          <Link to={`/artwork/${this.props.match.params.id}/patch`}>
            <Button variant="info">Edit Artwork</Button>
          </Link>
          <DestroyArt msgAlert={this.props.msgAlert} user={this.props.user} />
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
