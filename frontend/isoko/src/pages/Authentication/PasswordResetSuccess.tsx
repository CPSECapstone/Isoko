import React, { useEffect } from 'react';
import device from '../../styles/devices';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

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

const PasswordResetSuccess: React.FC = () => {
   const navigate = useNavigate();

   useEffect(() => {
      setTimeout(() => {
         navigate('/login');
      }, 2500);
   }, []);

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
                        <FPTitle>Password Reset Successful!</FPTitle>
                        <p>
                           Your password has been successfully reset, you will
                           be redirected to login shortly.
                        </p>
                        <Link to="/login">Back to Login</Link>
                     </TextContainer>
                  </InputContainer>
               </MainContent>
            </RightDiv>
         </Container>
      </main>
   );
};

export default PasswordResetSuccess;
