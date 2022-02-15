import React from 'react';
import styled from 'styled-components';
import SearchBar from '../components/Home/SearchBar';
import coffee from '../components/Home/BackgroundPics/coffee.png';
import sculptures from '../components/Home/BackgroundPics/sculptures.png';
import flowers from '../components/Home/BackgroundPics/flowers.png';
import BusinessPreview from '../components/business/BusinessPreview';

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

const ImageContainer = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: center;
`;

const TopContent = styled.div`
   height: 100vh;
   min-height: 500px;
`;

// TODO: Combine these three into a single component taking in props
const LeftImg = styled.div`
   width: 33%;
   height: 100%;
   min-height: 500px;
   position: absolute;
   left: 0;
   z-index: -1;
   background-image: url(${flowers});
   background-size: cover;
   background-position: top left;
   background-repeat: no-repeat;
`;

const MidImg = styled.div`
   min-height: 500px;
   width: 34%;
   height: 100%;
   position: absolute;
   z-index: -1;
   background-image: url(${sculptures});
   background-size: cover;
   background-position: center;
   background-repeat: no-repeat;
`;

const RightImg = styled.div`
   min-height: 500px;
   width: 33%;
   height: 100%;
   position: absolute;
   right: 0px;
   z-index: -1;
   background-image: url(${coffee});
   background-size: cover;
   background-position: top right;
   background-repeat: no-repeat;
`;

const FTitle = styled.h2`
   font-size: 1.25rem;
   margin-block-start: 0em;
   margin-block-end: 0em;
`;

const StyledBusinessPreview = styled(BusinessPreview)`
   margin-bottom: 15px;
`;

const SearchBarContent = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;

   height: 100%;
`;

const BottomContent = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;

   height: 100vh;
   min-height: 500px;
`;

const CenterDiv = styled.div`
   display: flex;
   align-items: flex-start;
   flex-direction: column;

   width: 90%;
`;

const Home: React.FC = () => (
   <main>
      <TopContent>
         <ImageContainer>
            <LeftImg></LeftImg>
            <MidImg></MidImg>
            <RightImg></RightImg>
         </ImageContainer>

         <SearchBarContent>
            <Title>ISOKO</Title>
            <SubTitle>find something special</SubTitle>
            <SearchBar />
         </SearchBarContent>
      </TopContent>

      <BottomContent>
         <CenterDiv>
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
         </CenterDiv>
      </BottomContent>
   </main>
);

export default Home;
