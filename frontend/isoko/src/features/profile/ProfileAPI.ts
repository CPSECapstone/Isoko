import axios from 'axios';
import { environment } from '../../environment/environment';
import { User } from '../../types/GlobalTypes';

export const fetchProfile = async (usersub: string): Promise<User> => {
   const response = await axios.get(`${environment.prodURL}/user/${usersub}`);

   return response.data as User;
};

export const updateProfilePic = async (
   userSub: string,
   profilePicture: string
): Promise<User> => {
   const response = await axios.put(`${environment.prodURL}/user/${userSub}`, {
      profilePicture,
   });

   return response.data as User;
};

export const updateUserToBusinessOwner = async (
   userSub: string,
   businessId: string
): Promise<User> => {
   const response = await axios.put(`${environment.prodURL}/user/${userSub}`, {
      businessId,
      businessOwner: true,
   });

   return response.data as User;
};
