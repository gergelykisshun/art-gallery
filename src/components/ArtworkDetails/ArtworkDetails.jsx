import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './ArtworkDetails.css';

const ArtworkDetails = () => {

  const {artId} = useParams();
  const allArt = useSelector(state => state.allArt.artworks.data);
  const artImages = useSelector(state => state.allArt.images);

  const artWork = allArt.filter(art => String(art.id) === artId)[0];
  const imageUrl = artImages.filter(url => new RegExp(`${artWork.image_id}`).test(url))[0];
  console.log(artWork)
  console.log(imageUrl)


  return (
    <>
      <p>{artId}</p>
      <img src={imageUrl} alt="artwork"/>
      <div>{artWork.title}</div> 
      <Link to="/">Back</Link>
    </>
  )
}

export default ArtworkDetails