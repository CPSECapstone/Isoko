import axios from 'axios';
import { environment } from '../../environment/environment';
import {
   Business,
   Hours,
   PageViewAnalytics,
   Review,
} from '../../types/GlobalTypes';

export const fetchBusiness = async (businessId: string): Promise<Business> => {
   const response = await axios.get(
      `${environment.prodURL}/business/${businessId}`
   );

   const business = response.data;
   return business as Business;
};

export const fetchPageViews = async (
   businessId: string
): Promise<PageViewAnalytics> => {
   const response = await axios.get(
      `${environment.prodURL}/analytics/business/${businessId}`
   );

   return response.data;
};

export const updateBusinessDetails = async (
   businessId: string,
   fieldUpdates: {
      name?: string;
      city?: string;
      state?: string;
      type?: 'B&M' | 'Online';
      category?: string;
      tags?: Array<string>;
      keywords?: Array<string>;
      shortDesc?: string;
      hours?: Hours;
      photos?: Array<string>;
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

export const postReview = async (
   businessId: string,
   review: Review,
   authToken: string,
   category: string
) => {
   const config = {
      headers: {
         Authorization: authToken,
      },
   };

   await axios.post(
      `${environment.prodURL}/business/${businessId}/review`,
      { ...review, category },
      config
   );

   return {
      review,
      businessId,
   };
};
