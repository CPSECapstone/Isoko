import * as React from 'react';
import { styled } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { produceWithPatches } from 'immer';

const options = ['Candy', 'Candle', 'Burger', 'Burger Hut'];

const StyledSearchBar = styled(Autocomplete)`
   .MuiOutlinedInput-notchedOutline {
      border: 2.5px solid #000000;
      border-radius: 90px 0px 0px 90px;
   }

   .Mui-focused .MuiOutlinedInput-notchedOutline {
      border: 2.5px solid #000000;
      border-radius: 90px 0px 0px 90px;
   }

   hover .MuiOutlinedInput-notchedOutline {
      border: 2.5px solid #000000;
   }
`;

const StyledTextField = styled(TextField)`
   background: #ffffff;
   border-radius: 90px 0px 0px 90px;
`;

// interface KeywordProps extends React.HTMLProps<HTMLDivElement> {
//    input: string;
//    changeKeywordState: React.Dispatch<React.SetStateAction<string>>;
// }

// const KeywordSearchBar: React.FC<KeywordProps> = (props) => {

//    return (<StyledSearchBar
//       disablePortal
//       id="home-search-bar"
//       options={options}
//       sx={{}}
//       value={props.input}
//       onChange={(event) => props.changeKeywordState(event.currentTarget.value)}
//       renderInput={(params) => (
//          <StyledTextField {...params} placeholder="I'm looking for" />
//       )}
//    />)
// );

const KeywordSearchBar = () => (
   <StyledSearchBar
      disablePortal
      id="home-search-bar"
      options={options}
      sx={{}}
      renderInput={(params) => (
         <StyledTextField {...params} placeholder="I'm looking for" />
      )}
   />
);

export default KeywordSearchBar;
