import React, { Component } from 'react'
import { indexArtwork } from '../../api/artwork'
import messages from '../AutoDismissAlert/messages'
import { Link } from 'react-router-dom'
import { CardColumns, Card } from 'react-bootstrap'
import DestroyArt from './DestroyArt'
import UpdateArt from './UpdateArt'

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
      .then(response => {
        console.log(response)
        this.setState({
          artworks: response.data.artworks
        })
      })
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
        <CardColumns>
          {this.state.artworks.map((art) => (
            <Link to={`/artworks/${art._id}`} key={art._id}>
              <Card>
                <Card.Img variant="top" src={art.imageUrl} />
                <Card.Body>
                  <Card.Title>{art.name}</Card.Title>
                  <Card.Text>{art.owner.name}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Posted at {art.createdAt}</small>
                </Card.Footer>
              </Card>
            </Link>
          ))}
        </CardColumns>
        <UpdateArt />
        <DestroyArt />
      </div>
    )
  }
}

export default IndexArt
