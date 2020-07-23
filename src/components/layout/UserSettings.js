import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PatchUser from '../user/Patch'
import ChangePassword from '../user/ChangePassword'
import { Row } from 'react-bootstrap'

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
