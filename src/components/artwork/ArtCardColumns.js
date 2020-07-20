import React from 'react'
import { CardColumns } from 'react-bootstrap'
import ArtCard from './ArtCard'

const ArtCardColumns = props => {
  return (
    <CardColumns>
      {props.artList.map((art) => (
        <ArtCard key={art._id} art={art} />
      ))}
    </CardColumns>
  )
}

export default ArtCardColumns
