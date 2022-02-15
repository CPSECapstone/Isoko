import * as React from 'react';
import { styled } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const options = ['Candy', 'Candle', 'Burger', 'Burger Hut'];

const StyledSearchBar = styled(Autocomplete)`
   border-right: 2px solid lightgray;
   background: #ffffff;
   border-radius: 90px 0px 0px 90px;

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
   border-radius: 90px 0px 0px 90px;
`;

interface KeywordProps extends React.HTMLProps<HTMLDivElement> {
   input: string;
   changeKeywordState: React.Dispatch<React.SetStateAction<string>>;
}

const KeywordSearchBar: React.FC<KeywordProps> = (props) => {
   return (
      <StyledSearchBar
         disablePortal
         id="home-search-bar"
         options={options}
         sx={{}}
         value={props.input}
         onInputChange={(e, value) => props.changeKeywordState(value as string)}
         renderInput={(params) => (
            <StyledTextField {...params} placeholder="I'm looking for" />
         )}
      />
   );
};

export default KeywordSearchBar;
