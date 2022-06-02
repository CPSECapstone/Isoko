import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import StyledButton from '../../styles/StyledButton';
import { Modal } from 'react-bootstrap';
import { environment } from '../../environment/environment';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { Link } from 'react-router-dom';
import { Business as BusinessType } from '../../types/GlobalTypes';
import { User as UserType } from '../../types/GlobalTypes';
import { useAppDispatch } from '../../app/hooks';
import { updateBusinessDetailsAsync } from '../../features/dashboard/DashboardSlice';
import { updateUserToBusinessOwnerAsync } from '../../features/profile/ProfileSlice';
import { useNavigate } from 'react-router-dom';

const NotLoggedInError = styled.div`
   align-items: center;
   color: red;
`;

interface ClaimBusinessModalProps extends React.HTMLProps<HTMLDivElement> {
   show: boolean;
   handleClose: () => void;
   profileDetails: UserType;
   businessDetails: BusinessType;
}

export interface UpdateParams {
   businessId: string;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   [key: string]: any;
}

const ClaimBusinessModal: React.FC<ClaimBusinessModalProps> = (props) => {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [err, setErr] = useState('');
   const navigate = useNavigate();

   const dispatch = useAppDispatch();

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
      dispatch(
         updateBusinessDetailsAsync({
            businessId: props.businessDetails.businessId,
            verified: true,
            aboutOwner: {
               photo: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png',
            },
         })
      );

      dispatch(
         updateUserToBusinessOwnerAsync({
            userSub: props.profileDetails.userSub,
            businessId: props.businessDetails.businessId,
         })
      );
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
                     props.handleClose();
                     alert('You have successfully claimed your business!');
                     navigate('/businessDash');
                  } else {
                     setErr(
                        'You are not logged in. Please log in to claim this business.'
                     );
                  }
               }}
            >
               Confirm
            </StyledButton>
         </Modal.Footer>
      </Modal>
   );
};

export default ClaimBusinessModal;
