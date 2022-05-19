import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchImagesForArt, changeResultsPerPage, decreasePageNumber, incrementPageNumber } from '../../store/allArt';
import Artwork from '../Artwork/Artwork';
import CircularProgress from '@mui/material/CircularProgress';
import './Home.css';




const Home = () => {

  //REDUX
  const dispatch = useDispatch()
  const allArt = useSelector(state => state.allArt.artworks.data);
  const artStatus = useSelector(state => state.allArt.status);
  const artImages = useSelector(state => state.allArt.images);
  const pagination = useSelector(state => state.allArt.pagination);



  const [search, setSearch] = useState('');

  //FAVS
  // const favorites = useSelector(state => state.favorites.value);

  useEffect(() => {
    dispatch(fetchImagesForArt())    
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
  
  // console.log(allArt)
  // console.log(artStatus)
  // console.log(artImages)
  // console.log(search)

  const searchInputHandler = (e) => {
    setSearch(e.target.value);
  };

  const changeResultsHandler = (e) => {
    dispatch(changeResultsPerPage(e.target.value))
  }

  const incrementPageHandler = () => {
    dispatch(incrementPageNumber());
  };

  const decreasePageHandler = () => {
    dispatch(decreasePageNumber());
  };

  return (
    <>
      <div className='search-bar'>
        <div>
          <input className="input-style" type="text" name='search' value={search} onChange={searchInputHandler}/>
          <button className='primary-btn'>Search</button>
        </div>
        <div className='pagination-container'>
          {pagination.currentPage > 1 && <button className="primary-btn" onClick={decreasePageHandler}>Previous page</button>}
          <p>{pagination.currentPage}</p>
          <button className="primary-btn" onClick={incrementPageHandler}>Next page</button>
        </div>
        <label className='results-per-page-input-container'>
          Results per page
          <input className="input-style" type="number" name="resultsPerPage" min="1" max="100" value={pagination.resultsPerPage} onChange={changeResultsHandler}/>
        </label>
      </div>
      {content}
    </>
  )
}
export default Home;