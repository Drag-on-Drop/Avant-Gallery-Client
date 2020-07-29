import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import UpdateArtist from '../auth/UpdateArtist'
import ChangePassword from '../auth/ChangePassword'
import Row from 'react-bootstrap/Row'

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
        <br />
        <Row>
          <UpdateArtist msgAlert={msgAlert} user={user} setUser={this.props.setUser}/>
          <ChangePassword msgAlert={msgAlert} user={user}/>
        </Row>
      </div>
    )
  }
}
export default withRouter(UserSettings)
