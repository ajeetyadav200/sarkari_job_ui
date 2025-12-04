import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiService from '../services/api';

// Async thunks
export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await ApiService.jobs.getAll(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchJobById = createAsyncThunk(
  'jobs/fetchJobById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await ApiService.jobs.getById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createJob = createAsyncThunk(
  'jobs/createJob',
  async (jobData, { rejectWithValue }) => {
    try {
      const response = await ApiService.jobs.create(jobData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateJob = createAsyncThunk(
  'jobs/updateJob',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await ApiService.jobs.update(id, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteJob = createAsyncThunk(
  'jobs/deleteJob',
  async (id, { rejectWithValue }) => {
    try {
      const response = await ApiService.jobs.delete(id);
      return { id, ...response };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const changeJobStatus = createAsyncThunk(
  'jobs/changeJobStatus',
  async ({ id, status, remark = '' }, { rejectWithValue }) => {
    try {
      const response = await ApiService.jobs.changeStatus(id, status, remark);
      return { id, ...response };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchJobStats = createAsyncThunk(
  'jobs/fetchJobStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiService.jobs.getStats();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchMyJobs = createAsyncThunk(
  'jobs/fetchMyJobs',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await ApiService.jobs.getMyJobs(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
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
      limit: 10
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
        limit: 10
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
        state.list = action.payload.data || [];
        state.pagination = action.payload.pagination || state.pagination;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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
        state.list.unshift(action.payload.data);
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
        const index = state.list.findIndex(job => job._id === action.payload.data._id);
        if (index !== -1) {
          state.list[index] = action.payload.data;
        }
        if (state.currentJob?._id === action.payload.data._id) {
          state.currentJob = action.payload.data;
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
        const index = state.list.findIndex(job => job._id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload.data;
        }
        if (state.currentJob?._id === action.payload.id) {
          state.currentJob = action.payload.data;
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
      })
      
      // Fetch my jobs
      .addCase(fetchMyJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data || [];
        state.pagination = action.payload.pagination || state.pagination;
      })
      .addCase(fetchMyJobs.rejected, (state, action) => {
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