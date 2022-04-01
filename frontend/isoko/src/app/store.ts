import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import searchResultsReducer from '../features/business/SearchResultsSlice';
import profileReducer from '../features/profile/ProfileSlice';

export const store = configureStore({
   reducer: {
      searchResults: searchResultsReducer,
      profile: profileReducer,
   },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
   ReturnType,
   RootState,
   unknown,
   Action<string>
>;
