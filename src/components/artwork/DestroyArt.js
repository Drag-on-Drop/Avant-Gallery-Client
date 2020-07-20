import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { deleteArtwork } from '../../api/artwork'
import Button from 'react-bootstrap/Button'
import messages from '../AutoDismissAlert/messages'

class DestroyArt extends Component {
  constructor (props) {
    super(props)
    this.state = {
      destroyed: false
    }
  }

  onDelete = event => {
    const { user, history, msgAlert } = this.props
    console.log('the props are ', this.props)
    console.log('the user prop is', this.props.user)
    deleteArtwork(this.props.match.params.id, user)
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
          message: messages.artDeleteFailure
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
