import React, { useState } from 'react';
import StyledButton from '../styles/StyledButton';
import device from '../styles/devices';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SignUp = () => {
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

   const StyledCheckboxInput = styled.input`
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);     
      border: 1px solid rgba(0, 0, 0, 0.41)
      border-radius: 3px;
      box-sizing: border-box;
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

   const StyledLabelListBusiness = styled.label`
      margin-left: auto;
      margin-right: auto;
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

   const CheckboxInputContainer = styled.div`
      display: flex;
      flex-direction: row;
      width: 100%;
      justify-content: center;
      gap: 20px;
      margin-top: 10px;
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

   const [listBusinessState, setListBusinessState] = useState('');

   const handleNoListBusinessClick = () => {
      if (!(listBusinessState === 'NO')) {
         setListBusinessState('NO');
      }
   };
   const handleYesListBusinessClick = () => {
      if (!(listBusinessState === 'YES')) {
         setListBusinessState('YES');
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
            <RightDiv>
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
                           ></HalfStyledInput>{' '}
                        </NameDiv>
                        <NameDiv>
                           <StyledLabel> Last Name</StyledLabel>
                           <HalfStyledInput
                              type="name"
                              placeholder="Doe"
                           ></HalfStyledInput>{' '}
                        </NameDiv>
                     </NameInputContainer>
                     <br />
                     <StyledLabel> Email</StyledLabel>
                     <StyledInput
                        type="email"
                        placeholder="example@gmail.com"
                     ></StyledInput>{' '}
                     <br />
                     <StyledLabel> Password</StyledLabel>
                     <StyledInput
                        type="password"
                        placeholder="password"
                     ></StyledInput>
                     <br />
                     <StyledLabel>Confirm Password</StyledLabel>
                     <StyledInput
                        type="password"
                        placeholder="confirm password"
                     ></StyledInput>{' '}
                     <br />
                     <StyledLabelListBusiness>
                        Would you like to list a business on ISOKO right now?
                     </StyledLabelListBusiness>
                     <CheckboxInputContainer>
                        <label>
                           <StyledCheckboxInput
                              type="checkbox"
                              checked={listBusinessState === 'YES'}
                              onChange={handleYesListBusinessClick}
                           />
                           Yes
                        </label>
                        <label>
                           <StyledCheckboxInput
                              type="checkbox"
                              checked={listBusinessState === 'NO'}
                              onChange={handleNoListBusinessClick}
                           />
                           No
                        </label>
                     </CheckboxInputContainer>
                  </InputContainer>
                  <br />
                  <WideButton primary>Sign Up</WideButton>
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
