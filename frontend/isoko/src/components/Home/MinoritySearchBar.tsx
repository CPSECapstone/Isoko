import React from 'react';
import { styled } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const StyledSearchBar = styled(Autocomplete)`
   .MuiOutlinedInput-notchedOutline {
      border: none;
   }

   .Mui-focused .MuiOutlinedInput-notchedOutline {
      border: none;
   }

   hover .MuiOutlinedInput-notchedOutline {
      border: none;
   }
`;

const StyledTextField = styled(TextField)`
   background: white;
`;

const minorityGroups = [
   'Black',
   'Mexican',
   'LGBTQ+',
   'Women',
   'Any Minority',
   'Asian',
   'Latinx',
   'Indigenous',
];

interface MinorityProps extends React.HTMLProps<HTMLDivElement> {
   minorityState: string[];
   setMinorityState: React.Dispatch<React.SetStateAction<string[]>>;
}

const MinoritySearchBar: React.FC<MinorityProps> = (props) => {
   return (
      <StyledSearchBar
         multiple
         id="tags-outlined"
         options={minorityGroups}
         getOptionLabel={(option) => (typeof option === 'string' ? option : '')}
         value={props.minorityState}
         onChange={(e, value) => {
            props.setMinorityState(Array.isArray(value) ? value : []);
         }}
         filterSelectedOptions
         renderInput={(params) => (
            <StyledTextField {...params} placeholder="Owned" />
         )}
      />
   );
};

export default MinoritySearchBar;
