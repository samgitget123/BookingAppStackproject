
// store.js
import { configureStore } from '@reduxjs/toolkit';
import cityReducer from './Features/citySlice';
import groundReducer from './Features/groundSlice';
import objectReducer from './Features/objectSlice';
const store = configureStore({
  reducer: {
    city: cityReducer,
    ground : groundReducer,
    object: objectReducer,
  },
});

export default store;
