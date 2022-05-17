import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Layout.css';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import AdbIcon from '@mui/icons-material/Adb';
import ToastMessage from '../ToastMessage/ToastMessage';

export const toastMessageContext = React.createContext();


const Layout = ({children}) => {

  //using the user info context
  //Context for toast messages
  const [toastMessage, setToastMessage] = useState({
    isVisible: false,
    msg: ''
  })

  const showToastMessage = (msg) => {
    setToastMessage({
      isVisible: true,
      msg: msg
    })
  }

  const removeToastMessage = () => {
    setToastMessage({
      isVisible: false,
      msg: ''
    })
  };

  return (
      <div className='wrapper'>
        <nav className='sidebar'>
          <div className='navlink-container'>
            <Link to='/' className='sidebar-title'>
              Bug-tracker <AdbIcon/> 
            </Link>
            <NavLink to='/my-projects'>My projects</NavLink>
            <NavLink to='/my-account'>My account</NavLink>
          </div>

              <Link className='primary-btn new-project-btn' to='/new-project'>
                New project
                <AddBoxOutlinedIcon/>
              </Link>

        </nav>
        <toastMessageContext.Provider value={{removeToast: removeToastMessage, showToast: showToastMessage, toastInfo: toastMessage}}>
          <main className='main-content'>
            {children}
            {toastMessage.isVisible && <ToastMessage msg={toastMessage.msg} removeToast={removeToastMessage}/>}
          </main>
        </toastMessageContext.Provider>
      </div>
  )
}

export default Layout;