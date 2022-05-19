import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchImagesForArt } from '../../store/allArt';
import Artwork from '../Artwork/Artwork';
import CircularProgress from '@mui/material/CircularProgress';


// import { addFavorite, removeFavorite } from '../../features/favorites';


const Home = () => {

  //REDUX
  const dispatch = useDispatch()
  const allArt = useSelector(state => state.allArt.artworks.data);
  const artStatus = useSelector(state => state.allArt.status);
  const artImages = useSelector(state => state.allArt.images);

  const [pagination, setPagination] = useState({
    resultsPerPage: 25,
    currentPage: 1
  })

  //FAVS
  // const favorites = useSelector(state => state.favorites.value);

  useEffect(() => {
    dispatch(fetchImagesForArt(pagination))    
  }, [dispatch, pagination])




  // const addHandler = () => {
  //   dispatch(addFavorite(Math.random()));
  // };

  // const removeHandler = () => {
  //   dispatch(removeFavorite());
  // };

  let content;

  if(artStatus === 'loading'){
    content = <CircularProgress />
  } else if (artStatus === 'succeeded'){
    content = allArt.map((art,i) => artImages[i] && <Artwork key={art.id} image={artImages[i]} info={art}/>)
  } else if (artStatus === 'failed'){
    content = <div>Error page should come heres</div>
  }
  
  
  console.log(allArt)
  console.log(artStatus)
  console.log(artImages)

  return (
    <div>
      {content}
      {/* {favorites.map(fav => <p>{fav}</p>)}
      <button onClick={addHandler}>add</button>
      <button onClick={removeHandler}>remove</button> */}
    </div>

  )
}

export default Home;