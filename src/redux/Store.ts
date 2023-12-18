import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import formDataReducer from './FormDataSlice';

const rootReducer = combineReducers({
  formData: formDataReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});