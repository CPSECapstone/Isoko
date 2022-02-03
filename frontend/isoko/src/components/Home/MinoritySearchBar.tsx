import React, { useState, useEffect } from 'react';
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
   'Black',
   'Mexican',
   'LGBTQ+',
   'Women',
   'Any Minority',
   'Asian',
   'Latinx',
   'Indigenous',
];

// interface MinorityProps extends React.HTMLProps<HTMLDivElement> {
//    input: string[];
//    changeMinorityState: React.Dispatch<React.SetStateAction<Array<any>>>;
// }

// const MinoritySearchBar: React.FC<MinorityProps> = (props) => {

//    const changeSearchState = (value: any) => {
//       props.changeMinorityState(value);

//    }

const MinoritySearchBar = () => {
   const [minorityState, setMinorityState] = useState([] as any);
   return (
      <StyledSearchBar
         multiple
         id="tags-outlined"
         options={minorityGroups}
         getOptionLabel={(option: any) => option}
         value={minorityState}
         onChange={(e, value) => {
            setMinorityState(value);
         }}
         filterSelectedOptions
         renderInput={(params) => (
            <StyledTextField {...params} placeholder="Owned" />
         )}
      />
   );
};

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top

export default MinoritySearchBar;
