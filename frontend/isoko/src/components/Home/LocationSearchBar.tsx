import * as React from 'react';
import { styled } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const options = ['Candy', 'Candle', 'Burger', 'Burger Hut'];

const StyledSearchBar = styled(Autocomplete)`
   .MuiOutlinedInput-notchedOutline {
      border: 2.5px solid #000000;
      border-radius: 0px 90px 90px 0px;
   }

   .Mui-focused .MuiOutlinedInput-notchedOutline {
      border: 2.5px solid #000000;
      border-radius: 0px 90px 90px 0px;
   }

   hover .MuiOutlinedInput-notchedOutline {
      border: 2.5px solid #000000;
   }
`;

const StyledTextField = styled(TextField)`
   background: #ffffff;
   border-radius: 0px 90px 90px 0px;
`;

const LocationSearchBar = () => (
   <StyledSearchBar
      disablePortal
      id="home-search-bar"
      options={options}
      sx={{}}
      renderInput={(params) => (
         <StyledTextField {...params} placeholder="San Diego, CA" />
      )}
   />
);

export default LocationSearchBar;
