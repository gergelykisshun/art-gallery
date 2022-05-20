import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  artwork: {},
  image: '',
  status: 'idle',
  error: null
}

export const fetchSoloImage = createAsyncThunk('soloArt/fetchSingleImage', ( async (artId, {dispatch, getState}) => {
  await dispatch(fetchSoloArtwork(artId));
  const state = getState();

  const artWork = state.soloArt.artwork.data;
  const iiif_api = state.soloArt.artwork.config.iiif_url;

  if(artWork.image_id){
    const res = await fetch(`${iiif_api}/${artWork.image_id}/full/843,/0/default.jpg`);
    return res.url;
  } else {
    return null;
  }
}));

export const fetchSoloArtwork = createAsyncThunk('soloArt/fetchSingleArtwork', ( async (artId, {dispatch, getState}) => {
  const res = await fetch(`https://api.artic.edu/api/v1/artworks/${artId}?fields=id,title,artist_display,image_id,department_title`);
  return res.json();
}));

// artId ? `https://api.artic.edu/api/v1/artworks/${artId}?fields=id,title,artist_display,image_id,department_title` 


export const soloArtSlice = createSlice({
  name: 'soloArt',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchSoloArtwork.pending, (state) => {
      state.status = 'loading';
    }).addCase(fetchSoloArtwork.fulfilled, (state, action) => {
      state.artwork = action.payload;
    }).addCase(fetchSoloArtwork.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });

    builder.addCase(fetchSoloImage.pending, (state) => {
      state.status = 'loading';
    }).addCase(fetchSoloImage.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.image = action.payload;
    }).addCase(fetchSoloImage.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  }
})

export default soloArtSlice.reducer;