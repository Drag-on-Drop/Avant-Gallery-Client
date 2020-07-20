import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from './Settings/AuthenticatedRoute'
import UserSettings from './Settings/UserSettings'
import AutoDismissAlert from './Alerts/AutoDismissAlert'
import Header from './Layout/Header'
import Footer from './Layout/Footer'
import Home from './Layout/Home'
import SignUp from './models/Auth/SignUp'
import SignIn from './models/Auth/SignIn'
import SignOut from './models/Auth/SignOut'
import GetUser from './models/User/Get'
import PatchUser from './models/User/Patch'
import IndexUser from './models/User/Index'
import PostImage from './models/Image/Post'
import GetImage from './models/Image/Get'
import IndexImage from './models/Image/Index'

// Project Edits

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      msgAlerts: [],

      image: null
    }
  }

  setUser = user => this.setState({ user })
  clearUser = () => this.setState({ user: null })

  setImage = image => this.setState({ image })
  clearImage = () => this.setState({ image: null })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/user-settings' render={() => (
            <UserSettings msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/update-user' render={() => (
            <PatchUser msgAlert={this.msgAlert} user={user} />
          )} />
          <Route user={user} exact path='/artists' render={() => (<IndexUser msgAlert={this.msgAlert} />
          )} />
          {/* Need user prop to declare owner of image? */}
          <AuthenticatedRoute user={user} path='/upload-image' render={() => (
            <PostImage
              msgAlert={this.msgAlert}
              setImage={this.setImage}
              user={user} />
          )} />
          <Route path='/images/:id' render={(props) => (
            <GetImage {...props} msgAlert={this.msgAlert} />
          )} />
          <Route exact path='/images' render={(props) => (
            <IndexImage {...props} msgAlert={this.msgAlert} />
          )} />
          <Route exact path='/' component={Home} />
          <Route exact path='/artists/:id' render={(props) => (
            <GetUser {...props} msgAlert={this.msgAlert} />
          )} />
          <Route exact path='/artists/:id/patch' render={(props) => (
            <PatchUser {...props} user={user} msgAlert={this.msgAlert} />
          )} />
        </main>
        <Footer />
      </Fragment>
    )
  }
}

export default App
