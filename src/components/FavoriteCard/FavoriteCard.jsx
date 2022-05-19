import React from 'react';
import './FavoriteCard.css';
import { useDispatch } from 'react-redux'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { removeFavorite } from '../../store/favorites';



const FavoriteCard = ({info, image}) => {
  const dispatch = useDispatch();

  const {title, id, department_title, artist_display} = info;
  
  const removeFromFavorites = () => {
    // are you sure?
    alert('are you sure?');
    dispatch(removeFavorite(id));
  };

  return (
    <div className='favorite-card'>
      <h2>{title}</h2>
      <h3>{artist_display}</h3>
      <p>{department_title}</p>
      <img src={image} alt="artwork" />
      <FavoriteIcon onClick={removeFromFavorites} className='favorite-heart-icon'/>
    </div>
  )
}

export default FavoriteCard