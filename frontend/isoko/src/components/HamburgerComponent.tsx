import React from 'react';
import styled from 'styled-components';
import { Navbar, Nav, Container, Offcanvas } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Position = styled.div`
   position: absolute;
   top: 3px;
   right: 5px;
   padding: 0;
   margin: 2px;
`;

const StyledNavbar = styled(Navbar)`
   padding: 0px;

   .navbar-toggler {
      padding: 0px;
   }

   .navbar-toggler-icon {
      width: 32px;
      height: 32px;
   }
`;

const StyledContainer = styled(Container)`
   padding: 0px;
`;

const StyledToggle = styled(Navbar.Toggle)`
   border: 0px;
   outline: 0px;
   box-shadow: none;

   &:hover,
   &:focus,
   &:active {
      outline: 1px solid darkgrey;
      box-shadow: none;
   }
`;

const StyledOffcanvas = styled(Navbar.Offcanvas)`
   width: 250px;
   background-color: #fbfbfb;
`;

const StyledTitle = styled(Offcanvas.Title)`
   font-family: Comfortaa, sans-serif;
   font-size: 1.5rem;
`;

const StyledLink = styled(Nav.Link)`
   color: #0645ad;
   font-family: Open Sans;
   font-size: 1.25em;
   line-height: 1.5;
   border-bottom: 1px solid lightgrey;

   &:hover {
      color: #00368c;
      cursor: pointer;
   }
`;

const HamburgerComponent: React.FC = () => {
   const navigate = useNavigate();

   return (
      <Position>
         <StyledNavbar expand={false}>
            <StyledContainer fluid>
               <StyledToggle aria-controls="offcanvasNavbar" />
               <StyledOffcanvas
                  id="offcanvasNavbar"
                  aria-labelledby="offcanvasNavbarLabel"
                  placement="end"
               >
                  <Offcanvas.Header closeButton>
                     <StyledTitle id="offcanvasNavbarLabel">ISOKO</StyledTitle>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                     <Nav className="justify-content-end flex-grow-1 pe-3">
                        <StyledLink onClick={() => navigate('/listBusiness')}>
                           List A Business
                        </StyledLink>
                        <StyledLink onClick={() => navigate('/businessDash')}>
                           Business Dashboard
                        </StyledLink>
                        <StyledLink onClick={() => navigate('/profile')}>
                           Profile
                        </StyledLink>
                        <StyledLink onClick={() => navigate('/login')}>
                           Sign Up
                        </StyledLink>
                     </Nav>
                  </Offcanvas.Body>
               </StyledOffcanvas>
            </StyledContainer>
         </StyledNavbar>
      </Position>
   );
};

export default HamburgerComponent;
