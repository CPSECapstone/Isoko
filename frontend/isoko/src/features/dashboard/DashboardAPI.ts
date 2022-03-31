import axios from 'axios';
import { environment } from '../../environment/environment';
import { Business } from '../../types/GlobalTypes';

export const fetchBusinessDetails = async (
   businessId: string
): Promise<Business> => {
   const response = await axios.get(
      `${environment.prodURL}/business/${businessId}`
   );

   const businessDetails = response.data;
   return businessDetails as Business;
};

export const updateBusinessDetails = async (
   businessId: string,
   fieldUpdates: { [key: string]: any }
): Promise<Business> => {
   const response = await axios.put(
      `${environment.prodURL}/business/${businessId}`,
      fieldUpdates
   );

   const updatedBusiness = response.data;
   return updatedBusiness as Business;
};
