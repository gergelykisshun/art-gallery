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
      <h2>{title}</h2>
      <FavoriteBorderIcon />
      <button>
        <ExpandMoreIcon />
        <p>Show details</p>
      </button>
    </div>
  )
}

export default Artwork;