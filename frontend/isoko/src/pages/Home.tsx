import React from 'react';
import styled from 'styled-components';
import SignOutButton from '../components/SignOutButton';
import KeywordSearchBar from '../components/KeywordSearchBar';
import MinoritySearchBar from '../components/MinoritySearchBar';

const Title = styled.h1`
   text-align: center;
   font-family: Comfortaa;
   font-style: normal;
   font-weight: normal;
   font-size: 6rem;
   color: #ffffff;
`;

const SubTitle = styled.h3`
   text-align: center;
   font-family: Frank Ruhl Libre;
   font-style: normal;
   font-weight: normal;
   font-size: 3rem;
   color: #ffffff;
`;

const Home = () => (
   <main>
      <SignOutButton />
      <Title>ISOKO</Title>
      <SubTitle>find something special</SubTitle>
      <KeywordSearchBar></KeywordSearchBar>
      <MinoritySearchBar></MinoritySearchBar>
   </main>
);

export default Home;
