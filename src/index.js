import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import allArtReducer from './features/allArt';
import favoritesReducer from './features/favorites';

const store = configureStore({
  reducer: {
    allArt: allArtReducer,
    favorites: favoritesReducer
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
