import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { indexUser } from '../../../api/user'
import messages from '../../Alerts/messages'

class IndexUser extends Component {
  constructor () {
    super()
    this.state = {
      users: null,
      notFound: false
    }
  }

  componentDidMount () {
    const { msgAlert } = this.props
    indexUser()
      .then((res) => {
        this.setState({
          users: res.data.users,
          notFound: false
        })
      })
      .then(() => msgAlert({
        heading: 'Artists de Gallery',
        message: messages.showUserSuccess,
        variant: 'success'
      }))
      .catch(error => {
        console.log(error)
        this.setState({
          users: null,
          notFound: true
        })
      })
  }

  render () {
    let jsx
    if (this.state.notFound) {
      jsx = <p>Cannot connect to server.</p>
    } else if (this.state.users === null) {
      jsx = <p>Loading... </p>
    } else if (this.state.users.length === 0) {
      jsx = <p>No Artists</p>
    } else {
      jsx = (
        <ul>
          {this.state.users.map(user => {
            return (
              <p key={user._id}>
                <Link to={`/artists/${user._id}`} replace >
                  {user.name}
                </Link>
              </p>
            )
          })}
        </ul>
      )
    }
    return (
      <div>
        <h3>Artists</h3>
        {jsx}
      </div>
    )
  }
}

export default withRouter(IndexUser)
