import React from 'react';
import './FavoriteCard.css';
import { useDispatch, useSelector } from 'react-redux'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { addFavorite, removeFavorite } from '../../store/favorites';



const FavoriteCard = ({info, image, allFavorites}) => {
  const dispatch = useDispatch();

  const {title, id, department_title, artist_display} = info;
  console.log(info);
  
  const isFavorite = allFavorites.find(fav => fav.info.id === id);

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