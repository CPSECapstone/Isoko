import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import AWS from 'aws-sdk';

const StyledSearchBar = styled(Autocomplete)`
   border-left: 2px solid lightgray;
   background: #ffffff;
   border-radius: 0px 0px 0px 0px;

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
   border-radius: 0px 0px 0px 0px;
`;

interface LocationProps extends React.HTMLProps<HTMLDivElement> {
   input: string;
   changeLocationState: React.Dispatch<React.SetStateAction<string>>;
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
   );
};

export default LocationSearchBar;
