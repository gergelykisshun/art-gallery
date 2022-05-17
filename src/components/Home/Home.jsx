import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchArt } from '../../features/allArt';
import Artwork from '../Artwork/Artwork';

const Home = () => {
  //REDUX
  const dispatch = useDispatch()
  const allArt = useSelector(state => state.allArt.value);

  // fetch all art
  useEffect(() => {
    fetch('https://api.artic.edu/api/v1/artworks')
    .then(res => res.json())
    .then(data => {
      console.log(data.data)
      dispatch(fetchArt(data.data));
    }).catch(err => console.log(err))
  }, [dispatch])

  return (
    <div>
      {allArt.map(art => <Artwork title={art.title} img={art.artwork_type_title} key={art.id} />)}
    </div>
  )
}

export default Home;