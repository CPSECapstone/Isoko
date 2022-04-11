import axios from 'axios';
import { environment } from '../../environment/environment';
import { BusinessPreview } from '../../types/GlobalTypes';
import categoryList from '../../constants/categoryList';

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
      ...params,
   });

   const searchResults = response.data.results;
   return searchResults as Array<BusinessPreview>;
};

export const getSearchParams = (
   location: string,
   minorityTags: Array<string>,
   searchTerm: string
): SearchParams | null => {
   const locationSplit = location.split(', ');

   // Error checking for location without all the information
   if (locationSplit.length < 3) {
      alert('Invalid search location, please try another location');
      return null;
   }

   return {
      location: `${locationSplit[1]}#${locationSplit[0]}`,
      tags: minorityTags.includes('Any Minority Owned') ? [] : minorityTags,
      ...(categoryList.includes(searchTerm)
         ? { category: searchTerm }
         : { keyword: searchTerm }),
   };
};
