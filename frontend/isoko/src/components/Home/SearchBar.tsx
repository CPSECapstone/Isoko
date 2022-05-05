import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import device from '../../styles/devices';
import KeywordSearchBar from './KeywordSearchBar';
import MinoritySearchBar from './MinoritySearchBar';
import LocationSearchBar from './LocationSearchBar';
import { Row, Col } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
   getSearchResultsAsync,
   setSearchFeatures,
} from '../../features/business/SearchResultsSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import StyledButton from '../../styles/StyledButton';
import { useNavigate } from 'react-router-dom';
import { getSearchParams } from '../../features/business/SearchResultsAPI';

const Container = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
`;

const SearchLabel = styled.h3`
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

const NavContainer = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: center;
   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
   border-radius: 10px;
   background-color: transparent;
`;

const NavBox = styled.div`
   min-width: 250px;
   @media ${device.laptop} {
      min-width: 200px;
   }
   @media ${device.tablet} {
      min-width: 150px;
   }
`;

const WiderNavBox = styled.div`
   min-width: 250px;
   @media ${device.laptop} {
      min-width: 150px;
   }
   @media (max-width: 700px) {
      display: none;
   }
`;

const NavFontAwesomeIcon = styled(FontAwesomeIcon)`
   font-size: 16px;
`;

const NavStyledButton = styled(StyledButton)`
   padding: 0px 12px;
   margin-left: 5px;
`;
const OuterContainer = styled.div`
   margin-top: 5px;
   margin-right: 5px;
   display: inline-block;
`;
const MiddleDiv = styled.div`
   display: flex;
   flex-direction: row;
`;

const SearchBar: React.FC = () => {
   const searchResultsStore = useAppSelector((store) => store.searchResults);

   const [minorityState, setMinorityState] = useState<Array<string>>(
      searchResultsStore.minorityTags
         .filter((tag) => tag.selected)
         .map((tag) => tag.text)
   );
   const [locationState, setLocationState] = useState(
      searchResultsStore.location
   );
   const [keywordState, setKeywordState] = useState(
      searchResultsStore.searchTerm
   );
   const [isHome, setIsHome] = useState(true);

   useEffect(() => {
      const base_url = window.location.origin + '/';
      const current_url = window.location.href;
      if (base_url === current_url) {
         setIsHome(true);
      } else {
         setIsHome(false);
      }
   }, []);

   useEffect(() => {
      setMinorityState(
         searchResultsStore.minorityTags
            .filter((tag) => tag.selected)
            .map((tag) => tag.text)
      );
   }, [searchResultsStore.minorityTags]);

   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   const dispatchSearch = async () => {
      const searchParams = getSearchParams(
         locationState,
         minorityState,
         keywordState
      );
      if (searchParams) {
         dispatch(getSearchResultsAsync(searchParams));
         dispatch(
            setSearchFeatures({
               // Default to "Anything" if they don't specify a keyword
               searchTerm: keywordState || 'Anything',
               location: locationState,
               minorityTags: searchParams.tags,
            })
         );
         navigate('/search');
      }
   };

   const handleEnterPress = (event) => {
      // keyCode 13 is Enter
      if (event.keyCode === 13) {
         dispatchSearch();
      }
   };

   return (
      <main>
         {isHome ? (
            <Container onKeyDown={handleEnterPress}>
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
                        isHome={isHome}
                     ></KeywordSearchBar>
                  </StyledCol>
                  <StyledCol sm={4}>
                     <MinoritySearchBar
                        minorityState={minorityState}
                        setMinorityState={setMinorityState}
                        isHome={isHome}
                     ></MinoritySearchBar>
                  </StyledCol>
                  <StyledCol sm={4}>
                     <LocationSearchBar
                        input={locationState}
                        changeLocationState={setLocationState}
                        isHome={isHome}
                     ></LocationSearchBar>
                  </StyledCol>
                  <StyledCol sm={1}>
                     <SearchButton primary onClick={dispatchSearch}>
                        <SearchIcon icon={faSearch} />
                     </SearchButton>
                  </StyledCol>
               </StyledRow>
            </Container>
         ) : (
            <OuterContainer onKeyDown={handleEnterPress}>
               <MiddleDiv>
                  <NavContainer>
                     <NavBox>
                        <KeywordSearchBar
                           input={keywordState}
                           changeKeywordState={setKeywordState}
                           isHome={isHome}
                        ></KeywordSearchBar>
                     </NavBox>
                     <WiderNavBox>
                        <MinoritySearchBar
                           minorityState={minorityState}
                           setMinorityState={setMinorityState}
                           isHome={isHome}
                        ></MinoritySearchBar>
                     </WiderNavBox>
                     <NavBox>
                        <LocationSearchBar
                           input={locationState}
                           changeLocationState={setLocationState}
                           isHome={isHome}
                        ></LocationSearchBar>
                     </NavBox>
                  </NavContainer>
                  <NavStyledButton primary onClick={dispatchSearch}>
                     <NavFontAwesomeIcon icon={faSearch} color="white" />
                  </NavStyledButton>
               </MiddleDiv>
            </OuterContainer>
         )}
      </main>
   );
};

export default SearchBar;
