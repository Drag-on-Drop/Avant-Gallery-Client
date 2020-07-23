import React, { Component } from 'react'
import { indexImage } from '../../api/image'
import ArtCardColumns from '../jsx/ArtCardColumns'
import messages from '../alert/messages'

class IndexImage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      images: []
    }
  }

  componentDidMount () {
    indexImage()
      .then(res => this.setState({ images: res.data.images }))
      .catch(err => {
        this.setState({ images: null })
        this.props.msgAlert({
          heading: 'Could not reach server: ' + err.message,
          message: messages.indexArtFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    if (!this.state.images) {
      return (
        <div className="index-not-found">
          <p>Could not connect to server, please try again.</p>
        </div>
      )
    }
    return (
      <div>
        <br/>
        <ArtCardColumns artList={this.state.images} />
      </div>
    )
  }
}

export default IndexImage
