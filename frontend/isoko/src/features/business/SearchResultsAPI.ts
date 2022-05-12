import axios from 'axios';
import { environment } from '../../environment/environment';
import { BusinessPreview, SearchResults } from '../../types/GlobalTypes';
import categoryList from '../../constants/categoryList';

export interface SearchParams {
   location: string;
   tags?: Array<string>;
   keyword?: string;
   category?: string;
}

export const fetchSearchResults = async (
   params: SearchParams
): Promise<SearchResults> => {
   const response = await axios.post(`${environment.prodURL}/searchBusiness`, {
      ...params,
   });

   const searchResults = {
      brickMortar: response.data.brickMortar,
      online: response.data.online,
   };
   return searchResults;
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
         : // send '' as keyword if searching by "Anything"
           { keyword: searchTerm === 'Anything' ? '' : searchTerm }),
   };
};
