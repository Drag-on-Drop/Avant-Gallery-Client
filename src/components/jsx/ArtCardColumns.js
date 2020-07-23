import React from 'react'
import { CardColumns } from 'react-bootstrap'
import ArtCard from './ArtCards'

const ArtCardColumns = props => {
  return (
    <CardColumns>
      {props.artList.map((image) => (
        <ArtCard key={image._id} image={image} />
      ))}
    </CardColumns>
  )
}

export default ArtCardColumns
