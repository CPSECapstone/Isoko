import React, { useState } from 'react';
import styled from 'styled-components';
import KeywordSearchBar from './KeywordSearchBar';
import MinoritySearchBar from './MinoritySearchBar';
import LocationSearchBar from './LocationSearchBar';
import StyledButton from '../../styles/StyledButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Row, Col } from 'react-bootstrap';
import { useAppDispatch } from '../../app/hooks';
import { getSearchResultsAsync } from '../../features/business/SearchResultsSlice';
import { useNavigate } from 'react-router-dom';
import categoryList from '../../constants/categoryList';

const Container = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
`;

const SearchLabel = styled.h3`
   font-size: 1.1rem;
   font-family: Comfortaa;
   color: #ffffff;
   text-align: left;
`;

const SearchButton = styled(StyledButton)`
   border-radius: 0px 90px 90px 0px;
   height: 100%;
   width: 100%;
`;

const StyledRow = styled(Row)`
   width: 75%;
   max-width: 1025px;
`;

const StyledCol = styled(Col)`
   padding: 0px;
`;

const SearchIcon = styled(FontAwesomeIcon)`
   font-size: 2em;
   margin-right: 6px;
`;

const SearchBar: React.FC = () => {
   const [minorityState, setMinorityState] = useState<Array<string>>([]);
   const [locationState, setLocationState] = useState('');
   const [keywordState, setKeywordState] = useState('');

   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   const getSearchParams = (locationState, minorityState, keywordState) => {
      const locationSplit = locationState.split(',');

      // Error checking for location without all the information
      if (locationSplit.length < 3) {
         // TODO: Maybe display a modal saying the location is bad?
         console.log('Bad location');
      }

      return {
         location: `${locationSplit[1]}/${locationSplit[0]}`,
         tags: minorityState,
         ...(categoryList.includes(keywordState)
            ? { category: keywordState }
            : { keyword: keywordState }),
      };
   };

   return (
      <main>
         <Container>
            <StyledRow>
               <StyledCol sm={3}>
                  <SearchLabel>I&apos;m looking for</SearchLabel>
               </StyledCol>
               <StyledCol sm={4}>
                  <SearchLabel>Owned By</SearchLabel>
               </StyledCol>
               <StyledCol sm={4}>
                  <SearchLabel>Near</SearchLabel>
               </StyledCol>
               <StyledCol sm={1} />
            </StyledRow>
            <StyledRow>
               <StyledCol sm={3}>
                  <KeywordSearchBar
                     input={keywordState}
                     changeKeywordState={setKeywordState}
                  ></KeywordSearchBar>
               </StyledCol>
               <StyledCol sm={4}>
                  <MinoritySearchBar
                     minorityState={minorityState}
                     setMinorityState={setMinorityState}
                  ></MinoritySearchBar>
               </StyledCol>
               <StyledCol sm={4}>
                  <LocationSearchBar
                     input={locationState}
                     changeLocationState={setLocationState}
                  ></LocationSearchBar>
               </StyledCol>
               <StyledCol sm={1}>
                  <SearchButton
                     primary
                     onClick={() => {
                        dispatch(
                           getSearchResultsAsync(
                              getSearchParams(
                                 locationState,
                                 minorityState,
                                 keywordState
                              )
                           )
                        );
                        navigate('/search');
                     }}
                  >
                     <SearchIcon icon={faSearch} />
                  </SearchButton>
               </StyledCol>
            </StyledRow>
         </Container>
      </main>
   );
};

export default SearchBar;
