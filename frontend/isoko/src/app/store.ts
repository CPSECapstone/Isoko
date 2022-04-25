import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import searchResultsReducer from '../features/business/SearchResultsSlice';
import dashboardReducer from '../features/dashboard/DashboardSlice';
import profileReducer from '../features/profile/ProfileSlice';
import businessReducer from '../features/business/BusinessSlice';

export const store = configureStore({
   reducer: {
      searchResults: searchResultsReducer,
      dashboard: dashboardReducer,
      profile: profileReducer,
      business: businessReducer,
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
