import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { addFavorite, removeFavorite } from '../../store/favorites';
import { fetchSoloImage } from '../../store/soloArt';
import CircularProgress from '@mui/material/CircularProgress';


import './ArtworkDetails.css';

const ArtworkDetails = () => {
  
  // QUERY PARAMETER - IT IS THE ID OF THE IMAGE WE WANT DETAILS FOR
  const {artId} = useParams();
  
  // FETCH ARTWORK
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchSoloImage(artId));
  }, [dispatch, artId])

  // GETTING REDUX STATES FOR SOLO
  const soloArt = useSelector(state => state.soloArt.artwork.data);
  const soloImage = useSelector(state => state.soloArt.image[0]);
  const soloStatus = useSelector(state => state.soloArt.status);
  
  // LOGIC FOR FAVORITES
  const allFavorites = useSelector(state => state.favorites.favorites);
  const isFavorite = allFavorites.find(fav => String(fav.info.id) === artId);

  // FAVORITE - ACTIONS
  const addToFavorites = () => {
    dispatch(addFavorite({info: soloArt, image: soloImage}));
  };

  const removeFromFavorites = () => {
    dispatch(removeFavorite(soloArt.id));
  };

  // DECIDING FAVORITE BUTTON CONTENT
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


  let content;

  if(soloStatus === 'loading'){
    content = 
    <div style={{width: '100%', height: '100vh', display: 'flex', alignItems:'center', justifyContent:'center'}}>
      <CircularProgress style={{width:70, height:70}} />
    </div>
  } else if (soloStatus === 'succeeded'){
    const {title, artist_display, department_title} = soloArt

    content = 
    <div className='individual-card-wrapper'>
      <div style={{transform: 'translateY(-80px)'}} className='general-card'>
        <img className='general-card-img' src={soloImage} alt="artwork" />
        <div className='general-card-info'>
          <h2>{title}</h2>
          <h3>{artist_display}</h3>
          <p>{department_title}</p>
          {favoriteButton}
          <Link className="back-to-home-btn" to="/">Back to Home</Link>
        </div>
      </div>
    </div>
  } else if (soloStatus === 'failed'){
    content = <div>Error page should come heres</div>
  }


  return (
    <>
      {content}
    </>
  )
}

export default ArtworkDetails