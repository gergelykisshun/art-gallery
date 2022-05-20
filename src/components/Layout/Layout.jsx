import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './Layout.css';
import ToastMessage from '../ToastMessage/ToastMessage';

export const toastMessageContext = React.createContext();


const Layout = ({children}) => {

  const toastVisibility = useSelector(state => state.toast.isVisible);

  return (
      <div className='wrapper'>
        <nav className='sidebar'>
          <div className='navlink-container'>
            <Link to='/' className='sidebar-title'>
              ICF-Gallery 
            </Link>
            <NavLink to='/my-favorites'>Favorites</NavLink>
            <NavLink to='/'>Artworks</NavLink>
          </div>
{/* 
              <Link className='primary-btn new-project-btn' to='/new-project'>
                New project
                <AddBoxOutlinedIcon/>
              </Link> */}

        </nav>
        <main className='main-content'>
          {children}
          {toastVisibility && <ToastMessage />}
        </main>
      </div>
  )
}

export default Layout;