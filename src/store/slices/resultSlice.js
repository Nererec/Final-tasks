import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchHistogramsAndPublications, fetchBatchDocuments } from '../../services/resultService';


export const fetchResults = createAsyncThunk(
  'results/fetchResults',
  async (searchParams, { rejectWithValue }) => {
    try {
     
      const { histograms, ids } = await fetchHistogramsAndPublications(searchParams);

      const initialDocuments = await fetchBatchDocuments(ids, 0, 10);

    
      return { histograms, ids, initialDocuments };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



export const fetchMoreDocuments = createAsyncThunk(
  'results/fetchMoreDocuments',
  async ({ ids, offset, limit }, { rejectWithValue }) => {
    try {
      const documents = await fetchBatchDocuments(ids, offset, limit);

      if (!Array.isArray(documents)) {
        throw new Error('Response is not an array');
      }

      return documents;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const resultSlice = createSlice({
  name: 'results',
  initialState: {
    histograms: [],
    documentIds: [],
    documents: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearResults: (state) => {
      state.histograms = [];
      state.documentIds = [];
      state.documents = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
     
      .addCase(fetchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.histograms = action.payload.histograms;
        state.documentIds = action.payload.ids;
        state.documents = action.payload.initialDocuments;
      })
      
    
      .addCase(fetchMoreDocuments.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)) {
          state.documents = [...state.documents, ...action.payload];
        } else {
          console.error('Payload is not iterable:', action.payload);
        }
      })
      
      .addCase(fetchMoreDocuments.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearResults } = resultSlice.actions;

export default resultSlice.reducer;
