// slices/admitCardSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import admitCardService from '../services/admitCardService';
import { toast } from 'react-toastify';

// Async thunks
export const fetchAdmitCards = createAsyncThunk(
  'admitCards/fetchAdmitCards',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await admitCardService.getAllAdmitCards(params);
      return {
        success: true,
        data: response.data || [],
        pagination: response.pagination || {
          currentPage: 1,
          totalPages: 1,
          total: response.data?.length || 0,
          limit: params.limit || 10
        }
      };
    } catch (error) {
      console.error('Fetch admit cards error:', error);
      return rejectWithValue(error.message || 'Failed to fetch admit cards');
    }
  }
);

export const fetchAdmitCardById = createAsyncThunk(
  'admitCards/fetchAdmitCardById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await admitCardService.getAdmitCardById(id);
      return {
        success: true,
        data: response.data || response
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch admit card');
    }
  }
);

export const createAdmitCard = createAsyncThunk(
  'admitCards/createAdmitCard',
  async (admitCardData, { rejectWithValue }) => {
    try {
      const response = await admitCardService.createAdmitCard(admitCardData);
      toast.success('Admit card created successfully!');
      return {
        success: true,
        data: response.data || response
      };
    } catch (error) {
      toast.error(error.message || 'Failed to create admit card');
      return rejectWithValue(error.message || 'Failed to create admit card');
    }
  }
);

export const updateAdmitCard = createAsyncThunk(
  'admitCards/updateAdmitCard',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await admitCardService.updateAdmitCard(id, data);
      toast.success('Admit card updated successfully!');
      return {
        success: true,
        data: response.data || response
      };
    } catch (error) {
      toast.error(error.message || 'Failed to update admit card');
      return rejectWithValue(error.message || 'Failed to update admit card');
    }
  }
);

export const deleteAdmitCard = createAsyncThunk(
  'admitCards/deleteAdmitCard',
  async (id, { rejectWithValue }) => {
    try {
      const response = await admitCardService.deleteAdmitCard(id);
      toast.success('Admit card deleted successfully!');
      return { 
        success: true, 
        id,
        message: response.message || 'Admit card deleted successfully'
      };
    } catch (error) {
      toast.error(error.message || 'Failed to delete admit card');
      return rejectWithValue(error.message || 'Failed to delete admit card');
    }
  }
);

export const updateAdmitCardStatus = createAsyncThunk(
  'admitCards/updateAdmitCardStatus',
  async ({ id, status, rejectionReason = '' }, { rejectWithValue }) => {
    try {
      const response = await admitCardService.updateStatus(id, { status, rejectionReason });
      toast.success(`Admit card ${status} successfully!`);
      return { 
        success: true, 
        id,
        data: response.data || response,
        message: response.message || 'Status updated successfully'
      };
    } catch (error) {
      toast.error(error.message || 'Failed to update status');
      return rejectWithValue(error.message || 'Failed to update status');
    }
  }
);

export const fetchPublicAdmitCards = createAsyncThunk(
  'admitCards/fetchPublicAdmitCards',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await admitCardService.getPublicAdmitCards(params);
      return {
        success: true,
        data: response.data || [],
        pagination: response.pagination || {
          currentPage: 1,
          totalPages: 1,
          total: response.data?.length || 0,
          limit: params.limit || 10
        }
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch public admit cards');
    }
  }
);

export const fetchAdmitCardsByJobId = createAsyncThunk(
  'admitCards/fetchAdmitCardsByJobId',
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await admitCardService.getAdmitCardsByJobId(jobId);
      return {
        success: true,
        data: response.data || []
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch admit cards for this job');
    }
  }
);

// References slice
export const fetchAvailableReferences = createAsyncThunk(
  'admitCards/fetchAvailableReferences',
  async ({ type, search = '' }, { rejectWithValue }) => {
    try {
      const response = await admitCardService.getAvailableReferences({ type, search });
      return {
        success: true,
        data: response.data || []
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch references');
    }
  }
);

const admitCardSlice = createSlice({
  name: 'admitCards',
  initialState: {
    list: [],
    currentAdmitCard: null,
    references: [],
    loading: false,
    error: null,
    pagination: {
      currentPage: 1,
      totalPages: 1,
      total: 0,
      limit: 10
    },
    filters: {
      type: '',
      status: '',
      admitCardStatus: '',
      category: '',
      search: '',
      startDate: '',
      endDate: ''
    }
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentAdmitCard: (state) => {
      state.currentAdmitCard = null;
    },
    clearReferences: (state) => {
      state.references = [];
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = {
        type: '',
        status: '',
        admitCardStatus: '',
        category: '',
        search: '',
        startDate: '',
        endDate: ''
      };
    },
    resetAdmitCards: (state) => {
      state.list = [];
      state.currentAdmitCard = null;
      state.references = [];
      state.error = null;
      state.pagination = {
        currentPage: 1,
        totalPages: 1,
        total: 0,
        limit: 10
      };
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch admit cards
      .addCase(fetchAdmitCards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdmitCards.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchAdmitCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch admit card by ID
      .addCase(fetchAdmitCardById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdmitCardById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAdmitCard = action.payload.data;
      })
      .addCase(fetchAdmitCardById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create admit card
      .addCase(createAdmitCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAdmitCard.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          state.list.unshift(action.payload.data);
          state.pagination.total += 1;
        }
      })
      .addCase(createAdmitCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update admit card
      .addCase(updateAdmitCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAdmitCard.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          const index = state.list.findIndex(ac => ac._id === action.payload.data._id);
          if (index !== -1) {
            state.list[index] = action.payload.data;
          }
          if (state.currentAdmitCard?._id === action.payload.data._id) {
            state.currentAdmitCard = action.payload.data;
          }
        }
      })
      .addCase(updateAdmitCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete admit card
      .addCase(deleteAdmitCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAdmitCard.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter(ac => ac._id !== action.payload.id);
        state.pagination.total = Math.max(0, state.pagination.total - 1);
      })
      .addCase(deleteAdmitCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update status
      .addCase(updateAdmitCardStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAdmitCardStatus.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          const index = state.list.findIndex(ac => ac._id === action.payload.id);
          if (index !== -1) {
            state.list[index] = action.payload.data;
          }
          if (state.currentAdmitCard?._id === action.payload.id) {
            state.currentAdmitCard = action.payload.data;
          }
        }
      })
      .addCase(updateAdmitCardStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch public admit cards
      .addCase(fetchPublicAdmitCards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublicAdmitCards.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchPublicAdmitCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch by job ID
      .addCase(fetchAdmitCardsByJobId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdmitCardsByJobId.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
      })
      .addCase(fetchAdmitCardsByJobId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch available references
      .addCase(fetchAvailableReferences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAvailableReferences.fulfilled, (state, action) => {
        state.loading = false;
        // Extract the correct array based on the type
        const data = action.payload.data;
        if (data) {
          // The API returns { jobs: [], admissions: [], notices: [] }
          // Combine all arrays into one
          const allReferences = [
            ...(data.jobs || []),
            ...(data.admissions || []),
            ...(data.notices || [])
          ];
          state.references = allReferences;
        } else {
          state.references = [];
        }
      })
      .addCase(fetchAvailableReferences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.references = [];
      });
  }
});

export const { 
  setLoading, 
  setError, 
  clearError, 
  clearCurrentAdmitCard,
  clearReferences,
  setFilters,
  resetFilters,
  resetAdmitCards
} = admitCardSlice.actions;

export default admitCardSlice.reducer;