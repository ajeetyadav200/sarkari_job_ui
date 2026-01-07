
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import admissionService from '../services/admissionService';

// Async thunks
export const fetchAdmissions = createAsyncThunk(
  'admissions/fetchAdmissions',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await admissionService.getAllAdmissions(params);
      return {
        success: true,
        data: response.data || response.admissions || [],
        pagination: response.pagination || {
          currentPage: 1,
          totalPages: 1,
          totalAdmissions: response.data?.length || response.admissions?.length || 0,
          limit: params.limit || 10
        }
      };
    } catch (error) {
      console.error('Fetch admissions error:', error);
      return rejectWithValue(error.message || 'Failed to fetch admissions');
    }
  }
);

// Alias for fetchAdmissions
export const fetchAllAdmissions = fetchAdmissions;

export const fetchAdmissionById = createAsyncThunk(
  'admissions/fetchAdmissionById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await admissionService.getAdmissionById(id);
      return {
        success: true,
        data: response.data || response
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch admission');
    }
  }
);

export const createAdmission = createAsyncThunk(
  'admissions/createAdmission',
  async (admissionData, { rejectWithValue }) => {
    try {
      const response = await admissionService.createAdmission(admissionData);
      return {
        success: true,
        data: response.data || response
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create admission');
    }
  }
);

export const updateAdmission = createAsyncThunk(
  'admissions/updateAdmission',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await admissionService.updateAdmission(id, data);
      return {
        success: true,
        data: response.data || response
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update admission');
    }
  }
);

export const deleteAdmission = createAsyncThunk(
  'admissions/deleteAdmission',
  async (id, { rejectWithValue }) => {
    try {
      const response = await admissionService.deleteAdmission(id);
      return {
        success: true,
        id,
        message: response.message || 'Admission deleted successfully'
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete admission');
    }
  }
);

export const changeAdmissionStatus = createAsyncThunk(
  'admissions/changeAdmissionStatus',
  async ({ id, status, remark = '', rejectionReason = '' }, { rejectWithValue }) => {
    try {
      const response = await admissionService.updateStatus(id, { status, remark, rejectionReason });
      return {
        success: true,
        id,
        data: response.data || response,
        message: response.message || 'Status updated successfully'
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to change admission status');
    }
  }
);

export const fetchAdmissionStats = createAsyncThunk(
  'admissions/fetchAdmissionStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await admissionService.getStats();
      return {
        success: true,
        data: response.data || {
          totalAdmissions: 0,
          statusWise: [],
          categoryWise: [],
          recentAdmissions: []
        }
      };
    } catch (error) {
      console.error('Fetch admission stats error:', error);
      return {
        success: true,
        data: {
          totalAdmissions: 0,
          statusWise: [],
          categoryWise: [],
          recentAdmissions: []
        }
      };
    }
  }
);

export const fetchMyAdmissions = createAsyncThunk(
  'admissions/fetchMyAdmissions',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await admissionService.getMyAdmissions(params);
      return {
        success: true,
        data: response.data || [],
        pagination: response.pagination || {
          currentPage: 1,
          totalPages: 1,
          totalAdmissions: response.data?.length || 0,
          limit: params.limit || 20
        }
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch your admissions');
    }
  }
);

// Fetch admissions list with infinite scrolling
export const fetchAdmissionsList = createAsyncThunk(
  'admissions/fetchAdmissionsList',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await admissionService.getAdmissionsList(params);
      return {
        success: true,
        data: response.data || [],
        pagination: response.pagination || {
          currentPage: params.page || 1,
          totalPages: 1,
          totalAdmissions: response.data?.length || 0,
          limit: params.limit || 20,
          hasMore: response.pagination?.hasMore || false
        },
        append: params.append || false
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch admissions list');
    }
  }
);

export const fetchLatestAdmissions = createAsyncThunk(
  'admissions/fetchLatestAdmissions',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await admissionService.getLatestAdmissions(params);
      return {
        success: true,
        data: response.data || []
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch latest admissions');
    }
  }
);

const admissionSlice = createSlice({
  name: 'admissions',
  initialState: {
    list: [],
    currentAdmission: null,
    stats: null,
    loading: false,
    error: null,
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalAdmissions: 0,
      limit: 20,
      hasMore: false
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
    clearCurrentAdmission: (state) => {
      state.currentAdmission = null;
    },
    resetAdmissions: (state) => {
      state.list = [];
      state.currentAdmission = null;
      state.stats = null;
      state.error = null;
      state.pagination = {
        currentPage: 1,
        totalPages: 1,
        totalAdmissions: 0,
        limit: 20,
        hasMore: false
      };
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch admissions
      .addCase(fetchAdmissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdmissions.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchAdmissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.list = [];
        state.pagination = {
          currentPage: 1,
          totalPages: 1,
          totalAdmissions: 0,
          limit: 20,
          hasMore: false
        };
      })

      // Fetch admission by ID
      .addCase(fetchAdmissionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdmissionById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAdmission = action.payload.data;
      })
      .addCase(fetchAdmissionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create admission
      .addCase(createAdmission.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAdmission.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          state.list.unshift(action.payload.data);
          state.pagination.totalAdmissions += 1;
        }
      })
      .addCase(createAdmission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update admission
      .addCase(updateAdmission.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAdmission.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          const index = state.list.findIndex(admission => admission._id === action.payload.data._id);
          if (index !== -1) {
            state.list[index] = action.payload.data;
          }
          if (state.currentAdmission?._id === action.payload.data._id) {
            state.currentAdmission = action.payload.data;
          }
        }
      })
      .addCase(updateAdmission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete admission
      .addCase(deleteAdmission.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAdmission.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter(admission => admission._id !== action.payload.id);
        state.pagination.totalAdmissions = Math.max(0, state.pagination.totalAdmissions - 1);
      })
      .addCase(deleteAdmission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Change admission status
      .addCase(changeAdmissionStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeAdmissionStatus.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          const index = state.list.findIndex(admission => admission._id === action.payload.id);
          if (index !== -1) {
            state.list[index] = action.payload.data;
          }
          if (state.currentAdmission?._id === action.payload.id) {
            state.currentAdmission = action.payload.data;
          }
        }
      })
      .addCase(changeAdmissionStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch admission stats
      .addCase(fetchAdmissionStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdmissionStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.data;
      })
      .addCase(fetchAdmissionStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.stats = {
          totalAdmissions: 0,
          statusWise: [],
          categoryWise: [],
          recentAdmissions: []
        };
      })

      // Fetch my admissions
      .addCase(fetchMyAdmissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyAdmissions.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchMyAdmissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.list = [];
        state.pagination = {
          currentPage: 1,
          totalPages: 1,
          totalAdmissions: 0,
          limit: 20,
          hasMore: false
        };
      })

      // Fetch admissions list (infinite scrolling)
      .addCase(fetchAdmissionsList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdmissionsList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.append
          ? [...state.list, ...action.payload.data]
          : action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchAdmissionsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch latest admissions
      .addCase(fetchLatestAdmissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLatestAdmissions.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
      })
      .addCase(fetchLatestAdmissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const {
  setLoading,
  setError,
  clearError,
  clearCurrentAdmission,
  resetAdmissions
} = admissionSlice.actions;

export default admissionSlice.reducer;
