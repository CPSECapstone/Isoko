import * as React from 'react';
import { styled } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import keywordList from '../../constants/keywordList';
import categoryList from '../../constants/categoryList';

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

const NavSearchBar = styled(Autocomplete)`
   font-size: 0.5rem;
   max-height: 32px;
   border-right: 2px solid lightgray;

   .MuiOutlinedInput-root {
      max-height: 32px;
      padding: 0px;
   }

   .MuiOutlinedInput-input {
      font-size: 0.9em;
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
   border-radius: 10px 0px 0px 10px;
   font-size: 0.5rem;
`;

interface KeywordProps extends React.HTMLProps<HTMLDivElement> {
   input: string;
   changeKeywordState: React.Dispatch<React.SetStateAction<string>>;
   isHome: boolean;
}

const KeywordSearchBar: React.FC<KeywordProps> = (props) => {
   return (
      <div>
         {props.isHome ? (
            <StyledSearchBar
               disablePortal
               id="home-search-bar"
               options={[...categoryList, ...keywordList]}
               sx={{}}
               value={props.input}
               onInputChange={(e, value) =>
                  props.changeKeywordState(value as string)
               }
               renderInput={(params) => (
                  <StyledTextField {...params} placeholder="I'm looking for" />
               )}
            />
         ) : (
            <NavSearchBar
               disablePortal
               id="home-search-bar"
               options={[...categoryList, ...keywordList]}
               sx={{}}
               value={props.input}
               onInputChange={(e, value) =>
                  props.changeKeywordState(value as string)
               }
               renderInput={(params) => (
                  <NavTextField {...params} placeholder="I'm looking for" />
               )}
            />
         )}
      </div>
   );
};

export default KeywordSearchBar;
