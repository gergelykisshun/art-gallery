import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FavoriteCard from '../FavoriteCard/FavoriteCard';



const MyFavorites = () => {

  const allFavorites = useSelector(state => state.favorites.favorites);

  return (
    <>
      {
        allFavorites.length === 0 ? 
        <div>You have no favorites, yet! <Link style={{textDecoration:'underline', color:'var(--primary-color)'}} to="/">Check out our Artworks!</Link></div> :
        allFavorites.map(({info, image}) => <FavoriteCard key={image} info={info} image={image}/>)
      }
    </>
  )
}

export default MyFavorites;