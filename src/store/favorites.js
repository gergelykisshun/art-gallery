import { createSlice } from '@reduxjs/toolkit';

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {value: ['']},
  reducers: {
    addFavorite: (state, action) => {
      state.value = [...state.value, action.payload]
    },

    removeFavorite: (state) => {
      const prev = [...state.value];
      prev.pop();
      state.value = prev;
    }
  }
})

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;