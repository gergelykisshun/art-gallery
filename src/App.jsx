import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import MyFavorites from './components/MyFavorites/MyFavorites';
import Artwork from './components/Artwork/Artwork';
import ErrorPage from './components/ErrorPage/ErrorPage';


const App = () => {

  // const context = useUserInfo();

  return (
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path='/' element={<Home/>} exact/>
            <Route path='/my-favorites' element={<MyFavorites/>}/>
            <Route path='/artwork/:artId' element={<Artwork/>}/>
            <Route path='*' element={<ErrorPage/>}/>
          </Routes>
        </Layout>
      </BrowserRouter>
  )
}

export default App


// useNavigate from react-router-dom
// let navigate = useNavigate()
// navigate("/url")

// useParams
//
//