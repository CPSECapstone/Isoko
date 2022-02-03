import React, { useState } from 'react';
import StyledButton from '../../styles/StyledButton';
import device from '../../styles/devices';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { environment } from '../../environment/environment';

const LeftDiv = styled.div`
   width: 50%;
   background-image: url(${process.env.PUBLIC_URL + 'login_image.png'});
   background-position: top right;
   background-size: cover;
   background-repeat: no-repeat;
   @media ${device.tablet} {
      order: 2;
      width: 100%;
   }
`;

const Title = styled.h1`
   font-size: 4rem;
   margin-right: 18px;
   margin: none;
   margin-block-start: 0em;
   margin-block-end: 0em;
`;

const Container = styled.div`
   display: flex;
   flex-direction: row;
   @media ${device.tablet} {
      flex-direction: column;
   }
   width: 100%;
   height: 100%;
   min-height: 100vh;
`;

const RightDiv = styled.div`
   background-color: #fbfbfb;
   order: 1;
   width: 50%;
   @media ${device.tablet} {
      order: 1;
      width: 100%;
      min-height: 100vh;
   }
`;

const RowDiv = styled.div`
   margin-top: 20%;
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: center;
   padding: 0px;
`;

const InputContainer = styled.div`
   margin: 24px auto 0px auto;
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   justify-content: center;
   width: 70%;
`;

const StyledInput = styled.input`
   width: 100%;
   border-radius: 10px;
   border: none;
   height: 32px;
   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
   text-indent: 10px;
`;

const StyledLabel = styled.label`
   text-align: left;
   align-items: flex-start;
   justify-content: start;
`;

const SignUpHere = styled.div`
   margin-top: 5px;
   align-items: flex-end;
   justify-content: end;
   float: right;
   margin-right: 15%;
`;

const FormError = styled.p`
   justify-content: center;
   color: red;
   text-align: left;
   width: 70%;
   margin: 0 auto;
`;

const WideButton = styled(StyledButton)`
   width: 70%;
   border-radius: 10px;
   border: none;
   height: 32px;
   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
   text-indent: 10px;
`;

const MainContent = styled.div``;

const Description = styled.div`
   font-size: 1.5rem;
   display: flex;
   justify-content: center;
   align-items: center;
   text-align: center;
   max-width: 45%;
   margin: 30% auto;
   min-height: 30%;
   background-color: white;
   opacity: 1;
   padding: 24px 12px 24px 24px;
   border-radius: 15px;
   box-shadow: 5px 5px 4px rgba(0, 0, 0, 0.25);
`;

const TextContainer = styled.div`
   width: 100%;
   margin-bottom: 10px;
`;

const FPTitle = styled.h2`
   color: #f97d0b;
`;

const ErrContainer = styled.div`
   height: 20px;
`;

const ResetPassword = () => {
   const [newPassword, setNewPassword] = useState('');
   const [verificationCode, setVerificationCode] = useState('');
   const [email, setEmail] = useState('');
   const [err, setErr] = useState('');

   const navigate = useNavigate();

   const resetPassword = () => {
      const userPool = new CognitoUserPool({
         UserPoolId: environment.cognitoUserPoolId,
         ClientId: environment.cognitoAppClientId,
      });

      const cognitoUser = new CognitoUser({
         Username: email,
         Pool: userPool,
      });

      cognitoUser.confirmPassword(verificationCode, newPassword, {
         onSuccess: () => {
            navigate('/resetSuccess');
         },
         onFailure: (err) => {
            setErr(err.message);
         },
      });
   };

   return (
      <main>
         <Container>
            <LeftDiv>
               <Description>
                  {' '}
                  At ISOKO, our mission is to increase traction to ALL minority
                  owned businesses. Log in to start supporting the business
                  owners in your very own community!{' '}
               </Description>
            </LeftDiv>
            <RightDiv>
               <MainContent>
                  <RowDiv>
                     <Title>ISOKO</Title>
                  </RowDiv>
                  <InputContainer>
                     <TextContainer>
                        <FPTitle>Reset Password</FPTitle>
                        <p>
                           Please check the email you entered for your 6 digit
                           verification code and enter a new password.
                        </p>
                     </TextContainer>
                     <StyledLabel> Verification Code</StyledLabel>
                     <StyledInput
                        placeholder="111111"
                        onChange={(e) => {
                           setVerificationCode(e.target.value);
                           setErr('');
                        }}
                     ></StyledInput>{' '}
                     <br></br>
                     <StyledLabel> Email</StyledLabel>
                     <StyledInput
                        placeholder="example@gmail.com"
                        onChange={(e) => {
                           setEmail(e.target.value);
                           setErr('');
                        }}
                     ></StyledInput>{' '}
                     <br></br>
                     <StyledLabel> New Password</StyledLabel>
                     <StyledInput
                        type="password"
                        placeholder="new password"
                        onChange={(e) => {
                           setNewPassword(e.target.value);
                           setErr('');
                        }}
                     ></StyledInput>{' '}
                     <br />
                  </InputContainer>
                  <ErrContainer>
                     {err ? <FormError>{err}</FormError> : null}
                  </ErrContainer>
                  <WideButton primary onClick={resetPassword}>
                     Reset Password
                  </WideButton>
                  <div>
                     <SignUpHere>
                        <Link to="/login">Back to Login</Link>
                     </SignUpHere>
                  </div>
               </MainContent>
            </RightDiv>
         </Container>
      </main>
   );
};

export default ResetPassword;
