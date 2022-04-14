import profileReducer, {
   fetchProfileAsync,
   updateProfilePicAsync,
} from './ProfileSlice';
import axios from 'axios';
import { environment } from '../../environment/environment';

jest.mock('axios');

describe('ProfileSlice tests', () => {
   const dispatch = jest.fn();

   afterEach(() => {
      axios.get.mockReset();
      axios.put.mockReset();
      dispatch.mockReset();
   });

   const initialState = {
      userSub: '',
      name: '',
      email: '',
      profilePicture: '',
      businessOwner: false,
      status: 'idle',
   };

   const userSub = 'test-user-sub';

   it('Should have the proper initial state', () => {
      // Arrange

      // Act
      const store = profileReducer(undefined, { type: 'unknown' });

      // Assert
      expect(store).toEqual(initialState);
   });

   describe('fetchProfileAsync tests', () => {
      it('Should send a properly formatted GET request to our API', async () => {
         // Arrange
         axios.get.mockResolvedValue({
            data: {},
         });

         // Act
         profileReducer(
            initialState,
            await fetchProfileAsync(userSub)(dispatch)
         );

         // Assert
         expect(axios.get).toHaveBeenCalledWith(
            `${environment.prodURL}/user/${userSub}`
         );
      });

      it('Should set store based on GET response body', async () => {
         // Arrange
         const userDetails = {
            userSub,
            name: 'Justin Poist',
            email: 'test@test.com',
            profilePicture: 'link',
            businessOwner: true,
            businessId: 'test-business-id',
            status: 'idle',
         };

         axios.get.mockResolvedValue({
            data: userDetails,
         });

         // Act
         const store = profileReducer(
            initialState,
            await fetchProfileAsync(userSub)(dispatch)
         );

         // Assert
         expect(store).toEqual({ ...userDetails, status: 'idle' });
      });
   });

   describe('updateProfilePicAsync tests', () => {
      it('Should send a properly formatted PUT request to our API', async () => {
         // Arrange
         axios.put.mockResolvedValue({
            data: {},
         });
         const profilePicture = 'new-pic';

         // Act
         profileReducer(
            initialState,
            await updateProfilePicAsync({ userSub, profilePicture })(dispatch)
         );

         // Assert
         expect(axios.put).toHaveBeenCalledWith(
            `${environment.prodURL}/user/${userSub}`,
            { profilePicture }
         );
      });

      it('Should set store based on PUT response body', async () => {
         // Arrange
         const initialUser = {
            userSub,
            name: 'Justin Poist',
            email: 'test@test.com',
            profilePicture: 'old link',
            businessOwner: false,
         };

         const newProfilePic = 'new link';

         axios.put.mockResolvedValue({
            data: {
               ...initialUser,
               profilePicture: newProfilePic,
            },
         });

         // Act
         const store = profileReducer(
            initialUser,
            await updateProfilePicAsync({
               userSub,
               profilePicture: newProfilePic,
            })(dispatch)
         );

         // Assert
         expect(store).toEqual({
            ...initialUser,
            profilePicture: newProfilePic,
            status: 'idle',
         });
      });
   });
});
