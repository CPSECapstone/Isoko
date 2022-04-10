import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Business } from '../../types/GlobalTypes';
import { fetchBusiness } from './BusinessAPI';

export interface BusinessState {
   status: 'idle' | 'loading' | 'failed';
   businesses: { [key: string]: Business };
}

const initialState: BusinessState = {
   status: 'idle',
   businesses: {},
};

export const getBusinessAsync = createAsyncThunk(
   'business/fetchBusiness',
   async (businessId: string) => {
      return await fetchBusiness(businessId);
   }
);

export const businessSlice = createSlice({
   name: 'business',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getBusinessAsync.pending, (state) => {
            state.status = 'loading';
         })
         .addCase(
            getBusinessAsync.fulfilled,
            (state, action: PayloadAction<Business>) => {
               state.status = 'idle';
               state.businesses[action.payload.businessId] = action.payload; // CHECKCEHICEJCKEC
            }
         );
   },
});

export default businessSlice.reducer;
