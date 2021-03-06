import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from './AuthenticatedRoute'
import AutoDismissAlert from './AutoDismissAlert/AutoDismissAlert'
import Header from './Layout/Header'
import Footer from './Layout/Footer'
import SignUp from './auth/SignUp'
import SignIn from './auth/SignIn'
import SignOut from './auth/SignOut'
import UserSettings from './settings/UserSettings'
import ShowArt from './artwork/ShowArt'
import IndexArt from './artwork/IndexArt'
import IndexArtist from './auth/IndexArtist'
import ShowArtist from './Layout/ShowArtist'
import UploadS3Art from './artwork/UploadS3Art'
import UpdateArt from './artwork/UpdateArt'
import Home from './Layout/Home'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      msgAlerts: [],
      art: null
    }
  }

  setUser = user => this.setState({ user })
  clearUser = () => this.setState({ user: null })

  setArt = art => this.setState({ art })
  clearArt = () => this.setState({ art: null })

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
            <UserSettings msgAlert={this.msgAlert} user={user} setUser={this.setUser} />
          )} />
          { /* <AuthenticatedRoute path='/update-artist' render={(props) => (
            <UpdateArtist {...props} msgAlert={this.msgAlert} user={user} setUser={this.setUser} />

          )} /> */ }
          <Route user={user} path='/view-artists' render={() => (<IndexArtist msgAlert={this.msgAlert} />
          )} />
          <AuthenticatedRoute user={user} path='/upload-art' render={(props) => (
            <UploadS3Art
              {...props}
              msgAlert={this.msgAlert}
              setArt={this.setArt}
              user={user} />
          )} />
          <Route path='/artworks/:id' render={(props) => (
            <ShowArt {...props} user={user} setArt={this.setArt} msgAlert={this.msgAlert} />
          )} />
          <Route exact path='/artworks' render={(props) => (
            <IndexArt {...props} msgAlert={this.msgAlert} user={user} />
          )} />
          <Route exact path='/' render={(props) => (
            <Home msgAlert={this.msgAlert} />
          )} />
          <Route path='/artists/:id' render={(props) => (
            <ShowArtist {...props} msgAlert={this.msgAlert} />
          )} />
          <Route exact path='/artwork/:id/patch' render={(props) => (
            <UpdateArt {...props} art={this.state.art} user={user} msgAlert={this.msgAlert} />
          )} />
        </main>
        <Footer />
      </Fragment>
    )
  }
}

export default App
