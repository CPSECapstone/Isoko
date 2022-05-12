import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BusinessPreview, SearchResults } from '../../types/GlobalTypes';
import { fetchSearchResults, SearchParams } from './SearchResultsAPI';
import minorityGroups from '../../constants/minorityGroups';

export interface SearchResultsState {
   results: SearchResults;
   searchTerm: string;
   minorityTags: Array<MinorityTag>;
   location: string;
   status: 'idle' | 'loading' | 'failed';
}

export interface MinorityTag {
   text: string;
   selected: boolean;
}

export interface SearchFeatures {
   searchTerm: string;
   minorityTags: Array<string>;
   location: string;
}

const initialState: SearchResultsState = {
   results: {
      brickMortar: [],
      online: [],
   },
   searchTerm: '',
   minorityTags: minorityGroups.map((group) => ({
      text: group,
      selected: false,
   })),
   location: '',
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
   reducers: {
      setSearchFeatures: (state, action: PayloadAction<SearchFeatures>) => {
         state.searchTerm = action.payload.searchTerm;
         state.location = action.payload.location;

         // If no tags are selected, auto select "Any Minority Owned"
         if (action.payload.minorityTags.length === 0) {
            state.minorityTags.map((tag) => {
               if (tag.text === 'Any Minority Owned') {
                  tag.selected = true;
               } else {
                  tag.selected = false;
               }
               return tag;
            });
         } else {
            state.minorityTags = state.minorityTags.map((tag) => {
               if (action.payload.minorityTags.includes(tag.text)) {
                  tag.selected = true;
               } else {
                  tag.selected = false;
               }
               return tag;
            });
         }
      },
      removeMinorityTag: (state, action: PayloadAction<string>) => {
         state.minorityTags = state.minorityTags.map((tag) => {
            if (tag.text === action.payload) {
               tag.selected = false;
            }
            return tag;
         });
      },
      setMinorityTags: (state, action: PayloadAction<Array<string>>) => {
         // If no tags are selected, auto select "Any Minority Owned"
         if (action.payload.length === 0) {
            state.minorityTags.map((tag) => {
               if (tag.text === 'Any Minority Owned') {
                  tag.selected = true;
               } else {
                  tag.selected = false;
               }
               return tag;
            });
         } else {
            state.minorityTags = state.minorityTags.map((tag) => {
               if (action.payload.includes(tag.text)) {
                  tag.selected = true;
               } else {
                  tag.selected = false;
               }
               return tag;
            });
         }
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(getSearchResultsAsync.pending, (state) => {
            state.status = 'loading';
         })
         .addCase(
            getSearchResultsAsync.fulfilled,
            (state, action: PayloadAction<SearchResults>) => {
               state.status = 'idle';
               state.results = action.payload;
            }
         );
   },
});

export const { setSearchFeatures, removeMinorityTag, setMinorityTags } =
   searchResultsSlice.actions;

export default searchResultsSlice.reducer;
