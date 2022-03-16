import searchResultsReducer, {
   getSearchResultsAsync,
} from './SearchResultsSlice';
import axios from 'axios';
import { environment } from '../../environment/environment';

jest.mock('axios');

describe('searchResultsReducer tests', () => {
   const dispatch = jest.fn();

   afterEach(() => {
      axios.post.mockReset();
      dispatch.mockReset();
   });

   const initialState = {
      businesses: [],
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
         expect(resultState).toEqual({
            businesses: [
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
            status: 'idle',
         });
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
});
