import React, { Component } from 'react'
import { indexImage } from '../../../api/image'
import messages from '../../Alerts/messages'
import { CardColumns, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class IndexImage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      images: []
      // pageNumber: 1
    }
  }

  componentDidMount () {
    indexImage()
      .then(res => {
        this.setState({
          images: res.data.images
        })
      })
      .catch(error => {
        this.setState({
          images: null
        })
        this.props.msgAlert({
          heading: 'Could not reach server: ' + error.message,
          message: messages.indexArtFailure,
          variant: 'danger'
        })
      })
  }
  render () {
    if (!this.state.images) {
      return (
        <div className="index-not-found">
          <p>We could not connect to the server, please try again later.</p>
        </div>
      )
    }
    return (
      <div>
        <br/>
        <CardColumns>
          {this.state.images.map((image) => (
            <Link to={`/images/${image._id}`} key={image._id}>
              <Card>
                <Card.Img variant="top" src={image.imageUrl} />
                <Card.Body>
                  <Card.Title>{image.name}</Card.Title>
                  <Card.Text>{image.owner.name}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Posted at {image.createdAt}</small>
                </Card.Footer>
              </Card>
            </Link>
          ))}
        </CardColumns>
      </div>
    )
  }
}

export default IndexImage
