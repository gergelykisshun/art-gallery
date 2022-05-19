import React from 'react'
import { useSelector } from 'react-redux'
import FavoriteCard from '../FavoriteCard/FavoriteCard';



const MyFavorites = () => {

  const allFavorites = useSelector(state => state.favorites.favorites);

  return (
    <>
      {
        allFavorites.length === 0 ? 
        <div>You have no favorites, yet! <strong>Check out our Artworks!</strong></div> :
        allFavorites.map(({info, image}) => <FavoriteCard info={info} image={image}/>)
      }
    </>
  )
}

export default MyFavorites;