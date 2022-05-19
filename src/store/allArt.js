import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


const initialState = {
  artworks: [],
  images: [],
  status: 'idle',
  error: null
}

export const fetchImagesForArt = createAsyncThunk('allArt/fetchImages', ( async (pagination, {dispatch, getState}) => {
  await dispatch(fetchArt(pagination));

  const state = getState();
  const allArtArray = state.allArt.artworks.data;
  const iiif_api = state.allArt.artworks.config.iiif_url;

  return await Promise.all(allArtArray.map( async (img) => {
    if(img.image_id){
      const res = await fetch(`${iiif_api}/${img.image_id}/full/843,/0/default.jpg`)
      return res.url;
    } else {
      return null;
    }
  }));
}));

export const fetchArt = createAsyncThunk('allArt/fetchArt', async (pagination, {dispatch}) => {
  try{
    const { currentPage, resultsPerPage } = pagination;
    const res = await fetch(`https://api.artic.edu/api/v1/artworks?page=${currentPage}&limit=${resultsPerPage}&fields=id,title,artist_display,image_id,department_title`);
    const allArtData = await res.json();
    return allArtData;

  }catch (err) {
    console.log(err);
  }
})

export const artSlice = createSlice({
  name: "allArt",
  initialState,
  reducers: {
    getArtById: (state, action) => {
      state.value = [...state.value, action.payload];
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchArt.pending, (state) => {
      state.status = 'loading';
    }).addCase(fetchArt.fulfilled, (state, action) => {
      state.artworks = action.payload;
    }).addCase(fetchArt.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });

    builder.addCase(fetchImagesForArt.pending, (state) => {
      state.status = 'loading';
    }).addCase(fetchImagesForArt.fulfilled, (state, action) => {
      state.images = action.payload;
      state.status = 'succeeded';
    }).addCase(fetchImagesForArt.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  }
})

export const { getArtById } = artSlice.actions;

export default artSlice.reducer;