import React, { useState } from 'react';
import './FavoriteCard.css';
import { useDispatch } from 'react-redux'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { removeFavorite } from '../../store/favorites';



const FavoriteCard = ({info, image}) => {
  const dispatch = useDispatch();
  const {title, id, department_title, artist_display} = info;
  
  const [isRemoving, setIsRemoving] = useState(false);


  const removeFromFavorites = () => {
    dispatch(removeFavorite(id));
    toggleRemove();
  };

  const toggleRemove = () => {
    setIsRemoving(prev => !prev);
  };

  return (
    <div className='general-card'>
      <img className='general-card-img' src={image} alt="artwork" />
      <div className='general-card-info'>
        {isRemoving ?
          <>
            <h3 className='remove-question'>Remove from favorites?</h3>
            <div className='remove-choices-container'>
              <button className="primary-btn" onClick={removeFromFavorites}>Confirm</button>
              <button className="secondary-btn" onClick={toggleRemove}>Back</button>
            </div>
          </> 
          :
          <>
            <h2>{title}</h2>
            <h3>{artist_display}</h3>
            <p>{department_title}</p>
            <div onClick={toggleRemove} className="rm-fav-container">
              <FavoriteIcon className='favorite-heart-icon'/>
              <span>Remove from favorites</span>
            </div>
          </>
        }
      </div>
    </div>
  )
}

export default FavoriteCard