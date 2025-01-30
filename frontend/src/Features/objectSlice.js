// features/objectSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  myObject: {},
};

const objectSlice = createSlice({
  name: 'object', // Name of the slice
  initialState,
  reducers: {
    setObject: (state, action) => {
      state.myObject = action.payload; // Update state with the payload
    },
  },
});

export const { setObject } = objectSlice.actions; // Export action creators
export default objectSlice.reducer; // Export the reducer
