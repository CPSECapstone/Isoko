import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Navbar, Nav, Container, Offcanvas } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import RestrictedModal from '../pages/RestrictedModal';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { environment } from '../environment/environment';
import { useAppSelector } from '../app/hooks';

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
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [showRestrictedModal, setShowRestrictedModal] = useState(false);

   const profile = useAppSelector((store) => store.profile);

   console.log(profile);

   useEffect(() => {
      const userPool = new CognitoUserPool({
         UserPoolId: environment.cognitoUserPoolId,
         ClientId: environment.cognitoAppClientId,
      });
      // checks if user is logged in
      const cognitoUser = userPool.getCurrentUser();
      if (cognitoUser != null) {
         cognitoUser.getSession(function (err, result) {
            if (result) {
               setIsLoggedIn(true);
            }
         });
      }
   }, []);

   return (
      <Position>
         <RestrictedModal
            show={showRestrictedModal}
            handleClose={() => {
               setShowRestrictedModal(false);
            }}
         />
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
                        <StyledLink
                           onClick={() => {
                              if (isLoggedIn) {
                                 navigate('/listBusiness');
                              } else {
                                 setShowRestrictedModal(true);
                              }
                           }}
                        >
                           List A Business
                        </StyledLink>
                        {profile.businessOwner ? (
                           <StyledLink
                              onClick={() => {
                                 if (isLoggedIn) {
                                    navigate('/businessDash');
                                 } else {
                                    setShowRestrictedModal(true);
                                 }
                              }}
                           >
                              Business Dashboard
                           </StyledLink>
                        ) : null}
                        <StyledLink
                           onClick={() => {
                              if (isLoggedIn) {
                                 navigate('/profile');
                              } else {
                                 setShowRestrictedModal(true);
                              }
                           }}
                        >
                           Profile
                        </StyledLink>
                        <StyledLink onClick={() => navigate('/signup')}>
                           Sign Up/Login
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
