import React, { Component } from 'react'

import { showArtist } from '../../api/artist-api'
import messages from '../AutoDismissAlert/messages'
import { CardColumns, Card } from 'react-bootstrap'

class ShowArtist extends Component {
  constructor (props) {
    super(props)

    this.state = { artist: null }

  //   this.state = {
  //     name: null,
  //     location: null,
  //     biography: null,
  //     notFound: null
  //   }
  }

  componentDidMount () {
    const id = this.props.match.params.id
    showArtist(id)
      .then(response => {
        console.log(response)
        this.setState({
          // name: response.data.artist.name,
          // location: response.data.artist.location,
          // biography: response.data.artist.biography,
          artist: response.data.artist,
          notFound: false
        })
      })
      .catch(error => {
        this.setState({
          artist: null,
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
    if (!this.state.artist && !this.state.notFound) {
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

    const { name, location, biography } = this.state.artist

    return (
      <React.Fragment>
        <div className="show-artist">
          <h1>{name}</h1>
          <h4>{location}</h4>
          <p>{biography}</p>
        </div>

        <div>
          <CardColumns>
            {this.state.artist.artwork.map((art) => (
              <Card key={art._id}>
                <Card.Img variant="top" src={art.imageUrl} />
                <Card.Body>
                  <Card.Title>{art.name}</Card.Title>
                  <Card.Text>{art.owner.name}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Posted at {art.createdAt}</small>
                </Card.Footer>
              </Card>
            ))}
          </CardColumns>
        </div>
      </React.Fragment>
    )
  }
}

export default ShowArtist
