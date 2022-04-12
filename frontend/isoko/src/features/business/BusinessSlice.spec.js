import businessReducer, { getBusinessAsync } from './BusinessSlice';
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
      businesses: {},
      status: 'idle',
   };

   it('should handle initial state', () => {
      // Arrange

      // Act
      const actualInitialState = businessReducer(undefined, {
         type: 'unknown',
      });

      // Assert
      expect(actualInitialState).toEqual(initialState);
   });

   describe('getBusinessAsync tests', () => {
      it('should add a business to the state', async () => {
         // Arrange
         axios.get.mockResolvedValue({
            data: {
               results: {
                  name: 'Lincoln Deli',
                  city: 'San Luis Obispo',
                  type: 'B&M',
                  tags: ['Black Owned'],
                  keywords: ['Sandwiches', 'Drinks'],
                  rating: 100,
                  shortDesc: 'We sell sandwiches',
                  numReviews: 20,
                  claimed: false,
                  businessId: 'lincolndeli123',
                  hours: {
                     mon: '11:00am - 11:00pm',
                  },
                  links: {
                     Menu: 'www.lincolndeli.com/menu',
                  },
                  address: '123 Sesame St.',
                  aboutOwner: {
                     owner: 'ownerSub123',
                     ownerName: 'Billiam Jones',
                     ownerPhone: '123-123-1111',
                     ownerDesc: 'Big Chiller',
                     photo: 'tests3',
                  },
                  reviews: [],
               },
            },
         });

         // Act
         const resultState = businessReducer(
            initialState,
            await getBusinessAsync('lincolndeli123')(dispatch)
         );

         // Assert
         expect(resultState.businesses).toEqual({
            lincolndeli123: {
               name: 'Lincoln Deli',
               city: 'San Luis Obispo',
               type: 'B&M',
               tags: ['Black Owned'],
               keywords: ['Sandwiches', 'Drinks'],
               rating: 100,
               shortDesc: 'We sell sandwiches',
               numReviews: 20,
               claimed: false,
               businessId: 'lincolndeli123',
               hours: {
                  mon: '11:00am - 11:00pm',
               },
               links: {
                  Menu: 'www.lincolndeli.com/menu',
               },
               address: '123 Sesame St.',
               aboutOwner: {
                  owner: 'ownerSub123',
                  ownerName: 'Billiam Jones',
                  ownerPhone: '123-123-1111',
                  ownerDesc: 'Big Chiller',
                  photo: 'tests3',
               },
               reviews: [],
            },
         });
      });

      it('should add a second business to state with pre-existing business', async () => {
         // Arrange
         axios.get.mockResolvedValue({
            data: {
               results: {
                  name: 'Taqueria',
                  city: 'San Luis Obispo',
                  type: 'B&M',
                  tags: ['Black Owned'],
                  keywords: ['Sandwiches', 'Drinks'],
                  rating: 100,
                  shortDesc: 'We sell sandwiches',
                  numReviews: 20,
                  claimed: false,
                  businessId: 'taqueria123',
                  hours: {
                     mon: '11:00am - 11:00pm',
                  },
                  links: {
                     Menu: 'www.taqueria.com/menu',
                  },
                  address: '123 Sesame St.',
                  aboutOwner: {
                     owner: 'ownerSub123',
                     ownerName: 'Billiam Jones',
                     ownerPhone: '123-123-1111',
                     ownerDesc: 'Big Chiller',
                     photo: 'tests3',
                  },
                  reviews: [],
               },
            },
         });

         // Act
         const resultState = businessReducer(
            {
               status: 'idle',
               businesses: {
                  lincolndeli123: {
                     name: 'Lincoln Deli',
                     city: 'San Luis Obispo',
                     type: 'B&M',
                     tags: ['Black Owned'],
                     keywords: ['Sandwiches', 'Drinks'],
                     rating: 100,
                     shortDesc: 'We sell sandwiches',
                     numReviews: 20,
                     claimed: false,
                     businessId: 'lincolndeli123',
                     hours: {
                        mon: '11:00am - 11:00pm',
                     },
                     links: {
                        Menu: 'www.lincolndeli.com/menu',
                     },
                     address: '123 Sesame St.',
                     aboutOwner: {
                        owner: 'ownerSub123',
                        ownerName: 'Billiam Jones',
                        ownerPhone: '123-123-1111',
                        ownerDesc: 'Big Chiller',
                        photo: 'tests3',
                     },
                     reviews: [],
                  },
               },
            },
            await getBusinessAsync('taqueria123')(dispatch)
         );

         // Assert
         expect(resultState.businesses).toEqual({
            lincolndeli123: {
               name: 'Lincoln Deli',
               city: 'San Luis Obispo',
               type: 'B&M',
               tags: ['Black Owned'],
               keywords: ['Sandwiches', 'Drinks'],
               rating: 100,
               shortDesc: 'We sell sandwiches',
               numReviews: 20,
               claimed: false,
               businessId: 'lincolndeli123',
               hours: {
                  mon: '11:00am - 11:00pm',
               },
               links: {
                  Menu: 'www.lincolndeli.com/menu',
               },
               address: '123 Sesame St.',
               aboutOwner: {
                  owner: 'ownerSub123',
                  ownerName: 'Billiam Jones',
                  ownerPhone: '123-123-1111',
                  ownerDesc: 'Big Chiller',
                  photo: 'tests3',
               },
               reviews: [],
            },
            taqueria123: {
               name: 'Taqueria',
               city: 'San Luis Obispo',
               type: 'B&M',
               tags: ['Black Owned'],
               keywords: ['Sandwiches', 'Drinks'],
               rating: 100,
               shortDesc: 'We sell sandwiches',
               numReviews: 20,
               claimed: false,
               businessId: 'taqueria123',
               hours: {
                  mon: '11:00am - 11:00pm',
               },
               links: {
                  Menu: 'www.taqueria.com/menu',
               },
               address: '123 Sesame St.',
               aboutOwner: {
                  owner: 'ownerSub123',
                  ownerName: 'Billiam Jones',
                  ownerPhone: '123-123-1111',
                  ownerDesc: 'Big Chiller',
                  photo: 'tests3',
               },
               reviews: [],
            },
         });
      });

      it('Should send a properly formatted GET request', async () => {
         // Arrange
         axios.get.mockResolvedValue({
            data: {
               results: {
                  name: 'Lincoln Deli',
                  city: 'San Luis Obispo',
                  type: 'B&M',
                  tags: ['Black Owned'],
                  keywords: ['Sandwiches', 'Drinks'],
                  rating: 100,
                  shortDesc: 'We sell sandwiches',
                  numReviews: 20,
                  claimed: false,
                  businessId: 'lincolndeli123',
                  hours: {
                     mon: '11:00am - 11:00pm',
                  },
                  links: {
                     Menu: 'www.lincolndeli.com/menu',
                  },
                  address: '123 Sesame St.',
                  aboutOwner: {
                     owner: 'ownerSub123',
                     ownerName: 'Billiam Jones',
                     ownerPhone: '123-123-1111',
                     ownerDesc: 'Big Chiller',
                     photo: 'tests3',
                  },
                  reviews: [],
               },
            },
         });

         // Act
         businessReducer(
            initialState,
            await getBusinessAsync('lincolndeli123')(dispatch)
         );

         // Assert
         expect(axios.get).toHaveBeenCalledWith(
            `${environment.prodURL}/business/lincolndeli123`
         );
      });
   });
});
