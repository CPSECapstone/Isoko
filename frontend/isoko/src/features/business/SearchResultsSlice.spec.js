import searchResultsReducer, {
   getSearchResultsAsync,
   setSearchFeatures,
   setMinorityTags,
   removeMinorityTag,
} from './SearchResultsSlice';
import axios from 'axios';
import { environment } from '../../environment/environment';
import minorityGroups from '../../constants/minorityGroups';

jest.mock('axios');

describe('searchResultsReducer tests', () => {
   const dispatch = jest.fn();

   afterEach(() => {
      axios.post.mockReset();
      dispatch.mockReset();
   });

   const initialState = {
      businesses: [],
      searchTerm: '',
      minorityTags: minorityGroups.map((group) => ({
         text: group,
         selected: false,
      })),
      location: '',
      status: 'idle',
   };

   it('should handle initial state', () => {
      // Arrange

      // Act
      const actualInitialState = searchResultsReducer(undefined, {
         type: 'unknown',
      });

      // Assert
      expect(actualInitialState).toEqual(initialState);
   });

   describe('getSearchResultsAsync tests', () => {
      it('should set businesses', async () => {
         // Arrange
         axios.post.mockResolvedValue({
            data: {
               results: [
                  {
                     name: 'Firestone Grill',
                     city: 'San Luis Obispo',
                     type: 'B&M',
                     tags: ['Black-Owned'],
                     keywords: ['Burgers', 'Tri-tip'],
                     rating: 4.5,
                     shortDesc: 'Firstone grill is lit',
                     numReviews: 49,
                     verified: true,
                     businessId: 'FIRESTONE_GRILL',
                     photo: 'photo-link',
                     zipCode: 93405,
                  },
                  {
                     name: 'Lincoln Deli',
                     city: 'San Luis Obispo',
                     type: 'B&M',
                     tags: ['Asian-Owned'],
                     keywords: ['Sandwiches'],
                     rating: 4.5,
                     shortDesc: 'Lincoln deli is lit',
                     numReviews: 49,
                     verified: true,
                     businessId: 'LINCOLN_DELI',
                     photo: 'photo-link',
                     zipCode: 93405,
                  },
                  {
                     name: 'High St. Deli',
                     city: 'San Luis Obispo',
                     type: 'B&M',
                     tags: ['Viet-Owned'],
                     keywords: ['Sandwiches'],
                     rating: 4.5,
                     shortDesc: 'High St. Deli is lit',
                     numReviews: 49,
                     verified: true,
                     businessId: 'HIGH_ST_DELI',
                     photo: 'photo-link',
                     zipCode: 93405,
                  },
               ],
            },
         });

         // Act
         const resultState = searchResultsReducer(
            initialState,
            await getSearchResultsAsync({
               location: 'CA/San Luis Obispo',
            })(dispatch)
         );

         // Assert
         expect(resultState.businesses).toEqual([
            {
               name: 'Firestone Grill',
               city: 'San Luis Obispo',
               type: 'B&M',
               tags: ['Black-Owned'],
               keywords: ['Burgers', 'Tri-tip'],
               rating: 4.5,
               shortDesc: 'Firstone grill is lit',
               numReviews: 49,
               verified: true,
               businessId: 'FIRESTONE_GRILL',
               photo: 'photo-link',
               zipCode: 93405,
            },
            {
               name: 'Lincoln Deli',
               city: 'San Luis Obispo',
               type: 'B&M',
               tags: ['Asian-Owned'],
               keywords: ['Sandwiches'],
               rating: 4.5,
               shortDesc: 'Lincoln deli is lit',
               numReviews: 49,
               verified: true,
               businessId: 'LINCOLN_DELI',
               photo: 'photo-link',
               zipCode: 93405,
            },
            {
               name: 'High St. Deli',
               city: 'San Luis Obispo',
               type: 'B&M',
               tags: ['Viet-Owned'],
               keywords: ['Sandwiches'],
               rating: 4.5,
               shortDesc: 'High St. Deli is lit',
               numReviews: 49,
               verified: true,
               businessId: 'HIGH_ST_DELI',
               photo: 'photo-link',
               zipCode: 93405,
            },
         ]);
      });

      it('Should send a properly formatted POST request', async () => {
         // Arrange
         axios.post.mockResolvedValue({
            data: [],
         });

         // Act
         searchResultsReducer(
            initialState,
            await getSearchResultsAsync({
               location: 'CA/San Luis Obispo',
               keyword: 'Burgers',
               tags: ['Black-Owned'],
               category: 'Restaurants',
            })(dispatch)
         );

         // Assert
         expect(axios.post).toHaveBeenCalledWith(
            `${environment.prodURL}/searchBusiness`,
            {
               location: 'CA/San Luis Obispo',
               keyword: 'Burgers',
               tags: ['Black-Owned'],
               category: 'Restaurants',
            }
         );
      });
   });

   describe('setMinorityTags tests', () => {
      it('Should update passed in minority tags to selected', () => {
         // Arange
         const newTags = [minorityGroups[0], minorityGroups[1]];

         // Act
         const store = searchResultsReducer(
            initialState,
            setMinorityTags(newTags)
         );

         // Assert
         expect(store.minorityTags).toEqual(
            minorityGroups.map((group, idx) => {
               if (idx === 0 || idx === 1) {
                  return {
                     text: group,
                     selected: true,
                  };
               }
               return {
                  text: group,
                  selected: false,
               };
            })
         );
      });

      it('Should overwrite existing selected tags and only set new tags to selected', () => {
         // Arange
         const newTags = [minorityGroups[0], minorityGroups[1]];
         const initiallySelectedTags = minorityGroups.map((group) => ({
            text: group,
            selected: true,
         }));

         // Act
         const store = searchResultsReducer(
            {
               ...initialState,
               minorityTags: initiallySelectedTags,
            },
            setMinorityTags(newTags)
         );

         // Assert
         expect(store.minorityTags).toEqual(
            minorityGroups.map((group, idx) => {
               if (idx === 0 || idx === 1) {
                  return {
                     text: group,
                     selected: true,
                  };
               }
               return {
                  text: group,
                  selected: false,
               };
            })
         );
      });

      it('Should set minority tags to "Any Minority Owned" if no tags selected', () => {
         // Arange
         const newTags = [];

         // Act
         const store = searchResultsReducer(
            initialState,
            setMinorityTags(newTags)
         );

         // Assert
         expect(store.minorityTags).toEqual(
            minorityGroups.map((group) => {
               if (group === 'Any Minority Owned') {
                  return {
                     text: group,
                     selected: true,
                  };
               }
               return {
                  text: group,
                  selected: false,
               };
            })
         );
      });
   });

   describe('setSearchFeatures tests', () => {
      it('Should update searchTerm, location, and minorityTags', () => {
         // Arange
         const searchFeatures = {
            searchTerm: 'Ramen Nagi',
            location: 'Sunnyvale, CA, USA',
            minorityTags: [minorityGroups[0], minorityGroups[1]],
         };

         // Act
         const store = searchResultsReducer(
            initialState,
            setSearchFeatures(searchFeatures)
         );

         // Assert
         expect(store.searchTerm).toBe(searchFeatures.searchTerm);
         expect(store.location).toBe(searchFeatures.location);
         expect(store.minorityTags).toEqual(
            minorityGroups.map((group, idx) => {
               if (idx === 0 || idx === 1) {
                  return {
                     text: group,
                     selected: true,
                  };
               }
               return {
                  text: group,
                  selected: false,
               };
            })
         );
      });

      it('Should update searchTerm, location, and minorityTags', () => {
         // Arange
         const searchFeatures = {
            minorityTags: [],
         };

         // Act
         const store = searchResultsReducer(
            initialState,
            setSearchFeatures(searchFeatures)
         );

         // Assert
         expect(store.minorityTags).toEqual(
            minorityGroups.map((group) => {
               if (group === 'Any Minority Owned') {
                  return {
                     text: group,
                     selected: true,
                  };
               }
               return {
                  text: group,
                  selected: false,
               };
            })
         );
      });
   });

   describe('removeMinorityTag tests', () => {
      it('Should set selected to false for only the specified tag', () => {
         // Arange
         const removeTag = minorityGroups[4];
         const initiallySelectedTags = minorityGroups.map((group) => ({
            text: group,
            selected: true,
         }));

         // Act
         const store = searchResultsReducer(
            {
               ...initialState,
               minorityTags: initiallySelectedTags,
            },
            removeMinorityTag(removeTag)
         );

         // Assert
         expect(store.minorityTags).toEqual(
            minorityGroups.map((group, idx) => {
               if (idx === 4) {
                  return {
                     text: group,
                     selected: false,
                  };
               }
               return {
                  text: group,
                  selected: true,
               };
            })
         );
      });
   });
});
