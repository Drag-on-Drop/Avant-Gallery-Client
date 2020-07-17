import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import UpdateArtist from '../artist/UpdateArtist'
import ChangePassword from '../auth/ChangePassword'

class UserSettings extends Component {
  constructor (props) {
    super(props)

    this.state = {
      oldPassword: '',
      newPassword: ''
    }
  }

  render () {
    const user = this.props.user
    const msgAlert = this.props.msgAlert
    return (
      <div>
        <UpdateArtist msgAlert={msgAlert} user={user}/>
        <ChangePassword msgAlert={msgAlert} user={user}/>
      </div>
    )
  }
}
export default withRouter(UserSettings)
