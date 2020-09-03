import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { showArtwork } from '../../api/artwork'
import UpdateArtModal from './UpdateModal'
import messages from '../AutoDismissAlert/messages'
import { Image, Container, Row, Col, Button } from 'react-bootstrap'

const ShowArt = props => {
  const [art, setArt] = useState()

  useEffect(() => {
    showArtwork(props.match.params.id)
      .then(res => setArt(res.data.artwork))
      .catch(error => props.msgAlert({
        heading: 'Could not find that art: ' + error.message,
        message: messages.showArtFailure,
        variant: 'danger'
      }))
  }, [])

  if (!art) { return <p>Loading...</p> }
  const { imageUrl, name, description, owner, createdAt } = art
  const { user, msgAlert, match } = props
  let ownerButtons = ''
  if (user && owner._id === user._id) {
    ownerButtons = (
      <div>
        <Link to={`/artwork/${match.params.id}/patch`}>
          <Button variant="info">Edit Artwork</Button>
        </Link>
        <UpdateArtModal {...props}
          art={art}
          user={user}
          name={name}
          setArt={setArt}
          msgAlert={msgAlert}
          description={description} />
      </div>
    )
  }

  return (
    <div className="show-art">
      <br />
      <Container><Row><Col><Image src={imageUrl}/></Col></Row></Container>
      <a href={imageUrl}>Download</a>
      <p>{name} by <Link to={`/artists/${owner._id}`}>{owner.name}</Link></p>
      <p>{description}</p>
      <small className="text-muted">Posted on {createdAt.substring(0, 10)}</small>
      {ownerButtons}
    </div>
  )
}

export default ShowArt
