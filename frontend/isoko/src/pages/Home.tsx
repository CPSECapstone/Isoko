import React from 'react';
import styled from 'styled-components';
import SearchBar from '../components/Home/SearchBar';
import SignOutButton from '../components/SignOutButton';
import coffee from '../components/Home/BackgroundPics/coffee.png';
import sculptures from '../components/Home/BackgroundPics/sculptures.png';
import flowers from '../components/Home/BackgroundPics/flowers.png';
import device from '../styles/devices';

const Title = styled.h1`
   text-align: center;
   font-family: Comfortaa;
   font-style: normal;
   font-weight: normal;
   font-size: 6rem;
   color: #ffffff;
   padding-top: 5%;
`;

const SubTitle = styled.h3`
   text-align: center;
   font-family: Frank Ruhl Libre;
   font-style: normal;
   font-weight: normal;
   font-size: 3rem;
   color: #ffffff;
`;

const Container = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: center;
`;

const LeftImg = styled.div`
   display: flex;
   flex-direction: column;
   width: 33%;
   height: 100%;
   position: absolute;
   left: 0;
   z-index: -1;
   // padding: 100px;
   background-image: url(${flowers});
   background-size: cover;
   background-position: top left;
   background-repeat: no-repeat;
   // @media ${device.tablet} {
   //    order: 2;
   //    width: 100%;
   // }
`;

const MidImg = styled.div`
   display: flex;
   flex-direction: column;
   width: 34%;
   height: 100%;
   position: absolute;
   z-index: -1;
   // padding: 1em;
   background-image: url(${sculptures});
   background-size: cover;
   background-position: center;
   background-repeat: no-repeat;
   // @media ${device.tablet} {
   //    order: 2;
   //    width: 100%;
   // }
`;
const RightImg = styled.div`
   display: flex;
   flex-direction: column;
   width: 33%;
   height: 100%;
   position: absolute;
   right: 0px;
   z-index: -1;
   // padding: 1.1em;
   background-image: url(${coffee});
   background-size: cover;
   background-position: top right;
   background-repeat: no-repeat;
   // @media ${device.tablet} {
   //    order: 2;
   //    width: 100%;
   // }
`;

const Home = () => (
   <main>
      <Container>
         <LeftImg></LeftImg>
         <MidImg></MidImg>
         <RightImg></RightImg>
      </Container>
      <SignOutButton />
      <Title>ISOKO</Title>
      <SubTitle>find something special</SubTitle>
      <SearchBar></SearchBar>
   </main>
);

export default Home;
