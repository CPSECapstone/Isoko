import React from 'react';
import StyledButton from '../styles/StyledButton';
import { environment } from '../environment/environment';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { useNavigate } from 'react-router-dom';

const SignOutButton = () => {
   const navigate = useNavigate();

   const signOut = () => {
      const userPool = new CognitoUserPool({
         UserPoolId: environment.cognitoUserPoolId,
         ClientId: environment.cognitoAppClientId,
      });

      const user = userPool.getCurrentUser();
      user?.signOut();
      navigate('/login');
   };

   return <StyledButton onClick={signOut}>Sign Out</StyledButton>;
};

export default SignOutButton;
