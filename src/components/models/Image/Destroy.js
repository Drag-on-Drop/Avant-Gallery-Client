import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { deleteImage } from '../../../api/image'
import messages from '../../Alerts/messages'
import Button from 'react-bootstrap/Button'

class DestroyImage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      destroyed: false
    }
  }

  onDelete = event => {
    const { image, user, history, msgAlert } = this.props
    deleteImage(image.id, user)
      .then(() => {
        this.setState({ destroyed: true })
        msgAlert({
          heading: 'Delete Success',
          message: messages.imageDeleteSuccess,
          variant: 'success'
        })
        history.push('/')
      })
      .catch(error => {
        this.setState({ destroyed: false })
        msgAlert({
          heading: 'Failed to delete: ' +
          error.message,
          message: messages.imageDeleteFailure
        })
      })
  }

  render () {
    return (
      <Button onClick={this.onDelete}>
        Delete
      </Button>
    )
  }
}

export default withRouter(DestroyArt)
