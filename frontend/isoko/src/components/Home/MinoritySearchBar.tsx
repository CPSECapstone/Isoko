import React from 'react';
import { styled } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import minorityGroups from '../../constants/minorityGroups';

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

const NavSearchBar = styled(Autocomplete)`
   border-right: 2px solid lightgray;
   font-size: 0.75rem;
   max-height: 32px;

   .MuiOutlinedInput-root {
      max-height: 32px;
      padding: 0px;
   }

   .MuiOutlinedInput-input {
      font-size: 0.75em;
   }

   .MuiAutocomplete-tag {
      margin: 0px;
   }

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

const NavTextField = styled(TextField)`
   background: white;
`;

interface MinorityProps extends React.HTMLProps<HTMLDivElement> {
   minorityState: string[];
   setMinorityState: React.Dispatch<React.SetStateAction<string[]>>;
   isHome: boolean;
}

const MinoritySearchBar: React.FC<MinorityProps> = (props) => {
   return (
      <div>
         {props.isHome ? (
            <StyledSearchBar
               multiple
               id="tags-outlined"
               options={minorityGroups}
               getOptionLabel={(option) =>
                  typeof option === 'string' ? option : ''
               }
               value={props.minorityState}
               onChange={(e, value) => {
                  props.setMinorityState(Array.isArray(value) ? value : []);
               }}
               filterSelectedOptions
               renderInput={(params) => (
                  <StyledTextField {...params} placeholder="Owned" />
               )}
            />
         ) : (
            <NavSearchBar
               multiple
               id="tags-outlined"
               options={minorityGroups}
               getOptionLabel={(option) =>
                  typeof option === 'string' ? option : ''
               }
               value={props.minorityState}
               onChange={(e, value) => {
                  props.setMinorityState(Array.isArray(value) ? value : []);
               }}
               filterSelectedOptions
               renderInput={(params) => (
                  <NavTextField {...params} placeholder="Owned" />
               )}
            />
         )}
      </div>
   );
};

export default MinoritySearchBar;
