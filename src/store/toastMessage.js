import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isVisible: true,
    msg: 'testestestes'
};

export const toastSlice = createSlice({
  name: "toastMessage",
  initialState,
  reducers: {
    showToast: (state, action) => {
      state.isVisible = true;
      state.msg = action.payload;
    },
    removeToast: (state) => {
      state.isVisible = false;
      state.msg = '';
    }
  }
})

export const { showToast, removeToast,  } = toastSlice.actions;

export default toastSlice.reducer;