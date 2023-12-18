import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormDataState {
  name: string;
  address: string;
  type: string;
  numOfBuildings: number;
  yearBuilt: number;
  numOfUnits: number;
  numOfFloors: number;
  downloadURL: null | string;
  uploadImages: string[] | null;
}

const initialState: FormDataState = {
  name: '',
  address: '',
  type: '',
  numOfBuildings: 0,
  yearBuilt: 0,
  numOfUnits: 0,
  numOfFloors: 0,
  downloadURL: null,
  uploadImages: null,
};

const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    updateFormData: (state, action: PayloadAction<Partial<FormDataState>>) => {
      return { ...state, ...action.payload };
    },
    setDownloadURL: (state, action) => {
      state.downloadURL = action.payload;
    },
    setuploadImages: (state, action) => {
      state.uploadImages = action.payload;
    },

    resetFormData: () => initialState,
  },
});

export const {
  updateFormData,
  setDownloadURL,
  resetFormData,
  setuploadImages,
} = formDataSlice.actions;
export default formDataSlice.reducer;
