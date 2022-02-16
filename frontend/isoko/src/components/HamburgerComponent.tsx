import React from 'react';
import styled from 'styled-components';
import {
   Navbar,
   Nav,
   NavDropdown,
   Container,
   Offcanvas,
} from 'react-bootstrap';

const Position = styled.div`
   border: 1px solid blue;
   position: absolute;
   top: 0;
   right: 0;
   padding: 0;
   margin: 0;
`;

const StyledNavbar = styled(Navbar)`
   padding: 0px;
   padding-right: 0;
   padding-left: 0;
   margin: 0;
   width: 100%;

   .container-fluid {
      padding: 0px;
   }
`;

// TODO: get rid of ISOKO heading on small screens to make more space.
const HamburgerComponent: React.FC = () => {
   return (
      <Position>
         <StyledNavbar bg="light" expand={false}>
            <Container fluid>
               <Navbar.Toggle aria-controls="offcanvasNavbar" />
               <Navbar.Offcanvas
                  id="offcanvasNavbar"
                  aria-labelledby="offcanvasNavbarLabel"
                  placement="end"
               >
                  <Offcanvas.Header closeButton>
                     <Offcanvas.Title id="offcanvasNavbarLabel">
                        Offcanvas
                     </Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                     <Nav className="justify-content-end flex-grow-1 pe-3">
                        <Nav.Link href="#action3">Back To Home</Nav.Link>
                        <Nav.Link href="#action1">List A Business</Nav.Link>
                        <Nav.Link href="#action2">Sign Up</Nav.Link>
                     </Nav>
                  </Offcanvas.Body>
               </Navbar.Offcanvas>
            </Container>
         </StyledNavbar>
      </Position>
   );
};

export default HamburgerComponent;
