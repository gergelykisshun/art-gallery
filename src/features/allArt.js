import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


const initialState = {
  artworks: [],
  images: [],
  status: 'idle',
  error: null
}

export const fetchImagesForArt = createAsyncThunk('allArt/fetchImages', ( async (params, {dispatch, getState}) => {
  await dispatch(fetchArt());

  const state = getState();
  const resultArray =[];

  return state.allArt.artworks.data.map( (img) => {
    if(img.image_id){
      return fetch(`${state.allArt.artworks.config.iiif_url}/${img.image_id}/full/843,/0/default.jpg`)
      .then(res => {
        if(res.url){
          return res.url
        } else {
          console.log('it is what it is')
        }
      })
    } else {
     return 'no url found';
    }
  });
}));

export const fetchArt = createAsyncThunk('allArt/fetchArt', async (params, {dispatch}) => {
  try{
    const res = await fetch('https://api.artic.edu/api/v1/artworks');
    const allArtData = await res.json();
    return allArtData;

    // const imgArray = allArtData.data;


    // // const resultArray =[];

    // // imgArray.map(async (img) => {
    // //   if(img.image_id){
    // //     const res = await fetch(`${allArtData.config.iiif_url}/${img.image_id}/full/843,/0/default.jpg`);
    // //     img.img_url = res.url;
    // //   }
    // //   resultArray.push(img);
    // // });


    // return imgArray;
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
    })
  }
})

export const { getArtById } = artSlice.actions;

export default artSlice.reducer;