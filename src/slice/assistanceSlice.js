


import { createSlice } from '@reduxjs/toolkit';

const assistanceSlice = createSlice({
  name: 'assistances',
  initialState: {
    list: [],
    loading: false,
    error: null
  },
  reducers: {
    setAssistances: (state, action) => {
      state.list = action.payload;
    },
    addAssistance: (state, action) => {
      state.list.push(action.payload);
    },
    updateAssistance: (state, action) => {
      const index = state.list.findIndex(a => a._id === action.payload._id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    removeAssistance: (state, action) => {
      state.list = state.list.filter(a => a._id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const { 
  setAssistances, 
  addAssistance, 
  updateAssistance, 
  removeAssistance, 
  setLoading, 
  setError, 
  clearError 
} = assistanceSlice.actions;
export default assistanceSlice.reducer;