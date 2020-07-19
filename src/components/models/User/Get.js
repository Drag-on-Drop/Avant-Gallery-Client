import React, { Component } from 'react'
import { getUser } from '../../../api/user'
import messages from '../../Alerts/messages'
import { CardColumns, Card } from 'react-bootstrap'

class GetUser extends Component {
  constructor (props) {
    super(props)

    this.state = { user: null }
  }

  componentDidMount () {
    const id = this.props.match.params.id
    getUser(id)
      .then(res => {
        console.log('got the user', res.data.user)
        this.setState({
          // name: response.data.user.name,
          // location: response.data.user.location,
          // biography: response.data.user.biography,
          user: res.data.user,
          notFound: false
        })
      })
      .catch(error => {
        this.setState({
          user: null,
          notFound: true
        })
        this.props.msgAlert({
          heading: 'Could not find that user: ' + error.message,
          message: messages.showUserFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    if (!this.state.user && !this.state.notFound) {
      return (
        <div className="loading-user">
          <p>Loading...</p>
        </div>
      )
    }

    if (this.state.notFound) {
      return (
        <div className="user-not-found">
          <p>Sorry, we could not find that user.</p>
        </div>
      )
    }

    const { name, location, biography } = this.state.user

    return (
      <React.Fragment>
        <br />
        <div className="show-user">
          <h1>{name}</h1>
          <p style={{ color: 'grey' }}>{location}</p>
          <br />
          <p>{biography}</p>
        </div>

        <div>
          <CardColumns>
            {this.state.user.image.map((image) => (
              <Card key={image._id}>
                <Card.Img variant="top" src={image.imageUrl} />
                <Card.Body>
                  <Card.Title>{image.name}</Card.Title>
                  <Card.Text>{image.owner.name}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Posted at {image.createdAt}</small>
                </Card.Footer>
              </Card>
            ))}
          </CardColumns>
        </div>
      </React.Fragment>
    )
  }
}

export default GetUser
