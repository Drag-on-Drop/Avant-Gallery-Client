import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { deleteArtwork } from '../../api/artwork'
import Button from 'react-bootstrap/Button'

class DestroyArt extends Component {
  constructor (props) {
    super(props)
    this.state = {
      destroyed: false
    }
  }

  onDelete = event => {
    const { art, user } = this.props
    deleteArtwork(art.id, user)
      .then()
  }

  render () {
    console.log('delete?')
    return (
      <Button onClick={onDelete}>
        Delete
      </Button>
    )
  }
}

export default DestroyArt
