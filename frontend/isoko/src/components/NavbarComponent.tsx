import React from 'react';
import styled from 'styled-components';
import HamburgerComponent from './HamburgerComponent';

// TODO: get rid of ISOKO heading on small screens to make more space.

// TODO: set a max-height here.
const NavbarContainer = styled.div`
   border: 1px solid red;
   display: flex;
   width: 100%;
`;

const Title = styled.h1`
   font-size: 2rem;
   margin: auto 0;
`;

const SearchBarPlaceholder = styled.div`
   border: 1px solid blue;
   width: 400px;
`;

const HamburgerComponentRight = styled(HamburgerComponent)`
   position: absolute;
   left: 0;
   justify-content: end;
   align-items: end;
`;

const NavbarComponent: React.FC = () => {
   return (
      <NavbarContainer>
         <Title>ISOKO</Title>
         <SearchBarPlaceholder />
         <HamburgerComponentRight />
      </NavbarContainer>
   );
};

export default NavbarComponent;
