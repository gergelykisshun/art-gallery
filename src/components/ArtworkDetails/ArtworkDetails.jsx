import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { addFavorite, removeFavorite } from '../../store/favorites';
import { fetchSoloImage } from '../../store/soloArt';

import './ArtworkDetails.css';

const ArtworkDetails = () => {

  // QUERY PARAMETER - IT IS THE ID OF THE IMAGE WE WANT DETAILS FOR
  const {artId} = useParams();
  console.log(typeof artId);
  //  DECLARING VARIABLES
  let artWork, imageUrl;
  // FETCH ARTWORK
  const dispatch = useDispatch();
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if(fetching){
      console.log('fetched')
      dispatch(fetchSoloImage(artId))
    }
  }, [dispatch, fetching, artId])

  // GETTING REDUX STATES FOR ALL
  const allArt = useSelector(state => state.allArt.artworks.data);
  const artImages = useSelector(state => state.allArt.images);

  // GETTING REDUX STATES FOR SOLO
  const soloArt = useSelector(state => state.soloArt.artwork.data);
  const soloImage = useSelector(state => state.soloArt.image);

  if (allArt && artImages && allArt.length === artImages.length){
    // FILTERING DATA FOR ARTWORK 
    artWork = allArt.filter(art => String(art.id) === artId)[0];
    imageUrl = artImages.filter(url => new RegExp(`${artWork.image_id}`).test(url))[0];
  } else {
    // FETCHING SINGLE ARTWORK 
    setFetching(true);
    artWork = soloArt;
    imageUrl = soloImage;
    console.log(artWork);
    console.log(imageUrl)
  }
  

  // LOGIC FOR FAVORITES
  const allFavorites = useSelector(state => state.favorites.favorites);
  const isFavorite = allFavorites.find(fav => String(fav.info.id) === artId);

  // FAVORITE - ACTIONS
  const addToFavorites = () => {
    dispatch(addFavorite({info: artWork, image: imageUrl}));
  };

  const removeFromFavorites = () => {
    dispatch(removeFavorite(artWork.id));
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

  // DESTRUCTURING ARTWORK PROPERTIES
  const {title, artist_display, department_title} = artWork


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