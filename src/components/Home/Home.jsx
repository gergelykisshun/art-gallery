import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchArt } from '../../features/allArt';
import Artwork from '../Artwork/Artwork';
import CircularProgress from '@mui/material/CircularProgress';


// import { addFavorite, removeFavorite } from '../../features/favorites';


const Home = () => {

  const [fetching, setFetching] = useState(false);

  //REDUX
  // ARTS
  const dispatch = useDispatch()
  const allArt = useSelector(state => state.allArt.value);

  //FAVS
  // const favorites = useSelector(state => state.favorites.value);

  // fetch all art
  useEffect(() => {
    setFetching(true);
    fetch('https://api.artic.edu/api/v1/artworks')
    .then(res => res.json())
    .then(data => {
      const imgInfo = data.data;
      // console.log(imgInfo);
      imgInfo.forEach(img => {
        console.log(img.image_id);
        fetch(`${data.config.iiif_url}/${img.image_id}/full/843,/0/default.jpg`)
        .then(res => {
          dispatch(fetchArt(res));
        })
      })

      setFetching(false);
    }).catch(err => console.log(err))


  }, [dispatch])

  // const addHandler = () => {
  //   dispatch(addFavorite(Math.random()));
  // };

  // const removeHandler = () => {
  //   dispatch(removeFavorite());
  // };

  return (
    <div>
      {fetching ? <CircularProgress/> :
      allArt.map(art => <Artwork img={art.url} key={art.url} />)}
      {/* {favorites.map(fav => <p>{fav}</p>)}
      <button onClick={addHandler}>add</button>
      <button onClick={removeHandler}>remove</button> */}
    </div>

  )
}

export default Home;