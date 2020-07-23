import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from './AuthenticatedRoute'
import AutoDismissAlert from './alert/AutoDismissAlert'

import Home from './layout/Home'
import Header from './layout/Header'
import Footer from './layout/Footer'
import UserSettings from './layout/UserSettings'

import SignUp from './user/SignUp'
import SignIn from './user/SignIn'
import SignOut from './user/SignOut'
import ShowUser from './user/Get'
import IndexUser from './user/Index'
import PatchUser from './user/Patch'

import GetImage from './image/Get'
import IndexImage from './image/Index'
import UploadS3Art from './image/Post'
import PatchImage from './image/Patch'

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
          <AuthenticatedRoute path='/update-user' setUser={this.setUser} render={(props) => (
            <PatchUser {...props} msgAlert={this.msgAlert} user={user} setUser={this.setUser} />

          )} />
          <Route user={user} path='/view-users' render={() => (<IndexUser msgAlert={this.msgAlert} />
          )} />
          {/* Need user prop to declare owner of image? */}
          <AuthenticatedRoute user={user} path='/upload-image' render={(props) => (
            <UploadS3Art
              {...props}
              msgAlert={this.msgAlert}
              setImage={this.setImage}
              user={user} />
          )} />
          <Route path='/images/:id' render={(props) => (
            <GetImage {...props} user={user} setImage={this.setImage} msgAlert={this.msgAlert} />
          )} />
          <Route exact path='/images' render={(props) => (
            <IndexImage {...props} msgAlert={this.msgAlert} user={user} />
          )} />
          <Route exact path='/' component={Home} />
          <Route path='/users/:id' render={(props) => (
            <ShowUser {...props} msgAlert={this.msgAlert} />
          )} />
          <Route exact path='/image/:id/patch' render={(props) => (
            <PatchImage {...props} image={this.state.image} user={user} msgAlert={this.msgAlert} />
          )} />
        </main>
        <Footer />
      </Fragment>
    )
  }
}

export default App
