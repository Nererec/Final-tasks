import { configureStore } from '@reduxjs/toolkit';
import { authReducer, limitsReducer, resultReducer } from './slices';

const store = configureStore({
  reducer: {
    auth: authReducer,
    limits: limitsReducer,
    results: resultReducer, 
  },
});

export default store;
