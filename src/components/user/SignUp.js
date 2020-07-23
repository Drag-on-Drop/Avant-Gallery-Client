import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { signUp, signIn } from '../../api/user'
import messages from '../alert/messages'
import SignUpForm from '../jsx/SignUpForm'

class SignUp extends Component {
  constructor () {
    super()

    this.state = {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignUp = event => {
    event.preventDefault()
    const { msgAlert, history, setUser } = this.props
    signUp(this.state)
      .then(() => signIn(this.state))
      .then(res => {
        setUser(res.data.user)
        return res.data.user
      })
      .then(user => {
        msgAlert({
          heading: 'Sign Up Success',
          message: messages.signUpSuccess,
          variant: 'success'
        })
        return user
      })
      .then(user => history.push(`/users/${user._id}`))
      .catch(error => {
        this.setState({ email: '', password: '', passwordConfirmation: '' })
        msgAlert({
          heading: 'Sign Up Failed with error: ' + error.message,
          message: messages.signUpFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    return (
      <SignUpForm
        state={this.state}
        handleChange={this.handleChange}
        onSignUp={this.onSignUp}
      />
    )
  }
}

export default withRouter(SignUp)
