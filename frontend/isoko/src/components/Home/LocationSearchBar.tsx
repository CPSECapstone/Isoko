import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import AWS from 'aws-sdk';

const StyledSearchBar = styled(Autocomplete)`
   border-left: 2px solid lightgray;
   background: #ffffff;
   border-radius: 0px 90px 90px 0px;

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
   border-radius: 0px 90px 90px 0px;
`;

const NavSearchBar = styled(Autocomplete)`
   font-size: 0.75rem;
   max-height: 32px;

   .MuiOutlinedInput-root .MuiAutocomplete-input {
      max-height: 32px;
      padding: 0px;
   }

   .MuiOutlinedInput-input {
      font-size: 0.75em;
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
   background: transparent;
`;

interface LocationProps extends React.HTMLProps<HTMLDivElement> {
   input: string;
   changeLocationState: React.Dispatch<React.SetStateAction<string>>;
   isHome: boolean;
}

const LocationSearchBar: React.FC<LocationProps> = (props) => {
   const [optionsState, setOptionsState] = useState<Array<string>>([]);

   const credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'us-west-2:7e6f6851-3cee-4edf-af12-50c3e00f365b',
   });

   const client = new AWS.Location({
      credentials,
      region: 'us-west-2', // region containing the identity pool
   });

   const updatingLocState = async (value: string) => {
      props.changeLocationState(value);

      const rsp = await client
         .searchPlaceIndexForSuggestions({
            IndexName: 'Isoko-Index',
            Text: value,
            MaxResults: 7,
            FilterCountries: ['USA'],
         })
         .promise();

      const options = rsp.Results.map((value) => value.Text);
      setOptionsState(options);
   };

   return (
      <div>
         {props.isHome ? (
            <StyledSearchBar
               disablePortal
               id="home-search-bar"
               options={optionsState}
               sx={{}}
               value={props.input}
               onInputChange={(e, value) => updatingLocState(value as string)}
               renderInput={(params) => (
                  <StyledTextField {...params} placeholder="San Diego, CA" />
               )}
            />
         ) : (
            <NavSearchBar
               disablePortal
               id="home-search-bar"
               options={optionsState}
               sx={{}}
               value={props.input}
               onInputChange={(e, value) => updatingLocState(value as string)}
               renderInput={(params) => (
                  <NavTextField {...params} placeholder="San Diego, CA" />
               )}
            />
         )}
      </div>
   );
};

export default LocationSearchBar;
