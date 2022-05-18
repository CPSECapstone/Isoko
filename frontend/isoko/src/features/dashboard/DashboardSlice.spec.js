import dashboardReducer, {
   initializeBusinessDashboardAsync,
   updateBusinessDetailsAsync,
} from './DashboardSlice';
import axios from 'axios';
import { environment } from '../../environment/environment';

jest.mock('axios');

describe('DashboardSlice tests', () => {
   const dispatch = jest.fn();

   afterEach(() => {
      axios.get.mockReset();
      axios.put.mockReset();
      dispatch.mockReset();
   });

   const initialState = {
      business: null,
      analytics: {
         pageViews: [],
      },
      status: 'idle',
   };

   it('Should have the proper initial state', () => {
      // Arrange

      // Act
      const store = dashboardReducer(undefined, { type: 'unknown' });

      // Assert
      expect(store).toEqual(initialState);
   });

   describe('initializeBusinessDashboardAsync tests', () => {
      it('Should send a properly formatted GET request to our API', async () => {
         // Arrange
         axios.get.mockResolvedValue({
            data: {},
         });
         const businessId = '-582752';

         // Act
         dashboardReducer(
            initialState,
            await initializeBusinessDashboardAsync(businessId)(dispatch)
         );

         // Assert
         expect(axios.get).toHaveBeenCalledWith(
            `${environment.prodURL}/business/${businessId}`
         );
      });

      it('Should set store based on GET response body', async () => {
         // Arrange
         const businessDetails = {
            name: 'JP Test Business',
            city: 'Sunnyvale',
            type: 'B&M',
            tags: ['Asian-Owned'],
            keywords: ['Fried Rice'],
            rating: 2.4,
            shortDesc: 'JP has a test business',
            numReviews: 34,
            claimed: true,
            businessId: 'JP_TEST_ID',
            hours: {
               Mon: '9:00am - 10:00pm',
               Sun: '8:00pm - 10:00pm',
            },
            address: '987 Honfleur Ct.',
            reviews: [],
         };
         const mockPageViews = ['20220511', '20220511'];

         axios.get.mockResolvedValueOnce({
            data: businessDetails,
         });
         axios.get.mockResolvedValueOnce({
            data: mockPageViews,
         });

         const businessId = 'JP_TEST_ID';

         // Act
         const store = dashboardReducer(
            initialState,
            await initializeBusinessDashboardAsync(businessId)(dispatch)
         );

         // Assert
         expect(store.business).toEqual(businessDetails);
         expect(store.analytics.pageViews).toEqual(mockPageViews);
      });
   });

   describe('updateBusinessDetailsAsync tests', () => {
      it('Should send a properly formatted PUT request to our API', async () => {
         // Arrange
         axios.put.mockResolvedValue({
            data: {},
         });
         const businessId = '-582752';
         const updateFields = {
            name: 'New Business Name',
            hours: {
               Mon: '9:00am - 7:00pm',
               Sun: '6:00am - 12:00pm',
            },
            links: {
               new: 'link-somewhere',
            },
         };

         // Act
         dashboardReducer(
            initialState,
            await updateBusinessDetailsAsync({ businessId, ...updateFields })(
               dispatch
            )
         );

         // Assert
         expect(axios.put).toHaveBeenCalledWith(
            `${environment.prodURL}/business/${businessId}`,
            updateFields
         );
      });

      it('Should set store based on PUT response body', async () => {
         // Arrange
         const businessDetails = {
            name: 'JP Test Business',
            city: 'Sunnyvale',
            type: 'B&M',
            tags: ['Asian-Owned'],
            keywords: ['Fried Rice'],
            rating: 2.4,
            shortDesc: 'JP has a test business',
            numReviews: 34,
            claimed: true,
            businessId: 'JP_TEST_ID',
            hours: {
               Mon: '9:00am - 10:00pm',
               Sun: '8:00pm - 10:00pm',
            },
            address: '987 Honfleur Ct.',
            reviews: [],
         };

         const updateFields = {
            name: 'New Business Name',
            hours: {
               Mon: '9:00am - 7:00pm',
               Sun: '6:00am - 12:00pm',
            },
            links: {
               new: 'link-somewhere',
            },
         };

         axios.put.mockResolvedValue({
            data: {
               ...businessDetails,
               ...updateFields,
            },
         });
         const businessId = 'JP_TEST_ID';

         // Act
         const store = dashboardReducer(
            { business: businessDetails, analytics: null, status: 'idle' },
            await updateBusinessDetailsAsync({ businessId, ...updateFields })(
               dispatch
            )
         );

         // Assert
         expect(store.business).toEqual({
            ...businessDetails,
            ...updateFields,
         });
      });
   });
});
