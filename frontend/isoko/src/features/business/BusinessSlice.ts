import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Business, Review } from '../../types/GlobalTypes';
import { fetchBusiness, postReview } from './BusinessAPI';

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

export const postReviewAsync = createAsyncThunk(
   'business/postReview',
   async (params: {
      businessId: string;
      review: Review;
      authToken: string;
      category: string;
   }) => {
      return await postReview(
         params.businessId,
         params.review,
         params.authToken,
         params.category
      );
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
               state.businesses[action.payload.businessId] = action.payload;
            }
         )
         .addCase(
            postReviewAsync.fulfilled,
            (
               state,
               action: PayloadAction<{ businessId: string; review: Review }>
            ) => {
               state.status = 'idle';
               state.businesses[action.payload.businessId].reviews = [
                  action.payload.review,
                  ...state.businesses[action.payload.businessId].reviews,
               ];
            }
         );
   },
});

export default businessSlice.reducer;
