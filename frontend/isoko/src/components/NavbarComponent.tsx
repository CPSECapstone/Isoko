import React from 'react';
import styled from 'styled-components';
import HamburgerComponent from './HamburgerComponent';
import { useNavigate } from 'react-router-dom';

// TODO: get rid of ISOKO heading on small screens to make more space.

// TODO: set a max-height here.
const NavbarContainer = styled.div`
   display: flex;
   width: 100%;
`;

const Title = styled.h1`
   font-size: 2rem;
   padding-top: 5px;
   margin: auto 10px;
   cursor: pointer;
`;

const SearchBarPlaceholder = styled.div`
   border: 1px solid blue;
   width: 400px;
   align-items: right:
`;

const HamburgerComponentRight = styled(HamburgerComponent)`
   position: absolute;
   left: 0;
   justify-content: end;
   align-items: end;
   z-index: 10;
`;

const NavbarComponent: React.FC = () => {
   const navigate = useNavigate();

   return (
      <NavbarContainer>
         <Title onClick={() => navigate('/')}>ISOKO</Title>
         <SearchBarPlaceholder />
         <HamburgerComponentRight />
      </NavbarContainer>
   );
};

export default NavbarComponent;
