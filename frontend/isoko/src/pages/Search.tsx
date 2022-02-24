import React from 'react';
import SearchResults from './SearchResults';
import moment from 'moment';

const Search: React.FC = () => (
   <main>
      <h1>Search + Search Results</h1>
      <SearchResults
         category="Restaurants"
         minorityTags={['LGBTQ+ Owned', 'Women Owned']}
         keywordTags={['Burgers', 'Milkshakes']}
         location="San Luis Obispo/CA"
      />
   </main>
);

export default Search;
