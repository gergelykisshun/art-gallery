import React from 'react'
import { useParams } from 'react-router-dom';

const Artwork = ({title, img}) => {

  const {artId} = useParams();

  return (
    <div>
      title: {title}
      img: {img}
      {artId}
    </div>
  )
}

export default Artwork;