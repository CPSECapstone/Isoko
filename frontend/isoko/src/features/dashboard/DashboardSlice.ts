import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Business } from '../../types/GlobalTypes';
import { fetchBusinessDetails, updateBusinessDetails } from './DashboardAPI';

export interface DashboardState {
   business: Business | null;
   analytics: null;
   status: 'idle' | 'loading' | 'failed';
}

const initialState: DashboardState = {
   business: null,
   analytics: null,
   status: 'idle',
};

export const initializeBusinessDetailsAsync = createAsyncThunk(
   'dashboard/initializeBusinessDetails',
   async (businessId: string) => {
      return await fetchBusinessDetails(businessId);
   }
);

export interface UpdateParams {
   businessId: string;
   [key: string]: any;
}

export const updateBusinessDetailsAsync = createAsyncThunk(
   'dashboard/updateBusinessDetails',
   async (params: UpdateParams) => {
      const { businessId, ...updateFields } = params;
      return await updateBusinessDetails(businessId, updateFields);
   }
);

export const dashboardSlice = createSlice({
   name: 'dashboard',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(initializeBusinessDetailsAsync.pending, (state) => {
            state.status = 'loading';
         })
         .addCase(initializeBusinessDetailsAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.business = action.payload;
         })
         .addCase(updateBusinessDetailsAsync.pending, (state) => {
            state.status = 'loading';
         })
         .addCase(updateBusinessDetailsAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.business = action.payload;
         });
   },
});

export default dashboardSlice.reducer;
