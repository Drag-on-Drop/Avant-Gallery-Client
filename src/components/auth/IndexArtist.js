import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { indexArtist } from '../../api/artist'
import messages from '../AutoDismissAlert/messages'
import { ListGroup } from 'react-bootstrap'

class IndexArtist extends Component {
  constructor () {
    super()
    this.state = {
      artists: null,
      notFound: false
    }
  }

  componentDidMount () {
    const { msgAlert } = this.props
    indexArtist()
      .then((res) => {
        this.setState({
          artists: res.data.artists,
          notFound: false
        })
      })
      .catch(error => {
        this.setState({
          artists: null,
          notFound: true
        })
        msgAlert({
          heading: 'Could not reach Server: ' + error.message,
          message: messages.indexArtistFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    let jsx
    if (this.state.notFound) {
      jsx = <p>Cannot connect to server.</p>
    } else if (this.state.artists === null) {
      jsx = <p>Loading... </p>
    } else if (this.state.artists.length === 0) {
      jsx = <p>No artists</p>
    } else {
      jsx = (
        <ListGroup>
          {this.state.artists.map(artist => {
            return (
              <ListGroup.Item key={artist._id}>
                <Link to={`/artists/${artist._id}`}>
                  {artist.name}
                </Link>
              </ListGroup.Item>
            )
          })}
        </ListGroup>
      )
    }
    return (
      <div>
        <h3>Artists</h3>
        {jsx}
      </div>
    )
  }
}

export default withRouter(IndexArtist)
