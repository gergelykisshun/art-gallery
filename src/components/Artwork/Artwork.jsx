import React from 'react'
import { Link } from 'react-router-dom';
import './Artwork.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from 'react-redux'
import { addFavorite, removeFavorite } from '../../store/favorites';


const Artwork = ({info, image}) => {

  const {title, id} = info;
  const queryString = `/artwork/${id}`;
  const dispatch = useDispatch();
  const allFavorites = useSelector(state => state.favorites.favorites);
  const isFavorite = allFavorites.find(fav => fav.info.id === id);

  const addToFavorites = () => {
    dispatch(addFavorite({info, image}));
  };

  const removeFromFavorites = () => {
    dispatch(removeFavorite(id))
  };
  return (
    <div className='artwork-card'>
      <img src={image} alt="artwork" />
      {isFavorite ? <FavoriteIcon onClick={removeFromFavorites} className='favorite-heart-icon'/> : <FavoriteBorderIcon onClick={addToFavorites} className='favorite-heart-icon'/>}
      <div className='artwork-details'>
        <ExpandMoreIcon className="show-more-icon"/>
        <h2 className='title'>{title}</h2>
        <Link to={queryString} className="details-btn">Show details</Link>
      </div>
    </div>
  )
}

export default Artwork;