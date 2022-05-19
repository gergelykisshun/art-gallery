import { createSlice } from '@reduxjs/toolkit';


const localFavorites = JSON.parse(window.localStorage.getItem('icf-gallery-favorites'))
const initialState = {
  favorites : localFavorites ? localFavorites : []
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
      window.localStorage.setItem('icf-gallery-favorites', JSON.stringify(state.favorites));
    },
    
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(fav => fav.info.id !== action.payload);
      window.localStorage.setItem('icf-gallery-favorites', JSON.stringify(state.favorites));
    }
  }
})

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;