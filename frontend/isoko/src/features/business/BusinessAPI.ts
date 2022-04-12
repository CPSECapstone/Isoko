import axios from 'axios';
import { environment } from '../../environment/environment';
import { Business } from '../../types/GlobalTypes';

export const fetchBusiness = async (businessId: string): Promise<Business> => {
   const response = await axios.get(
      `${environment.prodURL}/business/${businessId}`
   );

   const business = response.data.results;
   return business as Business;
};
