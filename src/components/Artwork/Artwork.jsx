import React from 'react'
import { useParams } from 'react-router-dom';
import './Artwork.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Artwork = ({info, image}) => {

  const {artId} = useParams();
  const {title} = info;

  return (
    <div className='artwork-card'>
      <img src={image} alt="artwork" />
      <FavoriteBorderIcon className='favorite-heart-icon'/>
      <button className='artwork-details'>
        <ExpandMoreIcon className="show-more-icon"/>
        <h2 className='title'>{title}</h2>
        <button className="details-btn">Show details</button>
      </button>
    </div>
  )
}

export default Artwork;