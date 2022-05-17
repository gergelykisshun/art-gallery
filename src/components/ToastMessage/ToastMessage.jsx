import React from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import './ToastMessage.css';

const ToastMessage = ({msg, removeToast}) => {
  
  return (
    <div className='toast-msg-container fade-in'>
      {msg}
      <ClearIcon onClick={removeToast}/>
    </div>
  )
}

export default ToastMessage;