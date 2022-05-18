import React from 'react'
import { useParams } from 'react-router-dom';

const Artwork = ({title, img}) => {

  // const {artId} = useParams();

  return (
    <div>
      {/* <img src={img} alt='expensive art'/> */}
      Display Artwork
    </div>
  )
}

export default Artwork;