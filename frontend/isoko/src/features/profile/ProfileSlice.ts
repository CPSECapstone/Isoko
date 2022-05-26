import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/GlobalTypes';
import {
   fetchProfile,
   updateProfilePic,
   updateUserToBusinessOwner,
} from './ProfileAPI';

export interface ProfileState extends User {
   status: 'idle' | 'loading' | 'failed';
}

const initialState: ProfileState = {
   userSub: '',
   name: '',
   email: '',
   profilePicture: '',
   businessOwner: false,
   status: 'idle',
};

export const fetchProfileAsync = createAsyncThunk(
   'profile/fetchProfile',
   async (userSub: string) => {
      return await fetchProfile(userSub);
   }
);

export interface ProfilePicUpdateParams {
   userSub: string;
   profilePicture: string;
}

export const updateProfilePicAsync = createAsyncThunk(
   'profile/updateProfilePic',
   async (params: ProfilePicUpdateParams) => {
      const { userSub, profilePicture } = params;
      return await updateProfilePic(userSub, profilePicture);
   }
);

export interface UserToBusinessOwnerUpdateParams {
   userSub: string;
   businessId: string;
}

export const updateUserToBusinessOwnerAsync = createAsyncThunk(
   'profile/updateUserToBusinessOwner',
   async (params: UserToBusinessOwnerUpdateParams) => {
      const { userSub, businessId } = params;
      return await updateUserToBusinessOwner(userSub, businessId);
   }
);

export const profileSlice = createSlice({
   name: 'profile',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchProfileAsync.pending, (state) => {
            state.status = 'loading';
         })
         .addCase(fetchProfileAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            const {
               userSub,
               name,
               email,
               profilePicture,
               businessOwner,
               businessId,
            } = action.payload;

            state.userSub = userSub;
            state.name = name;
            state.email = email;
            state.profilePicture = profilePicture;
            state.businessOwner = businessOwner;
            state.businessId = businessId;
         })
         .addCase(updateProfilePicAsync.pending, (state) => {
            state.status = 'loading';
         })
         .addCase(updateProfilePicAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            const { profilePicture } = action.payload;

            state.profilePicture = profilePicture;
         })
         .addCase(updateUserToBusinessOwnerAsync.pending, (state) => {
            state.status = 'loading';
         })
         .addCase(updateUserToBusinessOwnerAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            const { businessId, businessOwner } = action.payload;

            state.businessId = businessId;
            state.businessOwner = businessOwner;
         });
   },
});

export default profileSlice.reducer;
