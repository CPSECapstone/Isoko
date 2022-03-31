import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import searchResultsReducer from '../features/business/SearchResultsSlice';
import dashboardReducer from '../features/dashboard/DashboardSlice';

export const store = configureStore({
   reducer: {
      counter: counterReducer,
      searchResults: searchResultsReducer,
      dashboard: dashboardReducer,
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
