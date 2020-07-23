import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { signIn } from '../../api/user'
import messages from '../alert/messages'
import SignInForm from '../jsx/SignInForm'

class SignIn extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignIn = event => {
    event.preventDefault()
    const { msgAlert, history, setUser } = this.props

    signIn(this.state)
      .then(res => setUser(res.data.user))
      .then(() => msgAlert({
        heading: 'Sign In Success',
        message: messages.signInSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/'))
      .catch(error => {
        this.setState({ email: '', password: '' })
        msgAlert({
          heading: 'Sign In Failed with error: ' + error.message,
          message: messages.signInFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    return (
      <SignInForm
        state={this.state}
        handleChange={this.handleChange}
        onSignIn={this.onSignIn}
      />
    )
  }
}

export default withRouter(SignIn)
