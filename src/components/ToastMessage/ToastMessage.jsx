import React from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import { useSelector, useDispatch } from 'react-redux';
import { removeToast } from '../../store/toastMessage';


import './ToastMessage.css';

const ToastMessage = () => {
  const dispatch = useDispatch();
  const msg = useSelector(state => state.toast.msg);

  const removeToastHandler = () => {
    dispatch(removeToast());
  };
  
  return (
    <div className='toast-msg-container fade-in'>
      {msg}
      <ClearIcon style={{cursor: 'pointer'}} onClick={removeToastHandler}/>
    </div>
  )
}

export default ToastMessage;