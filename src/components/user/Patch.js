import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { patchUser } from '../../api/user'
import messages from '../alert/messages'
import PatchUserForm from '../jsx/PatchUserForm'

class PatchUser extends Component {
  constructor (props) {
    super(props)
    console.log('props are:', props)
    this.state = {
      name: this.props.user.name,
      location: this.props.user.location,
      biography: this.props.user.biography
    }
  }

  handleChange = event => this.setState({ [event.target.name]: event.target.value })

  onPatchUser = event => {
    event.preventDefault()
    const { msgAlert, history, user } = this.props
    patchUser(this.state, user)
      // .then(() => setUser(this.state.user))
      .then(() => msgAlert({
        heading: 'Update User Success',
        message: messages.patchUserSuccess,
        variant: 'success'
      }))
      // .then(() => setUser({ user: this.state }))
      .then(() => history.push('/'))
      .catch(error => {
        this.setState({ name: '', location: '', biography: '', email: '' })
        msgAlert({
          heading: 'Update User Failed with error: ' + error.message,
          message: messages.patchUserFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    return (
      <PatchUserForm
        handleChange={this.handleChange}
        onPatchUser={this.onPatchUser}
        state={this.state}
      />
    )
  }
}

export default withRouter(PatchUser)
