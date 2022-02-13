import React from 'react';
import styled from 'styled-components';
import SearchBar from '../components/Home/SearchBar';
import SignOutButton from '../components/SignOutButton';
import coffee from '../components/Home/BackgroundPics/coffee.png';
import sculptures from '../components/Home/BackgroundPics/sculptures.png';
import flowers from '../components/Home/BackgroundPics/flowers.png';
import device from '../styles/devices';
import BusinessPreview from '../components/business/BusinessPreview';

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

const ContentContainer = styled.div`
   display: flex;
   justify-content: center;
   flex-shrink: 1;
   width: 100%;
   height: 100%;
   min-height: 100vh;
   padding: 30px;
`;

const SearchContainer = styled.div`
   display: flex;
   height: 50%;
`;

const FeaturedBusinesses = styled.div`
   align-self: center;
   display: flex;
   flex-grow: 1;
   flex-shrink: 1;
   flex-direction: column;
   align-items: flex-start;
   height: 50%;
   margin-left: 10%;
   margin-right: 10%;
   max-width: 1200px;
`;

const FTitle = styled.h2`
   font-size: 1.25rem;
   margin: none;
   margin-block-start: 0em;
   margin-block-end: 0em;
   align-self: left;
`;

const StyledBusinessPreview = styled(BusinessPreview)`
   margin-bottom: 15px;
`;

const Home: React.FC = () => (
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

      <ContentContainer>
         <SearchContainer />
         <FeaturedBusinesses>
            <FTitle>{'Featured Brick & Mortar Business'}</FTitle>
            <StyledBusinessPreview
               name="Bluth's Original Frozen Banana"
               imageUrl="https://static3.srcdn.com/wordpress/wp-content/uploads/2020/02/Arrested-Development-Banana-Stand.jpg"
               description="There's always money in the banana stand"
               stars={4.5}
               minorityTags={['Black-Owned', 'Woman-Owned']}
               keywordTags={['Smoothies', 'Bananas']}
               verified={true}
               path="/business"
               numReviews={150}
            />
            <FTitle>{'Featured Online Business'}</FTitle>
            <StyledBusinessPreview
               name="Bob's Burgers"
               imageUrl="https://www.pluggedin.com/wp-content/uploads/2020/01/bobs-burgers-review-image.jpg"
               description="Bob rallies the team to cook up some business, so he sends middle child Gene to push something or other here this is long"
               stars={3}
               minorityTags={['Black-Owned']}
               keywordTags={['Burgers']}
               verified={false}
               path="/business"
               numReviews={80}
            />
         </FeaturedBusinesses>
      </ContentContainer>
   </main>
);

export default Home;
