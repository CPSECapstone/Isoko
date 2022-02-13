import React, { useState } from 'react';
import styled from 'styled-components';
import KeywordSearchBar from './KeywordSearchBar';
import MinoritySearchBar from './MinoritySearchBar';
import LocationSearchBar from './LocationSearchBar';

const Container = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: center;
`;

const SearchLabel = styled.h3`
   font-size: 1.1rem;
   font-family: Comfortaa;
   color: #ffffff;
   text-align: left;
`;

const LabelBox1 = styled.div`
   width: 22%;
   display: flex;
   flex-direction: column;
`;

const LabelBox2 = styled.div`
   width: 34%;
   display: flex;
   flex-direction: column;
`;

const LabelBox3 = styled.div`
   width: 22%;
   display: flex;
   flex-direction: column;
`;

const SearchBar = () => {
   const [minorityState, setMinorityState] = useState<Array<string>>([]);
   const [locationState, setLocationState] = useState('');
   const [keywordState, setKeywordState] = useState('');
   return (
      <main>
         <Container>
            <LabelBox1>
               <SearchLabel>I&apos;m looking for</SearchLabel>
               <KeywordSearchBar
                  input={keywordState}
                  changeKeywordState={setKeywordState}
               ></KeywordSearchBar>
            </LabelBox1>
            <LabelBox2>
               <SearchLabel>Owned By</SearchLabel>
               <MinoritySearchBar
                  minorityState={minorityState}
                  setMinorityState={setMinorityState}
               ></MinoritySearchBar>
            </LabelBox2>
            <LabelBox3>
               <SearchLabel>Near</SearchLabel>
               <LocationSearchBar
                  input={locationState}
                  changeLocationState={setLocationState}
               ></LocationSearchBar>
            </LabelBox3>
         </Container>
      </main>
   );
};

export default SearchBar;
