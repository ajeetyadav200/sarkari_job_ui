import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import answerService from '../services/answerService';
import { toast } from 'react-toastify';

// Async thunks
export const fetchAnswers = createAsyncThunk(
  'answers/fetchAnswers',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await answerService.getAllAnswers(params);
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
      console.error('Fetch answers error:', error);
      return rejectWithValue(error.message || 'Failed to fetch answers');
    }
  }
);

export const fetchAnswerById = createAsyncThunk(
  'answers/fetchAnswerById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await answerService.getAnswerById(id);
      return {
        success: true,
        data: response.data || response
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch answer');
    }
  }
);

export const createAnswer = createAsyncThunk(
  'answers/createAnswer',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await answerService.createAnswer(formData);
      toast.success('Answer created successfully!');
      return {
        success: true,
        data: response.data || response
      };
    } catch (error) {
      toast.error(error.message || 'Failed to create answer');
      return rejectWithValue(error.message || 'Failed to create answer');
    }
  }
);

export const updateAnswer = createAsyncThunk(
  'answers/updateAnswer',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await answerService.updateAnswer(id, formData);
      toast.success('Answer updated successfully!');
      return {
        success: true,
        data: response.data || response
      };
    } catch (error) {
      toast.error(error.message || 'Failed to update answer');
      return rejectWithValue(error.message || 'Failed to update answer');
    }
  }
);

export const deleteAnswer = createAsyncThunk(
  'answers/deleteAnswer',
  async (id, { rejectWithValue }) => {
    try {
      const response = await answerService.deleteAnswer(id);
      toast.success('Answer deleted successfully!');
      return {
        success: true,
        id,
        message: response.message || 'Answer deleted successfully'
      };
    } catch (error) {
      toast.error(error.message || 'Failed to delete answer');
      return rejectWithValue(error.message || 'Failed to delete answer');
    }
  }
);

export const updateAnswerStatus = createAsyncThunk(
  'answers/updateAnswerStatus',
  async ({ id, status, rejectionReason = '' }, { rejectWithValue }) => {
    try {
      const response = await answerService.updateStatus(id, { status, rejectionReason });
      toast.success(`Answer ${status} successfully!`);
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

export const fetchPublicAnswers = createAsyncThunk(
  'answers/fetchPublicAnswers',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await answerService.getPublicAnswers(params);
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
      return rejectWithValue(error.message || 'Failed to fetch public answers');
    }
  }
);

export const fetchAnswersList = createAsyncThunk(
  'answers/fetchAnswersList',
  async (params = {}, { rejectWithValue, getState }) => {
    try {
      const response = await answerService.getAnswersList(params);
      const currentList = params.append ? getState().answers.list : [];
      return {
        success: true,
        data: params.append ? [...currentList, ...(response.data || [])] : (response.data || []),
        pagination: {
          currentPage: response.pagination?.currentPage || params.page || 1,
          totalPages: response.pagination?.totalPages || 1,
          total: response.pagination?.total || 0,
          limit: params.limit || 20,
          hasMore: response.pagination?.hasMore || false
        }
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch answers list');
    }
  }
);

export const fetchAnswersByJobId = createAsyncThunk(
  'answers/fetchAnswersByJobId',
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await answerService.getAnswersByJobId(jobId);
      return {
        success: true,
        data: response.data || []
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch answers for this job');
    }
  }
);

// References slice
export const fetchAvailableReferences = createAsyncThunk(
  'answers/fetchAvailableReferences',
  async ({ type, search = '' }, { rejectWithValue }) => {
    try {
      const response = await answerService.getAvailableReferences({ type, search });
      return {
        success: true,
        data: response.data || []
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch references');
    }
  }
);

const answerSlice = createSlice({
  name: 'answers',
  initialState: {
    list: [],
    currentAnswer: null,
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
      answerStatus: '',
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
    clearCurrentAnswer: (state) => {
      state.currentAnswer = null;
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
        answerStatus: '',
        category: '',
        search: '',
        startDate: '',
        endDate: ''
      };
    },
    resetAnswers: (state) => {
      state.list = [];
      state.currentAnswer = null;
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
      // Fetch answers
      .addCase(fetchAnswers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnswers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchAnswers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch answer by ID
      .addCase(fetchAnswerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnswerById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAnswer = action.payload.data;
      })
      .addCase(fetchAnswerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create answer
      .addCase(createAnswer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAnswer.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          state.list.unshift(action.payload.data);
          state.pagination.total += 1;
        }
      })
      .addCase(createAnswer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update answer
      .addCase(updateAnswer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAnswer.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          const index = state.list.findIndex(a => a._id === action.payload.data._id);
          if (index !== -1) {
            state.list[index] = action.payload.data;
          }
          if (state.currentAnswer?._id === action.payload.data._id) {
            state.currentAnswer = action.payload.data;
          }
        }
      })
      .addCase(updateAnswer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete answer
      .addCase(deleteAnswer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAnswer.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter(a => a._id !== action.payload.id);
        state.pagination.total = Math.max(0, state.pagination.total - 1);
      })
      .addCase(deleteAnswer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update status
      .addCase(updateAnswerStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAnswerStatus.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          const index = state.list.findIndex(a => a._id === action.payload.id);
          if (index !== -1) {
            state.list[index] = action.payload.data;
          }
          if (state.currentAnswer?._id === action.payload.id) {
            state.currentAnswer = action.payload.data;
          }
        }
      })
      .addCase(updateAnswerStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch public answers
      .addCase(fetchPublicAnswers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublicAnswers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchPublicAnswers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch answers list
      .addCase(fetchAnswersList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnswersList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchAnswersList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch by job ID
      .addCase(fetchAnswersByJobId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnswersByJobId.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
      })
      .addCase(fetchAnswersByJobId.rejected, (state, action) => {
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
        const data = action.payload.data;
        if (data) {
          // The API returns { jobs: [], admissions: [], notices: [] }
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
  clearCurrentAnswer,
  clearReferences,
  setFilters,
  resetFilters,
  resetAnswers
} = answerSlice.actions;

export default answerSlice.reducer;
