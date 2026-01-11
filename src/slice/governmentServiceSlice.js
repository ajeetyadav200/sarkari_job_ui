import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import governmentServiceService from '../services/governmentServiceService';
import { toast } from 'react-toastify';

// Async thunks
export const fetchGovernmentServices = createAsyncThunk(
  'governmentServices/fetchGovernmentServices',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await governmentServiceService.getAllServices(params);
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
      console.error('Fetch services error:', error);
      return rejectWithValue(error.message || 'Failed to fetch government services');
    }
  }
);

export const fetchServiceById = createAsyncThunk(
  'governmentServices/fetchServiceById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await governmentServiceService.getServiceById(id);
      return {
        success: true,
        data: response.data || response
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch service');
    }
  }
);

export const createGovernmentService = createAsyncThunk(
  'governmentServices/createGovernmentService',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await governmentServiceService.createService(formData);
      toast.success('Government service created successfully!');
      return {
        success: true,
        data: response.data || response
      };
    } catch (error) {
      toast.error(error.message || 'Failed to create service');
      return rejectWithValue(error.message || 'Failed to create service');
    }
  }
);

export const updateGovernmentService = createAsyncThunk(
  'governmentServices/updateGovernmentService',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await governmentServiceService.updateService(id, formData);
      toast.success('Government service updated successfully!');
      return {
        success: true,
        data: response.data || response
      };
    } catch (error) {
      toast.error(error.message || 'Failed to update service');
      return rejectWithValue(error.message || 'Failed to update service');
    }
  }
);

export const deleteGovernmentService = createAsyncThunk(
  'governmentServices/deleteGovernmentService',
  async (id, { rejectWithValue }) => {
    try {
      const response = await governmentServiceService.deleteService(id);
      toast.success('Government service deleted successfully!');
      return {
        success: true,
        id,
        message: response.message || 'Service deleted successfully'
      };
    } catch (error) {
      toast.error(error.message || 'Failed to delete service');
      return rejectWithValue(error.message || 'Failed to delete service');
    }
  }
);

export const updateServiceStatus = createAsyncThunk(
  'governmentServices/updateServiceStatus',
  async ({ id, status, rejectionReason = '', statusRemark = '' }, { rejectWithValue }) => {
    try {
      const response = await governmentServiceService.updateStatus(id, { status, rejectionReason, statusRemark });
      toast.success(`Service ${status} successfully!`);
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

export const fetchPublicServices = createAsyncThunk(
  'governmentServices/fetchPublicServices',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await governmentServiceService.getPublicServices(params);
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
      return rejectWithValue(error.message || 'Failed to fetch public services');
    }
  }
);

export const fetchServicesList = createAsyncThunk(
  'governmentServices/fetchServicesList',
  async (params = {}, { rejectWithValue, getState }) => {
    try {
      const response = await governmentServiceService.getServicesList(params);
      const currentList = params.append ? getState().governmentServices.list : [];
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
      return rejectWithValue(error.message || 'Failed to fetch services list');
    }
  }
);

export const fetchServicesByType = createAsyncThunk(
  'governmentServices/fetchServicesByType',
  async ({ serviceType, params = {} }, { rejectWithValue }) => {
    try {
      const response = await governmentServiceService.getServicesByType(serviceType, params);
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
      return rejectWithValue(error.message || 'Failed to fetch services by type');
    }
  }
);

export const fetchServiceTypes = createAsyncThunk(
  'governmentServices/fetchServiceTypes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await governmentServiceService.getServiceTypes();
      return {
        success: true,
        data: response.data || {}
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch service types');
    }
  }
);

export const fetchStatistics = createAsyncThunk(
  'governmentServices/fetchStatistics',
  async (_, { rejectWithValue }) => {
    try {
      const response = await governmentServiceService.getStatistics();
      return {
        success: true,
        data: response.data || {}
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch statistics');
    }
  }
);

const governmentServiceSlice = createSlice({
  name: 'governmentServices',
  initialState: {
    list: [],
    currentService: null,
    serviceTypes: {
      serviceTypes: [],
      serviceCategories: []
    },
    statistics: null,
    loading: false,
    error: null,
    pagination: {
      currentPage: 1,
      totalPages: 1,
      total: 0,
      limit: 10
    },
    filters: {
      serviceType: '',
      serviceCategory: '',
      state: '',
      status: '',
      activeStatus: '',
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
    clearCurrentService: (state) => {
      state.currentService = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = {
        serviceType: '',
        serviceCategory: '',
        state: '',
        status: '',
        activeStatus: '',
        search: '',
        startDate: '',
        endDate: ''
      };
    },
    resetServices: (state) => {
      state.list = [];
      state.currentService = null;
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
      // Fetch services
      .addCase(fetchGovernmentServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGovernmentServices.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchGovernmentServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch service by ID
      .addCase(fetchServiceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServiceById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentService = action.payload.data;
      })
      .addCase(fetchServiceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create service
      .addCase(createGovernmentService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createGovernmentService.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          state.list.unshift(action.payload.data);
          state.pagination.total += 1;
        }
      })
      .addCase(createGovernmentService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update service
      .addCase(updateGovernmentService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateGovernmentService.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          const index = state.list.findIndex(s => s._id === action.payload.data._id);
          if (index !== -1) {
            state.list[index] = action.payload.data;
          }
          if (state.currentService?._id === action.payload.data._id) {
            state.currentService = action.payload.data;
          }
        }
      })
      .addCase(updateGovernmentService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete service
      .addCase(deleteGovernmentService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteGovernmentService.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter(s => s._id !== action.payload.id);
        state.pagination.total = Math.max(0, state.pagination.total - 1);
      })
      .addCase(deleteGovernmentService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update status
      .addCase(updateServiceStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateServiceStatus.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          const index = state.list.findIndex(s => s._id === action.payload.id);
          if (index !== -1) {
            state.list[index] = action.payload.data;
          }
          if (state.currentService?._id === action.payload.id) {
            state.currentService = action.payload.data;
          }
        }
      })
      .addCase(updateServiceStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch public services
      .addCase(fetchPublicServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublicServices.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchPublicServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch services list
      .addCase(fetchServicesList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServicesList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchServicesList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch by type
      .addCase(fetchServicesByType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServicesByType.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchServicesByType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch service types
      .addCase(fetchServiceTypes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchServiceTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.serviceTypes = action.payload.data;
      })
      .addCase(fetchServiceTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch statistics
      .addCase(fetchStatistics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStatistics.fulfilled, (state, action) => {
        state.loading = false;
        state.statistics = action.payload.data;
      })
      .addCase(fetchStatistics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const {
  setLoading,
  setError,
  clearError,
  clearCurrentService,
  setFilters,
  resetFilters,
  resetServices
} = governmentServiceSlice.actions;

export default governmentServiceSlice.reducer;
