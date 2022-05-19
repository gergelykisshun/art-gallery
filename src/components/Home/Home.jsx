import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchImagesForArt } from '../../store/allArt';
import Artwork from '../Artwork/Artwork';
import CircularProgress from '@mui/material/CircularProgress';
import './Home.css';


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
    content = 
    <div style={{width: '100%', height: '100vh', display: 'flex', alignItems:'center', justifyContent:'center'}}>
      <CircularProgress style={{width:70, height:70}} />
    </div>
  } else if (artStatus === 'succeeded'){
    content = 
    <div className='art-container'>
      {allArt.map((art,i) => artImages[i] && <Artwork key={art.id} image={artImages[i]} info={art}/>)}
    </div>
  } else if (artStatus === 'failed'){
    content = <div>Error page should come heres</div>
  }
  
  
  console.log(allArt)
  console.log(artStatus)
  console.log(artImages)

  const searchInputHandler = () => {

  };

  const incrementPageNumber = () => {
    setPagination(prev => ({
      ...prev, 
      currentPage: prev.currentPage + 1
    }))

  };

  const decreasePageNumber = () => {
    setPagination(prev => ({
      ...prev, 
      currentPage: prev.currentPage - 1
    }))
  };

  return (
    <>
      <div className='search-bar'>
        <input type="text" name='search' onChange={searchInputHandler}/>
        <div>
          <button onClick={incrementPageNumber}>Next page</button>
          <p>{pagination.currentPage}</p>
          {pagination.currentPage > 1 && <button onClick={decreasePageNumber}>Previous page</button>}
        </div>
        <input type="number" name="resultsPerPage" min="1" max="100" />
      </div>
      {content}
    </>
      // {/* {favorites.map(fav => <p>{fav}</p>)}
      // <button onClick={addHandler}>add</button>
      // <button onClick={removeHandler}>remove</button> */}

)
}
export default Home;