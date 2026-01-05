// // slices/resultSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import resultService from '../services/resultService';
// import { toast } from 'react-toastify';

// // Async thunks
// export const fetchResults = createAsyncThunk(
//   'results/fetchResults',
//   async (params = {}, { rejectWithValue }) => {
//     try {
//       const response = await resultService.getAllResults(params);
//       return {
//         success: true,
//         data: response.data || [],
//         pagination: response.pagination || {
//           currentPage: 1,
//           totalPages: 1,
//           total: response.data?.length || 0,
//           limit: params.limit || 10
//         }
//       };
//     } catch (error) {
//       console.error('Fetch results error:', error);
//       return rejectWithValue(error.message || 'Failed to fetch results');
//     }
//   }
// );

// export const fetchResultById = createAsyncThunk(
//   'results/fetchResultById',
//   async (id, { rejectWithValue }) => {
//     try {
//       const response = await resultService.getResultById(id);
//       return {
//         success: true,
//         data: response.data || response
//       };
//     } catch (error) {
//       return rejectWithValue(error.message || 'Failed to fetch result');
//     }
//   }
// );

// export const createResult = createAsyncThunk(
//   'results/createResult',
//   async (resultData, { rejectWithValue }) => {
//     try {
//       const response = await resultService.createResult(resultData);
//       toast.success('Result created successfully!');
//       return {
//         success: true,
//         data: response.data || response
//       };
//     } catch (error) {
//       toast.error(error.message || 'Failed to create result');
//       return rejectWithValue(error.message || 'Failed to create result');
//     }
//   }
// );

// export const updateResult = createAsyncThunk(
//   'results/updateResult',
//   async ({ id, data }, { rejectWithValue }) => {
//     try {
//       const response = await resultService.updateResult(id, data);
//       toast.success('Result updated successfully!');
//       return {
//         success: true,
//         data: response.data || response
//       };
//     } catch (error) {
//       toast.error(error.message || 'Failed to update result');
//       return rejectWithValue(error.message || 'Failed to update result');
//     }
//   }
// );

// export const deleteResult = createAsyncThunk(
//   'results/deleteResult',
//   async (id, { rejectWithValue }) => {
//     try {
//       const response = await resultService.deleteResult(id);
//       toast.success('Result deleted successfully!');
//       return {
//         success: true,
//         id,
//         message: response.message || 'Result deleted successfully'
//       };
//     } catch (error) {
//       toast.error(error.message || 'Failed to delete result');
//       return rejectWithValue(error.message || 'Failed to delete result');
//     }
//   }
// );

// export const updateResultStatus = createAsyncThunk(
//   'results/updateResultStatus',
//   async ({ id, status, rejectionReason = '' }, { rejectWithValue }) => {
//     try {
//       const response = await resultService.updateStatus(id, { status, rejectionReason });
//       toast.success(`Result ${status} successfully!`);
//       return {
//         success: true,
//         id,
//         data: response.data || response,
//         message: response.message || 'Status updated successfully'
//       };
//     } catch (error) {
//       toast.error(error.message || 'Failed to update status');
//       return rejectWithValue(error.message || 'Failed to update status');
//     }
//   }
// );

// export const fetchPublicResults = createAsyncThunk(
//   'results/fetchPublicResults',
//   async (params = {}, { rejectWithValue }) => {
//     try {
//       const response = await resultService.getPublicResults(params);
//       return {
//         success: true,
//         data: response.data || [],
//         pagination: response.pagination || {
//           currentPage: 1,
//           totalPages: 1,
//           total: response.data?.length || 0,
//           limit: params.limit || 10
//         }
//       };
//     } catch (error) {
//       return rejectWithValue(error.message || 'Failed to fetch public results');
//     }
//   }
// );

// export const fetchResultsByJobId = createAsyncThunk(
//   'results/fetchResultsByJobId',
//   async (jobId, { rejectWithValue }) => {
//     try {
//       const response = await resultService.getResultsByJobId(jobId);
//       return {
//         success: true,
//         data: response.data || []
//       };
//     } catch (error) {
//       return rejectWithValue(error.message || 'Failed to fetch results for this job');
//     }
//   }
// );

// // References slice
// export const fetchAvailableReferences = createAsyncThunk(
//   'results/fetchAvailableReferences',
//   async ({ type, search = '' }, { rejectWithValue }) => {
//     try {
//       const response = await resultService.getAvailableReferences({ type, search });
//       return {
//         success: true,
//         data: response.data || []
//       };
//     } catch (error) {
//       return rejectWithValue(error.message || 'Failed to fetch references');
//     }
//   }
// );

// const resultSlice = createSlice({
//   name: 'results',
//   initialState: {
//     list: [],
//     currentResult: null,
//     references: [],
//     loading: false,
//     error: null,
//     pagination: {
//       currentPage: 1,
//       totalPages: 1,
//       total: 0,
//       limit: 10
//     },
//     filters: {
//       type: '',
//       status: '',
//       resultStatus: '',
//       category: '',
//       search: '',
//       startDate: '',
//       endDate: ''
//     }
//   },
//   reducers: {
//     setLoading: (state, action) => {
//       state.loading = action.payload;
//     },
//     setError: (state, action) => {
//       state.error = action.payload;
//     },
//     clearError: (state) => {
//       state.error = null;
//     },
//     clearCurrentResult: (state) => {
//       state.currentResult = null;
//     },
//     clearReferences: (state) => {
//       state.references = [];
//     },
//     setFilters: (state, action) => {
//       state.filters = { ...state.filters, ...action.payload };
//     },
//     resetFilters: (state) => {
//       state.filters = {
//         type: '',
//         status: '',
//         resultStatus: '',
//         category: '',
//         search: '',
//         startDate: '',
//         endDate: ''
//       };
//     },
//     resetResults: (state) => {
//       state.list = [];
//       state.currentResult = null;
//       state.references = [];
//       state.error = null;
//       state.pagination = {
//         currentPage: 1,
//         totalPages: 1,
//         total: 0,
//         limit: 10
//       };
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch results
//       .addCase(fetchResults.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchResults.fulfilled, (state, action) => {
//         state.loading = false;
//         state.list = action.payload.data;
//         state.pagination = action.payload.pagination;
//       })
//       .addCase(fetchResults.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Fetch result by ID
//       .addCase(fetchResultById.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchResultById.fulfilled, (state, action) => {
//         state.loading = false;
//         state.currentResult = action.payload.data;
//       })
//       .addCase(fetchResultById.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Create result
//       .addCase(createResult.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createResult.fulfilled, (state, action) => {
//         state.loading = false;
//         if (action.payload.data) {
//           state.list.unshift(action.payload.data);
//           state.pagination.total += 1;
//         }
//       })
//       .addCase(createResult.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Update result
//       .addCase(updateResult.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateResult.fulfilled, (state, action) => {
//         state.loading = false;
//         if (action.payload.data) {
//           const index = state.list.findIndex(r => r._id === action.payload.data._id);
//           if (index !== -1) {
//             state.list[index] = action.payload.data;
//           }
//           if (state.currentResult?._id === action.payload.data._id) {
//             state.currentResult = action.payload.data;
//           }
//         }
//       })
//       .addCase(updateResult.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Delete result
//       .addCase(deleteResult.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(deleteResult.fulfilled, (state, action) => {
//         state.loading = false;
//         state.list = state.list.filter(r => r._id !== action.payload.id);
//         state.pagination.total = Math.max(0, state.pagination.total - 1);
//       })
//       .addCase(deleteResult.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Update status
//       .addCase(updateResultStatus.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateResultStatus.fulfilled, (state, action) => {
//         state.loading = false;
//         if (action.payload.data) {
//           const index = state.list.findIndex(r => r._id === action.payload.id);
//           if (index !== -1) {
//             state.list[index] = action.payload.data;
//           }
//           if (state.currentResult?._id === action.payload.id) {
//             state.currentResult = action.payload.data;
//           }
//         }
//       })
//       .addCase(updateResultStatus.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Fetch public results
//       .addCase(fetchPublicResults.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchPublicResults.fulfilled, (state, action) => {
//         state.loading = false;
//         state.list = action.payload.data;
//         state.pagination = action.payload.pagination;
//       })
//       .addCase(fetchPublicResults.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Fetch by job ID
//       .addCase(fetchResultsByJobId.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchResultsByJobId.fulfilled, (state, action) => {
//         state.loading = false;
//         state.list = action.payload.data;
//       })
//       .addCase(fetchResultsByJobId.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Fetch available references
//       .addCase(fetchAvailableReferences.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchAvailableReferences.fulfilled, (state, action) => {
//         state.loading = false;
//         // Extract the correct array based on the type
//         const data = action.payload.data;
//         if (data) {
//           // The API returns { jobs: [], admissions: [], notices: [] }
//           // Combine all arrays into one
//           const allReferences = [
//             ...(data.jobs || []),
//             ...(data.admissions || []),
//             ...(data.notices || [])
//           ];
//           state.references = allReferences;
//         } else {
//           state.references = [];
//         }
//       })
//       .addCase(fetchAvailableReferences.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.references = [];
//       });
//   }
// });

// export const {
//   setLoading,
//   setError,
//   clearError,
//   clearCurrentResult,
//   clearReferences,
//   setFilters,
//   resetFilters,
//   resetResults
// } = resultSlice.actions;

// export default resultSlice.reducer;
// slices/resultSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import resultService from '../services/resultService';
import { toast } from 'react-toastify';

// Async thunks
export const fetchResults = createAsyncThunk(
  'results/fetchResults',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await resultService.getAllResults(params);
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
      console.error('Fetch results error:', error);
      return rejectWithValue(error.message || 'Failed to fetch results');
    }
  }
);

export const fetchResultById = createAsyncThunk(
  'results/fetchResultById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await resultService.getResultById(id);
      return {
        success: true,
        data: response.data || response
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch result');
    }
  }
);

export const createResult = createAsyncThunk(
  'results/createResult',
  async (resultData, { rejectWithValue }) => {
    try {
      const response = await resultService.createResult(resultData);
      toast.success('Result created successfully!');
      return {
        success: true,
        data: response.data || response
      };
    } catch (error) {
      toast.error(error.message || 'Failed to create result');
      return rejectWithValue(error.message || 'Failed to create result');
    }
  }
);

export const updateResult = createAsyncThunk(
  'results/updateResult',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await resultService.updateResult(id, data);
      toast.success('Result updated successfully!');
      return {
        success: true,
        data: response.data || response
      };
    } catch (error) {
      toast.error(error.message || 'Failed to update result');
      return rejectWithValue(error.message || 'Failed to update result');
    }
  }
);

export const deleteResult = createAsyncThunk(
  'results/deleteResult',
  async (id, { rejectWithValue }) => {
    try {
      const response = await resultService.deleteResult(id);
      toast.success('Result deleted successfully!');
      return { 
        success: true, 
        id,
        message: response.message || 'Result deleted successfully'
      };
    } catch (error) {
      toast.error(error.message || 'Failed to delete result');
      return rejectWithValue(error.message || 'Failed to delete result');
    }
  }
);

export const updateResultStatus = createAsyncThunk(
  'results/updateResultStatus',
  async ({ id, status, rejectionReason = '' }, { rejectWithValue }) => {
    try {
      const response = await resultService.updateStatus(id, { status, rejectionReason });
      toast.success(`Result ${status} successfully!`);
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

export const fetchPublicResults = createAsyncThunk(
  'results/fetchPublicResults',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await resultService.getPublicResults(params);
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
      return rejectWithValue(error.message || 'Failed to fetch public results');
    }
  }
);

export const fetchResultsList = createAsyncThunk(
  'results/fetchResultsList',
  async (params = {}, { rejectWithValue, getState }) => {
    try {
      const response = await resultService.getResultsList(params);
      const currentList = params.append ? getState().results.list : [];
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
      return rejectWithValue(error.message || 'Failed to fetch results list');
    }
  }
);

export const fetchResultsByJobId = createAsyncThunk(
  'results/fetchResultsByJobId',
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await resultService.getResultsByJobId(jobId);
      return {
        success: true,
        data: response.data || []
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch results for this job');
    }
  }
);

// References slice
export const fetchAvailableReferences = createAsyncThunk(
  'results/fetchAvailableReferences',
  async ({ type, search = '' }, { rejectWithValue }) => {
    try {
      const response = await resultService.getAvailableReferences({ type, search });
      return {
        success: true,
        data: response.data || []
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch references');
    }
  }
);

const resultSlice = createSlice({
  name: 'results',
  initialState: {
    list: [],
    currentResult: null,
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
      resultStatus: '',
      resultType: '',
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
    clearCurrentResult: (state) => {
      state.currentResult = null;
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
        resultStatus: '',
        resultType: '',
        category: '',
        search: '',
        startDate: '',
        endDate: ''
      };
    },
    resetResults: (state) => {
      state.list = [];
      state.currentResult = null;
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
      // Fetch results
      .addCase(fetchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch result by ID
      .addCase(fetchResultById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResultById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentResult = action.payload.data;
      })
      .addCase(fetchResultById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create result
      .addCase(createResult.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createResult.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          state.list.unshift(action.payload.data);
          state.pagination.total += 1;
        }
      })
      .addCase(createResult.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update result
      .addCase(updateResult.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateResult.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          const index = state.list.findIndex(r => r._id === action.payload.data._id);
          if (index !== -1) {
            state.list[index] = action.payload.data;
          }
          if (state.currentResult?._id === action.payload.data._id) {
            state.currentResult = action.payload.data;
          }
        }
      })
      .addCase(updateResult.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete result
      .addCase(deleteResult.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteResult.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter(r => r._id !== action.payload.id);
        state.pagination.total = Math.max(0, state.pagination.total - 1);
      })
      .addCase(deleteResult.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update status
      .addCase(updateResultStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateResultStatus.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          const index = state.list.findIndex(r => r._id === action.payload.id);
          if (index !== -1) {
            state.list[index] = action.payload.data;
          }
          if (state.currentResult?._id === action.payload.id) {
            state.currentResult = action.payload.data;
          }
        }
      })
      .addCase(updateResultStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch public results
      .addCase(fetchPublicResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublicResults.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchPublicResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch results list
      .addCase(fetchResultsList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResultsList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchResultsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch by job ID
      .addCase(fetchResultsByJobId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResultsByJobId.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
      })
      .addCase(fetchResultsByJobId.rejected, (state, action) => {
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
  clearCurrentResult,
  clearReferences,
  setFilters,
  resetFilters,
  resetResults
} = resultSlice.actions;

export default resultSlice.reducer;