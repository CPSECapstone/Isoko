import axios from 'axios';
import { environment } from '../../environment/environment';
import { Business, Hours } from '../../types/GlobalTypes';

export const fetchBusiness = async (businessId: string): Promise<Business> => {
   const response = await axios.get(
      `${environment.prodURL}/business/${businessId}`
   );

   const business = response.data;
   return business as Business;
};

export const updateBusinessDetails = async (
   businessId: string,
   fieldUpdates: {
      name?: string;
      city?: string;
      type?: 'B&M' | 'Online';
      tags?: Array<string>;
      keywords?: Array<string>;
      shortDesc?: string;
      hours?: Hours;
      links?: {
         [key: string]: string;
      };
      address?: string;
      aboutOwner?: {
         owner: string;
         ownerName: string;
         ownerPhone: string;
         ownerDesc: string;
         photo: string;
      };
   }
): Promise<Business> => {
   const response = await axios.put(
      `${environment.prodURL}/business/${businessId}`,
      fieldUpdates
   );

   const updatedBusiness = response.data;
   return updatedBusiness as Business;
};
