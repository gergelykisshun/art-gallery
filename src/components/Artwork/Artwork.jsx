import React from 'react'
import { useParams } from 'react-router-dom';

const Artwork = () => {

  const {artId} = useParams();

  return (
    <div>This is {artId}</div>
  )
}

export default Artwork;