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



  return (
    <>
      <p>{artId}</p>
      <img src={imageUrl} alt="artwork"/>
      <div>{artWork.title}</div> 
      {isFavorite ? <FavoriteIcon onClick={removeFromFavorites} className='favorite-heart-icon'/> : <FavoriteBorderIcon onClick={addToFavorites} className='favorite-heart-icon'/>}
      <Link to="/">Back</Link>
    </>
  )
}

export default ArtworkDetails