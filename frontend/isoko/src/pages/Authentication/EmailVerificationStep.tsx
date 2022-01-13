import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const EmailVerification = () => {
   const Background = styled.div`
      padding: 40px;
      min-width: 100vh;
      min-height: 100vh;
      margin-top: none;
      background-image: url(${process.env.PUBLIC_URL + 'login_image.png'});
      background-position: top right;
      background-size: cover;
      background-repeat: no-repeat;
   `;

   const Header = styled.h1`
      margin-top: 0px;
      padding-top: 24px;
      margin-bottom: 30px;
   `;

   const Description = styled.div`
      text-align: center;
      background-color: white;
      opacity: 1;
      padding: 24px 12px 24px 24px;
      border-radius: 15px;
      min-width: 200px;
      max-width: 50%;
      margin: 40px auto;
      box-shadow: 5px 5px 4px rgba(0, 0, 0, 0.25);
      position: relative;
   `;

   const navigate = useNavigate();

   return (
      <Background>
         <Description>
            <Header> Your account is almost ready for use! </Header>
            <h3> Please Check your email inbox to verify your account. </h3>
            <h3>
               {' '}
               Once you have verified your email, head to{' '}
               <a onClick={() => navigate('/login')}>our login page</a> and
               begin supporting Minority Owned Businesses!
            </h3>
         </Description>
      </Background>
   );
};

export default EmailVerification;
