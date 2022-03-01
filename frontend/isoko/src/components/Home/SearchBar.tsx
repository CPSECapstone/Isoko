import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import device from '../../styles/devices';
import KeywordSearchBar from './KeywordSearchBar';
import MinoritySearchBar from './MinoritySearchBar';
import LocationSearchBar from './LocationSearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import StyledButton from '../../styles/StyledButton';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: center;
`;

const SearchLabel = styled.h3`
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

const NavContainer = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: center;
   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
   border-radius: 10px;
   background-color: transparent;
`;

const NavBox = styled.div`
   border: 1px solid red;
   min-width: 225px;
   @media ${device.laptop} {
      min-width: 150px;
   }
`;

const WiderNavBox = styled.div`
   border: 1px solid green;
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
   width: 100%;
   border: 1px solid blue;
   display: inline-block;
`;

const SearchBar: React.FC = () => {
   const [minorityState, setMinorityState] = useState<Array<string>>([]);
   const [locationState, setLocationState] = useState('');
   const [keywordState, setKeywordState] = useState('');
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

   const navigate = useNavigate();

   return (
      <main>
         {isHome ? (
            <Container>
               <LabelBox1>
                  <SearchLabel>I&apos;m looking for</SearchLabel>
                  <KeywordSearchBar
                     input={keywordState}
                     changeKeywordState={setKeywordState}
                     isHome={isHome}
                  ></KeywordSearchBar>
               </LabelBox1>
               <LabelBox2>
                  <SearchLabel>Owned By</SearchLabel>
                  <MinoritySearchBar
                     minorityState={minorityState}
                     setMinorityState={setMinorityState}
                     isHome={isHome}
                  ></MinoritySearchBar>
               </LabelBox2>
               <LabelBox3>
                  <SearchLabel>Near</SearchLabel>
                  <LocationSearchBar
                     input={locationState}
                     changeLocationState={setLocationState}
                     isHome={isHome}
                  ></LocationSearchBar>
               </LabelBox3>
            </Container>
         ) : (
            <OuterContainer>
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
                  <NavStyledButton primary onClick={() => navigate('/search')}>
                     <NavFontAwesomeIcon icon={faSearch} color="white" />
                  </NavStyledButton>
               </NavContainer>
            </OuterContainer>
         )}
      </main>
   );
};

export default SearchBar;
