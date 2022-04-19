import React, { useState } from 'react';
import StyledButton from '../../styles/StyledButton';
import device from '../../styles/devices';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import {
   CognitoUserPool,
   CognitoUserAttribute,
} from 'amazon-cognito-identity-js';
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
   margin-top: 30%;
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

const HalfStyledInput = styled.input`
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

const StyledLink = styled.div`
   margin-top: 5px;
   align-items: flex-end;
   justify-content: end;
   float: right;
   margin-right: 15%;
`;

const WideButton = styled(StyledButton)`
   width: 70%;
   border-radius: 10px;
   border: none;
   height: 32px;
   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
   text-indent: 10px;
`;

const MainContent = styled.div`
   margin-top: -30px;
`;

const NameInputContainer = styled.div`
   display: flex;
   flex-direction: row;
   width: 100%;
   justify-content: space-between;
`;

const NameDiv = styled.div`
   display: flex;
   flex-direction: column;
   width: 47%;
`;

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

const FormError = styled.p`
   justify-content: center;
   color: red;
   text-align: left;
   width: 70%;
   margin: 0 auto;
`;

const SignUp: React.FC = () => {
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [err, setErr] = useState('');
   const regExpPassword = RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&]).{8,}$/
   );

   const navigate = useNavigate();

   const checkAllFieldsEnteredProperly = () => {
      if (
         firstName.length === 0 ||
         lastName.length === 0 ||
         email.length === 0 ||
         password.length === 0 ||
         confirmPassword.length === 0
      ) {
         setErr('Make sure all fields are filled out');
         return false;
      }
      checkPasswordValidity();
   };

   const checkPasswordValidity = () => {
      if (password !== confirmPassword) {
         setErr('Make sure your passwords match');
         return false;
      }
      if (!regExpPassword.test(password)) {
         // AWS cognito actually checks the password is valid, this is just to provide helpful error feedback to the users
         setErr(
            'Make sure your password is at least 8 digits, and contains a lowercase, uppercase, and special character'
         );
         return false;
      }
      onSignup();
   };

   const onSignup = () => {
      const userPool = new CognitoUserPool({
         UserPoolId: environment.cognitoUserPoolId,
         ClientId: environment.cognitoAppClientId,
      });

      userPool.signUp(
         email,
         password,
         [
            new CognitoUserAttribute({
               Name: 'name',
               Value: firstName,
            }),
            new CognitoUserAttribute({
               Name: 'family_name',
               Value: lastName,
            }),
            new CognitoUserAttribute({
               Name: 'email',
               Value: email,
            }),
         ],
         [],
         (err) => {
            if (err) {
               setErr(err.message || JSON.stringify(err));
               return;
            }
            navigate('/emailVerification');
         }
      );
   };

   const handleEnterPress = (event) => {
      // keyCode 13 is Enter
      if (event.keyCode === 13) {
         checkAllFieldsEnteredProperly();
      }
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
            <RightDiv onKeyDown={handleEnterPress}>
               <MainContent>
                  <RowDiv>
                     <Title>ISOKO</Title>
                  </RowDiv>
                  <InputContainer>
                     <NameInputContainer>
                        <NameDiv>
                           <StyledLabel> First Name</StyledLabel>
                           <HalfStyledInput
                              type="name"
                              placeholder="John"
                              onChange={(e) => {
                                 setFirstName(e.target.value);
                                 setErr('');
                              }}
                           ></HalfStyledInput>{' '}
                        </NameDiv>
                        <NameDiv>
                           <StyledLabel> Last Name</StyledLabel>
                           <HalfStyledInput
                              type="name"
                              placeholder="Doe"
                              onChange={(e) => {
                                 setLastName(e.target.value);
                                 setErr('');
                              }}
                           ></HalfStyledInput>{' '}
                        </NameDiv>
                     </NameInputContainer>
                     <br />
                     <StyledLabel> Email</StyledLabel>
                     <StyledInput
                        type="email"
                        placeholder="example@gmail.com"
                        onChange={(e) => {
                           setEmail(e.target.value);
                           setErr('');
                        }}
                     ></StyledInput>{' '}
                     <br />
                     <StyledLabel> Password</StyledLabel>
                     <StyledInput
                        type="password"
                        placeholder="password"
                        onChange={(e) => {
                           setPassword(e.target.value);
                           setErr('');
                        }}
                     ></StyledInput>
                     <br />
                     <StyledLabel>Confirm Password</StyledLabel>
                     <StyledInput
                        type="password"
                        placeholder="confirm password"
                        onChange={(e) => {
                           setConfirmPassword(e.target.value);
                           setErr('');
                        }}
                     ></StyledInput>{' '}
                     <br />
                  </InputContainer>
                  <br />
                  {err ? <FormError>{err}</FormError> : null}
                  <WideButton primary onClick={checkAllFieldsEnteredProperly}>
                     {' '}
                     Sign Up
                  </WideButton>
                  <div>
                     <StyledLink>
                        Have an account? &nbsp;
                        <Link to="/login">Log in here</Link>
                     </StyledLink>
                  </div>
               </MainContent>
            </RightDiv>
         </Container>
      </main>
   );
};

export default SignUp;
