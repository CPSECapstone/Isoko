import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import searchResultsReducer from '../features/business/SearchResultsSlice';
import businessReducer from '../features/business/BusinessSlice';

export const store = configureStore({
   reducer: {
      counter: counterReducer,
      searchResults: searchResultsReducer,
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
