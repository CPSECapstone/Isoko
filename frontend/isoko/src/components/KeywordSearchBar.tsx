import * as React from 'react';
import { styled } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const options = ['Candy', 'Candle', 'Burger', 'Burger Hut'];

const StyledSearchBar = styled(Autocomplete)`
   width: 30%;
   border-radius: 90px;
   border: none;
   height: 58px;
   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
   text-indent: 10px;
   background: #ffffff;
   border: 2px solid #000000;

   //   & .css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root {
   //       border-radius: 90px;
   //   }
`;

const KeywordSearchBar = () => (
   <StyledSearchBar
      disablePortal
      id="home-search-bar"
      options={options}
      sx={{}}
      renderInput={(params) => (
         <TextField {...params} label="I'm looking for" />
      )}
   />
);

export default KeywordSearchBar;
