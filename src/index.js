import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import allArtReducer from './store/allArt';
import favoritesReducer from './store/favorites';
import themeReducer from './store/theme';
import toastReducer from './store/toastMessage';
import soloArtReducer from './store/soloArt';

const store = configureStore({
  reducer: {
    allArt: allArtReducer,
    favorites: favoritesReducer,
    theme: themeReducer,
    toast: toastReducer,
    soloArt: soloArtReducer
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
