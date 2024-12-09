// src/redux/groundSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = `http://localhost:5000`;
//const API_BASE_URL = `https://bookingapp-r0fo.onrender.com`;
const initialState = {
  ground: null,
  loading: false,
  error: null,
};

// Async thunk for fetching ground details by ID
export const fetchGroundDetails = createAsyncThunk(
  'ground/fetchGroundDetails',
  async (gid, thunkAPI) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/ground/${gid}`);
    
      return response.data;
    } catch (error) {
      console.error('API Error:', error); // Log the error
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk for booking slots
export const bookSlot = createAsyncThunk(
  'ground/bookSlot',
  async (bookingData, thunkAPI) => {
   
    try {
      const response = await axios.post(`${API_BASE_URL}/api/booking/book-slot`, bookingData);
    
      return response.data;
    } catch (error) {
      console.error('Booking Error:', error); // Log the error
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Ground slice with reducers and extra reducers
const groundSlice = createSlice({
  name: 'ground',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroundDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGroundDetails.fulfilled, (state, action) => {
        state.ground = action.payload;
        state.loading = false;
      })
      .addCase(fetchGroundDetails.rejected, (state, action) => {
        state.error = action.payload.message || 'Failed to fetch ground details';
        state.loading = false;
      })
      .addCase(bookSlot.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.bookingStatus = null; // Reset booking status
      })
      .addCase(bookSlot.fulfilled, (state, action) => {
        state.bookingStatus = action.payload; // Set booking status to the response
        state.loading = false;
        
      })
      .addCase(bookSlot.rejected, (state, action) => {
        state.error = action.payload.message || 'Failed to book slots';
        state.loading = false;
      });
  },
});

export default groundSlice.reducer;
