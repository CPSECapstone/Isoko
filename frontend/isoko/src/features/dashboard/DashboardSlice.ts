import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Business } from '../../types/GlobalTypes';
import {
   fetchBusiness,
   updateBusinessDetails,
   fetchPageViews,
} from '../business/BusinessAPI';

export interface DashboardState {
   business: Business | null;
   analytics: {
      pageViews: Array<string>;
   };
   status: 'idle' | 'loading' | 'failed';
}

const initialState: DashboardState = {
   business: null,
   analytics: {
      pageViews: [],
   },
   status: 'idle',
};

export const initializeBusinessDashboardAsync = createAsyncThunk(
   'dashboard/initializeBusinessDashboard',
   async (businessId: string) => {
      const fetchBusinessPromise = fetchBusiness(businessId);
      const fetchPageViewsPromise = fetchPageViews(businessId);

      const [business, pageViews] = await Promise.all([
         fetchBusinessPromise,
         fetchPageViewsPromise,
      ]);

      return {
         business,
         pageViews,
      };
   }
);

export interface UpdateParams {
   businessId: string;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
         .addCase(initializeBusinessDashboardAsync.pending, (state) => {
            state.status = 'loading';
         })
         .addCase(
            initializeBusinessDashboardAsync.fulfilled,
            (state, action) => {
               state.status = 'idle';
               state.business = action.payload.business;
               state.analytics.pageViews = action.payload.pageViews;
            }
         )
         .addCase(updateBusinessDetailsAsync.pending, (state) => {
            state.status = 'loading';
         })
         .addCase(updateBusinessDetailsAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            // Need to keep any fields in store that we did not overwrite (I.E. Reviews)
            state.business = {
               ...state.business,
               ...action.payload,
            };
         });
   },
});

export default dashboardSlice.reducer;
