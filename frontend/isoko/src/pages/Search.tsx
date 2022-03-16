import React from 'react';
import NavbarComponent from '../components/NavbarComponent';
import SearchResults from './SearchResults';

const Search: React.FC = () => (
   <main>
      <NavbarComponent />
      <SearchResults
         category="Restaurants"
         minorityTags={['LGBTQ+ Owned', 'Women Owned']}
         keywordTags={['Burgers', 'Milkshakes']}
         location="San Luis Obispo/CA"
      />
   </main>
);

export default Search;
