import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import AWS from 'aws-sdk';

const StyledSearchBar = styled(Autocomplete)`
   .MuiOutlinedInput-notchedOutline {
      border: 2.5px solid #000000;
      border-radius: 0px 90px 90px 0px;
   }

   .Mui-focused .MuiOutlinedInput-notchedOutline {
      border: 2.5px solid #000000;
      border-radius: 0px 90px 90px 0px;
   }

   hover .MuiOutlinedInput-notchedOutline {
      border: 2.5px solid #000000;
   }
`;

const StyledTextField = styled(TextField)`
   background: #ffffff;
   border-radius: 0px 90px 90px 0px;
`;

interface LocationProps extends React.HTMLProps<HTMLDivElement> {
   input: string;
   changeLocationState: React.Dispatch<React.SetStateAction<string>>;
}

const LocationSearchBar: React.FC<LocationProps> = (props) => {
   const credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'us-west-2:7e6f6851-3cee-4edf-af12-50c3e00f365b',
   });

   const client = new AWS.Location({
      credentials,
      region: 'us-west-2', // region containing the identity pool
   });

   const [optionsState, setOptionsState] = useState<Array<string>>([]);
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
      console.log(optionsState);
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
