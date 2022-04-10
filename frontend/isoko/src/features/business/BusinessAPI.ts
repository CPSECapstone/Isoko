import axios from 'axios';
import { environment } from '../../environment/environment';
import { Business } from '../../types/GlobalTypes';

export const fetchSearchResults = async (
   businessId: string
): Promise<Array<Business>> => {
   const response = await axios.get(
      `${environment.prodURL}/business/${businessId}`
   );

   const searchResults = response.data.results;
   return business as Business;
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
