import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { editImage } from '../../api/image'
import messages from '../alert/messages'
import PatchForm from '../jsx/PatchImageForm'

class PatchImage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: this.props.image.name,
      description: this.props.image.description,
      edited: false
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onPatchImage = event => {
    event.preventDefault()

    const { user, history, msgAlert, match } = this.props
    editImage(this.state, match.params.id, user)
      .then(() => msgAlert({
        heading: 'Edit Success',
        message: messages.artEditSuccess,
        variant: 'success'
      }))
      .then(() => history.push(`/images/${this.props.image._id}`))
      .catch(error => {
        msgAlert({
          heading: 'Edit Failure: ' + error.message,
          message: messages.artEditFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { name, description } = this.state
    return (
      <PatchForm
        patch={this.onPatchImage}
        name={name}
        description={description}
        change={this.handleChange}
      />
    )
  }
}

export default withRouter(PatchImage)
