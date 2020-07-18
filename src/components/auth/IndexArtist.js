import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { indexArtist } from '../../api/artist'
import messages from '../AutoDismissAlert/messages'

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
      .then(() => msgAlert({
        heading: 'Update Artist Success',
        message: messages.updateArtistSuccess,
        variant: 'success'
      }))
      .catch(error => {
        console.log(error)
        this.setState({
          artists: null,
          notFound: true
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
        <ul>
          {this.state.artists.map(artist => {
            return (
              <p key={artist._id}>
                <Link to={`/artists/${artist._id}`}>
                  {artist.name}
                </Link>
              </p>
            )
          })}
        </ul>
      )
    }
    return (
      <div>
        <h3>Artist Page</h3>
        {jsx}
      </div>
    )
  }
}

export default withRouter(IndexArtist)
