import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import StyledButton from '../../styles/StyledButton';
import { Modal, Row, Col, Container } from 'react-bootstrap';
import { environment } from '../../environment/environment';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { Link, useNavigate } from 'react-router-dom';

const NotLoggedInError = styled.div`
   align-items: center;
   color: red;
`;

interface ClaimBusinessModal extends React.HTMLProps<HTMLDivElement> {
   show: boolean;
   handleClose: () => void;
}

const ClaimBusinessModal: React.FC<ClaimBusinessModal> = (props) => {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [err, setErr] = useState('');

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

   const claimBusiness = () => {
      console.log('Confirm claim business clicked');
      //TODO: add put request for user and business to update
   };

   return (
      <Modal show={props.show} onHide={props.handleClose}>
         <Modal.Header closeButton>
            <Modal.Title>Claim a Business</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            By clicking confirm, you are agreeing that you are the owner of this
            business. Please do not claim this business if you are not the
            owner. One of our associates will reach out to you using the
            provided contact information to verify the claim. Thank you!
            {err ? (
               <NotLoggedInError>
                  {err} <Link to="/login">Log in here</Link>
               </NotLoggedInError>
            ) : null}
         </Modal.Body>
         <Modal.Footer>
            <StyledButton onClick={props.handleClose}>Cancel</StyledButton>
            <StyledButton
               primary
               onClick={() => {
                  if (isLoggedIn) {
                     claimBusiness();
                  } else {
                     setErr(
                        'You are not logged in. Please log in to claim this business.'
                     );
                  }
                  props.handleClose();
               }}
            >
               Confirm
            </StyledButton>
         </Modal.Footer>
      </Modal>
   );
};

export default ClaimBusinessModal;
