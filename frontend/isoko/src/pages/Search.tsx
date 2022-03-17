import React from 'react';
import NavbarComponent from '../components/NavbarComponent';
import SearchResults from './SearchResults';

const Search: React.FC = () => (
   <main>
      <NavbarComponent />
      <SearchResults />
   </main>
);

export default Search;
