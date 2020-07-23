import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { deleteImage } from '../../api/image'
import messages from '../alert/messages'
import Button from 'react-bootstrap/Button'

class DeleteImage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      destroyed: false
    }
  }

  onDelete = event => {
    const { user, history, msgAlert } = this.props
    deleteImage(this.props.match.params.id, user)
      .then(() => {
        this.setState({ destroyed: true })
        msgAlert({
          heading: 'Delete Success',
          message: messages.artDeleteSuccess,
          variant: 'success'
        })
        history.push('/')
      })
      .catch(error => {
        this.setState({ destroyed: false })
        msgAlert({
          heading: 'Failed to delete: ' +
          error.message,
          message: messages.artDeleteFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    return (
      <Button variant="danger" onClick={this.onDelete}>Delete</Button>
    )
  }
}

export default withRouter(DeleteImage)
