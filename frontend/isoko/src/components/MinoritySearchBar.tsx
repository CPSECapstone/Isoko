import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const minorityGroups = [
   { minority: 'Black' },
   { minority: 'Mexican' },
   { minority: 'LGBTQ+' },
   { minority: 'Women' },
   { minority: 'Any Minority' },
   { minority: 'Asian' },
   { minority: 'Latinx' },
   { minority: 'Indigenous' },
];

const MinoritySearchBar = () => (
   <Autocomplete
      multiple
      id="tags-outlined"
      options={minorityGroups}
      getOptionLabel={(option) => option.minority}
      filterSelectedOptions
      renderInput={(params) => (
         <TextField
            {...params}
            label="filterSelectedOptions"
            placeholder="Favorites"
         />
      )}
   />
);

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top

export default MinoritySearchBar;
