import React from 'react';
import { Link } from 'react-router-dom;'


const ErrorPage = () => {
  return (
    <div>Something went wrong! <Link style={{textDecoration:'underline', color:'var(--primary-color)'}} to="/">Go out our Artworks!</Link></div>
    )
}

export default ErrorPage;