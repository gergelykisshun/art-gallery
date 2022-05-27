import React, {useEffect, useState, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchImagesForArt, changeResultsPerPage, decreasePageNumber, incrementPageNumber, startSearch } from '../../store/allArt';
import Artwork from '../Artwork/Artwork';
import CircularProgress from '@mui/material/CircularProgress';
import './Home.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ErrorPage from '../ErrorPage/ErrorPage';




const Home = () => {

  //REDUX STATES
  const dispatch = useDispatch()
  const allArt = useSelector(state => state.allArt.artworks.data);
  const artStatus = useSelector(state => state.allArt.status);
  const artImages = useSelector(state => state.allArt.images);
  const pagination = useSelector(state => state.allArt.pagination);
  const searchQuery = useSelector(state => state.allArt.searchQuery);

  // STATE FOR SEARCH INPUT
  const [search, setSearch] = useState('');

  // REF FOR SEARCH BUTTON
  const searchButton = useRef(null);

  // FETCH ARTWORKS AND IMAGES
  useEffect(() => {
    dispatch(fetchImagesForArt())    
  }, [dispatch, pagination, searchQuery])


  // LOADING SPINNER IMPLEMENTATION
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
    content = <ErrorPage />
  }
  
  // console.log(allArt)
  // console.log(artStatus)
  // console.log(artImages)
  // console.log(search)
  // console.log(searchQuery)

  const searchInputHandler = (e) => {
    setSearch(e.target.value);
  };

  // DISPATCH SEARCH ACTION
  const startSearchHandler = () => {
    dispatch(startSearch(search));
  };

  //DISPATCH CHANGE OF RESULTS ON PAGE ACTION
  const changeResultsHandler = (e) => {
    dispatch(changeResultsPerPage(e.target.value))
  }

  //DISPATCH NEXT PAGE ACTION
  const incrementPageHandler = () => {
    dispatch(incrementPageNumber());
  };

  //DISPATCH PREVIOUS PAGE ACTION
  const decreasePageHandler = () => {
    dispatch(decreasePageNumber());
  };

  //SEARCH WITH ENTER KEY
  const searchWithEnterKey = (e) => {
    if (e.key === 'Enter'){
      searchButton.current.click();
    }
  };

  return (
    <>
      <div className='search-bar'>
        <div className='search-container'>
          <input className="input-style" type="text" name='search' value={search} onKeyDown={searchWithEnterKey} onChange={searchInputHandler}/>
          <button ref={searchButton} onClick={startSearchHandler} className='primary-btn'>Search</button>
        </div>
        <div className='pagination-container'>
          {pagination.currentPage > 1 && <ArrowBackIosIcon className="pagination-arrow" onClick={decreasePageHandler}/>}
          <p>{pagination.currentPage}</p>
          <ArrowForwardIosIcon className="pagination-arrow" onClick={incrementPageHandler}/>
        </div>
        <label className='results-per-page-input-container'>
          Results per page
          <input className="input-style results-counter" type="number" name="resultsPerPage" min="1" max="100" value={pagination.resultsPerPage} onChange={changeResultsHandler}/>
        </label>
      </div>
      {content}
    </>
  )
}
export default Home;