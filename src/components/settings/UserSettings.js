import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PatchUser from '../models/User/Patch'
import ChangePassword from '../models/Auth/ChangePassword'
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
          <PatchUser msgAlert={msgAlert} user={user}/>
          <ChangePassword msgAlert={msgAlert} user={user}/>
        </Row>
      </div>
    )
  }
}
export default withRouter(UserSettings)
