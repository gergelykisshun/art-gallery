import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { addFavorite, removeFavorite } from '../../store/favorites';
import './ArtworkDetails.css';

const ArtworkDetails = () => {

  const {artId} = useParams();
  const allArt = useSelector(state => state.allArt.artworks.data);
  const artImages = useSelector(state => state.allArt.images);

  const artWork = allArt.filter(art => String(art.id) === artId)[0];
  const imageUrl = artImages.filter(url => new RegExp(`${artWork.image_id}`).test(url))[0];
  
  const dispatch = useDispatch();
  const allFavorites = useSelector(state => state.favorites.favorites);
  const isFavorite = allFavorites.find(fav => String(fav.info.id) === artId);

  const addToFavorites = () => {
    dispatch(addFavorite({info: artWork, image: imageUrl}));
  };

  const removeFromFavorites = () => {
    dispatch(removeFavorite(artWork.id));
  };

  const {title, artist_display, department_title} = artWork

  let favoriteButton;

  if(isFavorite){
    favoriteButton = 
    <div onClick={removeFromFavorites} className="rm-fav-container">
      <FavoriteBorderIcon className='favorite-heart-icon'/>
      <span>Remove from favorites</span>
    </div>
  } else {
    favoriteButton =
    <div onClick={addToFavorites} className="rm-fav-container">
      <FavoriteIcon className='favorite-heart-icon'/>
      <span>Add to favorites</span>
    </div>
  }



  return (
    <div className='individual-card-wrapper'>
      <div style={{transform: 'translateY(-80px)'}} className='general-card'>
        <img className='general-card-img' src={imageUrl} alt="artwork" />
        <div className='general-card-info'>
          <h2>{title}</h2>
          <h3>{artist_display}</h3>
          <p>{department_title}</p>
          {favoriteButton}
          <Link className="back-to-home-btn" to="/">Back to Home</Link>
        </div>
      </div>
    </div>
  )
}

export default ArtworkDetails