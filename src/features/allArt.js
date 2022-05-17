import { createSlice } from '@reduxjs/toolkit'

export const artSlice = createSlice({
  name: "allArt",
  initialState: { value: [] },
  reducers: {
    fetchArt: (state, action) => {
      state.value = [...state.value, action.payload];
    }
  }
})

export const { fetchArt } = artSlice.actions;

export default artSlice.reducer;