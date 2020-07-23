import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { indexUser } from '../../api/user'
import messages from '../alert/messages'
import { ListGroup } from 'react-bootstrap'

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
      .catch(error => {
        console.log(error)
        this.setState({
          users: null,
          notFound: true
        })
        msgAlert({
          heading: 'Could not reach Server',
          message: messages.indexUserFailure,
          variant: 'danger'
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
      jsx = <p>No users</p>
    } else {
      jsx = (
        <ListGroup>
          {this.state.users.map(user => {
            return (
              <ListGroup.Item key={user._id}>
                <Link to={`/users/${user._id}`}>
                  {user.name}
                </Link>
              </ListGroup.Item>
            )
          })}
        </ListGroup>
      )
    }
    return (
      <div>
        <h3>Users</h3>
        {jsx}
      </div>
    )
  }
}

export default withRouter(IndexUser)
