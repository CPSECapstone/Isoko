import React from 'react';
import { styled } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const StyledSearchBar = styled(Autocomplete)`
   border: 2.5px solid #000000;
   background: #ffffff;
   // .MuiOutlinedInput-notchedOutline {
   //       // border: 2.5px solid #000000;
   //    }

   //    .Mui-focused .MuiOutlinedInput-notchedOutline {
   //       // border: 2.5px solid #000000;
   //    }

   //    hover .MuiOutlinedInput-notchedOutline {
   //       // border: 2.5px solid #000000;
   //    }

   //    .MuiAutocomplete-root fieldset:hover{
   //       border-color: #000000 !important;
   //    }
`;

const StyledTextField = styled(TextField)`
   background: white;
   & label.Mui-focused {
      color: white;
   }
   & .MuiOutlinedInput-root {
      & fieldset {
         border-color: white;
      }
      &:hover fieldset {
         border-color: white;
      }
      &.Mui-focused fieldset {
         border-color: white;
      }
   }
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
