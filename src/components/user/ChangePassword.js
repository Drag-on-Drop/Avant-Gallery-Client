import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { changePassword } from '../../api/user'
import messages from '../alert/messages'
import ChangePasswordForm from '../jsx/ChangePasswordForm'

class ChangePassword extends Component {
  constructor () {
    super()

    this.state = {
      oldPassword: '',
      newPassword: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onChangePassword = event => {
    event.preventDefault()

    const { msgAlert, history, user } = this.props

    changePassword(this.state, user)
      .then(() => msgAlert({
        heading: 'Change Password Success',
        message: messages.changePasswordSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/'))
      .catch(error => {
        this.setState({ oldPassword: '', newPassword: '' })
        msgAlert({
          heading: 'Change Password Failed with error: ' + error.message,
          message: messages.changePasswordFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { oldPassword, newPassword } = this.state

    return (
      <ChangePasswordForm
        oldPassword={oldPassword}
        newPassword={newPassword}
        onChangePassword={this.onChangePassword}
        handleChange={this.handleChange}
      />
    )
  }
}

export default withRouter(ChangePassword)
