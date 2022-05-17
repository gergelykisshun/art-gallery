import { createSlice } from '@reduxjs/toolkit'

export const artSlice = createSlice({
  name: "allArt",
  initialState: { value: ['art1', 'art2', 'art3'] },
  reducers: {
    fetchArt: (state, action) => {
      state.value = action.payload;
    }
  }
})

export const { fetchArt } = artSlice.actions;

export default artSlice.reducer;