import React from 'react';
import styled from 'styled-components';
import HamburgerComponent from './HamburgerComponent';
import { useNavigate } from 'react-router-dom';
import SearchBar from './Home/SearchBar';

const NavbarContainer = styled.div`
   display: flex;
   flex-direction: row;
   width: 100%;
`;

const Title = styled.h1`
   font-size: 2rem;
   padding-top: 5px;
   margin: auto 10px;
   margin-right: 20px;
   cursor: pointer;
`;

const StyledSearchBar = styled.div`
   width: 100%;
   margin-right: 50px;
`;

const NavbarComponent: React.FC = () => {
   const navigate = useNavigate();

   return (
      <NavbarContainer>
         <Title onClick={() => navigate('/')}>ISOKO</Title>
         <StyledSearchBar>
            <SearchBar />
         </StyledSearchBar>
         <HamburgerComponent />
      </NavbarContainer>
   );
};

export default NavbarComponent;
