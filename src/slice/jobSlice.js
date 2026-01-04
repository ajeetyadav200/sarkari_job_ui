
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiService from '../services/api';

// Async thunks
export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await ApiService.jobs.getAll(params);
      // Ensure response has the expected structure
      return {
        success: true,
        data: response.data || response.jobs || [],
        pagination: response.pagination || {
          currentPage: 1,
          totalPages: 1,
          totalJobs: response.data?.length || response.jobs?.length || 0,
          limit: params.limit || 10
        }
      };
    } catch (error) {
      console.error('Fetch jobs error:', error);
      return rejectWithValue(error.message || 'Failed to fetch jobs');
    }
  }
);

// Alias for fetchJobs - used in JobAlertPage
export const fetchAllJobs = fetchJobs;

export const fetchJobById = createAsyncThunk(
  'jobs/fetchJobById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await ApiService.jobs.getById(id);
      return {
        success: true,
        data: response.data || response
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch job');
    }
  }
);

export const createJob = createAsyncThunk(
  'jobs/createJob',
  async (jobData, { rejectWithValue }) => {
    try {
      const response = await ApiService.jobs.create(jobData);
      return {
        success: true,
        data: response.data || response
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create job');
    }
  }
);

export const updateJob = createAsyncThunk(
  'jobs/updateJob',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await ApiService.jobs.update(id, data);
      return {
        success: true,
        data: response.data || response
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update job');
    }
  }
);

export const deleteJob = createAsyncThunk(
  'jobs/deleteJob',
  async (id, { rejectWithValue }) => {
    try {
      const response = await ApiService.jobs.delete(id);
      return { 
        success: true, 
        id,
        message: response.message || 'Job deleted successfully'
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete job');
    }
  }
);

export const changeJobStatus = createAsyncThunk(
  'jobs/changeJobStatus',
  async ({ id, status, remark = '' }, { rejectWithValue }) => {
    try {
      const response = await ApiService.jobs.changeStatus(id, status, remark);
      return { 
        success: true, 
        id,
        data: response.data || response,
        message: response.message || 'Status updated successfully'
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to change job status');
    }
  }
);

export const fetchJobStats = createAsyncThunk(
  'jobs/fetchJobStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiService.jobs.getStats();
      return {
        success: true,
        data: response.data || {
          totalJobs: 0,
          statusWise: [],
          departmentWise: [],
          recentJobs: [],
          typeStats: [],
          modeStats: []
        }
      };
    } catch (error) {
      console.error('Fetch job stats error:', error);
      // Return default stats if API fails
      return {
        success: true,
        data: {
          totalJobs: 0,
          statusWise: [],
          departmentWise: [],
          recentJobs: [],
          typeStats: [],
          modeStats: []
        }
      };
    }
  }
);

export const fetchMyJobs = createAsyncThunk(
  'jobs/fetchMyJobs',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await ApiService.jobs.getMyJobs(params);
      return {
        success: true,
        data: response.data || [],
        pagination: response.pagination || {
          currentPage: 1,
          totalPages: 1,
          totalJobs: response.data?.length || 0,
          limit: params.limit || 20
        }
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch your jobs');
    }
  }
);

// Fetch jobs list with infinite scrolling
export const fetchJobsList = createAsyncThunk(
  'jobs/fetchJobsList',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await ApiService.jobs.getList(params);
      return {
        success: true,
        data: response.data || [],
        pagination: response.pagination || {
          currentPage: params.page || 1,
          totalPages: 1,
          totalJobs: response.data?.length || 0,
          limit: params.limit || 20,
          hasMore: response.pagination?.hasMore || false
        },
        append: params.append || false
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch jobs list');
    }
  }
);

const jobSlice = createSlice({
  name: 'jobs',
  initialState: {
    list: [],
    currentJob: null,
    stats: null,
    loading: false,
    error: null,
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalJobs: 0,
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
    clearCurrentJob: (state) => {
      state.currentJob = null;
    },
    resetJobs: (state) => {
      state.list = [];
      state.currentJob = null;
      state.stats = null;
      state.error = null;
      state.pagination = {
        currentPage: 1,
        totalPages: 1,
        totalJobs: 0,
        limit: 20,
        hasMore: false
      };
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch jobs
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.list = [];
        state.pagination = {
          currentPage: 1,
          totalPages: 1,
          totalJobs: 0,
          limit: 20,
          hasMore: false
        };
      })
      
      // Fetch job by ID
      .addCase(fetchJobById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentJob = action.payload.data;
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create job
      .addCase(createJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          state.list.unshift(action.payload.data);
          state.pagination.totalJobs += 1;
        }
      })
      .addCase(createJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update job
      .addCase(updateJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          const index = state.list.findIndex(job => job._id === action.payload.data._id);
          if (index !== -1) {
            state.list[index] = action.payload.data;
          }
          if (state.currentJob?._id === action.payload.data._id) {
            state.currentJob = action.payload.data;
          }
        }
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete job
      .addCase(deleteJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter(job => job._id !== action.payload.id);
        state.pagination.totalJobs = Math.max(0, state.pagination.totalJobs - 1);
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Change job status
      .addCase(changeJobStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeJobStatus.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          const index = state.list.findIndex(job => job._id === action.payload.id);
          if (index !== -1) {
            state.list[index] = action.payload.data;
          }
          if (state.currentJob?._id === action.payload.id) {
            state.currentJob = action.payload.data;
          }
        }
      })
      .addCase(changeJobStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch job stats
      .addCase(fetchJobStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.data;
      })
      .addCase(fetchJobStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.stats = {
          totalJobs: 0,
          statusWise: [],
          departmentWise: [],
          recentJobs: [],
          typeStats: [],
          modeStats: []
        };
      })
      
      // Fetch my jobs
      .addCase(fetchMyJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchMyJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.list = [];
        state.pagination = {
          currentPage: 1,
          totalPages: 1,
          totalJobs: 0,
          limit: 20,
          hasMore: false
        };
      })

      // Fetch jobs list (infinite scrolling)
      .addCase(fetchJobsList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobsList.fulfilled, (state, action) => {
        state.loading = false;
        // If append is true, add to existing list; otherwise replace
        state.list = action.payload.append
          ? [...state.list, ...action.payload.data]
          : action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchJobsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { 
  setLoading, 
  setError, 
  clearError, 
  clearCurrentJob,
  resetJobs 
} = jobSlice.actions;

export default jobSlice.reducer;