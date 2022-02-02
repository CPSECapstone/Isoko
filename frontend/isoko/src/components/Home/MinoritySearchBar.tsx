import * as React from 'react';
import { styled } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const StyledSearchBar = styled(Autocomplete)`
   .MuiOutlinedInput-notchedOutline {
      border: 2.5px solid #000000;
   }

   .Mui-focused .MuiOutlinedInput-notchedOutline {
      border: 2.5px solid #000000;
   }

   hover .MuiOutlinedInput-notchedOutline {
      border: 2.5px solid #000000;
   }
`;

const StyledTextField = styled(TextField)`
   background: #ffffff;
`;

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

const MinoritySearchBar = () => {
   return (
      <StyledSearchBar
         multiple
         id="tags-outlined"
         options={minorityGroups}
         getOptionLabel={(option: any) => option.minority}
         filterSelectedOptions
         renderInput={(params) => (
            <StyledTextField {...params} placeholder="Owned" />
         )}
      />
   );
};

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top

export default MinoritySearchBar;
