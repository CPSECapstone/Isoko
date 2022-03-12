import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BusinessPreview } from '../../types/GlobalTypes';
import { fetchSearchResults, SearchParams } from './SearchResultsAPI';

export interface SearchResultsState {
   businesses: Array<BusinessPreview>;
   status: 'idle' | 'loading' | 'failed';
}

const initialState: SearchResultsState = {
   businesses: [],
   status: 'idle',
};

export const getSearchResultsAsync = createAsyncThunk(
   'searchResults/fetchSearchResults',
   async (params: SearchParams) => {
      return await fetchSearchResults(params);
   }
);

export const searchResultsSlice = createSlice({
   name: 'searchResults',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getSearchResultsAsync.pending, (state) => {
            state.status = 'loading';
         })
         .addCase(getSearchResultsAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.businesses = action.payload;
         });
   },
});

export default searchResultsSlice.reducer;
