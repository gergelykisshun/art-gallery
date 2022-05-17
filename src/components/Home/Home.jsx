import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchArt } from '../../features/allArt';
import Artwork from '../Artwork/Artwork';

import { addFavorite, removeFavorite } from '../../features/favorites';


const Home = () => {
  //REDUX
  // ARTS
  const dispatch = useDispatch()
  const allArt = useSelector(state => state.allArt.value);

  //FAVS
  const favorites = useSelector(state => state.favorites.value);

  // fetch all art
  useEffect(() => {
    fetch('https://api.artic.edu/api/v1/artworks')
    .then(res => res.json())
    .then(data => {
      console.log(data.data)
      dispatch(fetchArt(data.data));
    }).catch(err => console.log(err))
  }, [dispatch])

  const addHandler = () => {
    dispatch(addFavorite(Math.random()));
  };

  const removeHandler = () => {
    dispatch(removeFavorite());
  };

  return (
    <div>
      {allArt.map(art => <Artwork title={art.title} img={art.artwork_type_title} key={art.id} />)}
      {favorites.map(fav => <p>{fav}</p>)}
      <button onClick={addHandler}>add</button>
      <button onClick={removeHandler}>remove</button>
    </div>

  )
}

export default Home;