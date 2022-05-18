import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


const initialState = {
  artworks: [],
  status: 'idle',
  error: null
}

export const fetchArt = createAsyncThunk('allArt/fetchArt', async () => {
  try{
    const res = await fetch('https://api.artic.edu/api/v1/artworks');
    const allArtData = await res.json();
    
    const imgArray = allArtData.data;
    const imgUrlArray = [];
    imgArray.map(async (img) => {
      try {
        if(img.image_id){
          const res = await fetch(`${allArtData.config.iiif_url}/${img.image_id}/full/843,/0/default.jpg`);
          return res.url;
        } else {
          return 'not url found'
        }
      } catch (err){
        console.log(err);
      }
    });

    return imgArray.map((img, i) => {
      img.image_url = imgUrlArray[i];
      return img;
    });

  }catch (err) {
    console.log(err);
  }
  //   .then(res => res.json())
  //   .then(data => {
  //     const imgInfo = data.data;
  //     // console.log(imgInfo);
  //     imgInfo.forEach(img => {
  //       fetch(`${data.config.iiif_url}/${img.image_id}/full/843,/0/default.jpg`)
  //       .then(res => {
  //         dispatch(fetchArt(res));
  //       })
  //     })
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
      state.status = 'succeeded';
    }).addCase(fetchArt.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  }
})

export const { getArtById } = artSlice.actions;

export default artSlice.reducer;