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
    const { msgAlert, user, setUser } = this.props
    return (
      <div>
        <br />
        <Row>
          <UpdateArtist msgAlert={msgAlert} user={user} setUser={setUser}/>
          <ChangePassword msgAlert={msgAlert} user={user}/>
        </Row>
      </div>
    )
  }
}
export default withRouter(UserSettings)
