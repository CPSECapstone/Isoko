import axios from 'axios';
import { environment } from '../../environment/environment';
import { BusinessPreview } from '../../types/GlobalTypes';

export interface SearchParams {
   location: string;
   tags?: Array<string>;
   keyword?: string;
   category?: string;
}

export const fetchSearchResults = async (
   params: SearchParams
): Promise<Array<BusinessPreview>> => {
   const response = await axios.post(`${environment.prodURL}/searchBusiness`, {
      data: {
         ...params,
      },
   });
   return response.data as Array<BusinessPreview>;
};
