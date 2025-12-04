import { createSlice } from '@reduxjs/toolkit';

const publisherSlice = createSlice({
  name: 'publishers',
  initialState: {
    list: [],
    loading: false,
    error: null
  },
  reducers: {
    setPublishers: (state, action) => {
      state.list = action.payload;
    },
    addPublisher: (state, action) => {
      state.list.push(action.payload);
    },
    updatePublisher: (state, action) => {
      const index = state.list.findIndex(p => p._id === action.payload._id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    removePublisher: (state, action) => {
      state.list = state.list.filter(p => p._id !== action.payload);
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
  setPublishers, 
  addPublisher, 
  updatePublisher, 
  removePublisher, 
  setLoading, 
  setError, 
  clearError 
} = publisherSlice.actions;
export default publisherSlice.reducer;