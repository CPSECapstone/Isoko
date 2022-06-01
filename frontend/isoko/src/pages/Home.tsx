import React from 'react';
import styled from 'styled-components';
import SearchBar from '../components/Home/SearchBar';
import coffee from '../components/Home/BackgroundPics/coffee.png';
import sculptures from '../components/Home/BackgroundPics/sculptures.png';
import breakfast from '../components/Home/BackgroundPics/breakfast.jpeg';
import BusinessPreview from '../components/business/BusinessPreview';
import HamburgerComponent from '../components/HamburgerComponent';

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

const LeftImg = styled.div`
   width: 33%;
   height: 100%;
   min-height: 500px;
   position: absolute;
   left: 0;
   z-index: -1;
   background-image: url(${breakfast});
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

const Home: React.FC = () => {
   return (
      <main>
         <TopContent>
            <HamburgerComponent />
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
                  name={'SloDoCo Donuts'}
                  imageUrl={
                     'https://s3-media1.fl.yelpcdn.com/bphoto/D_3vgv0Hd8u4XKkDjSvr9w/o.jpg'
                  }
                  description={
                     'Come enjoy a fancy cocktail with our scenic creek views.'
                  }
                  stars={0}
                  minorityTags={['LGBTQ+ Owned, Women Owned']}
                  keywordTags={['Donuts']}
                  verified={true}
                  path={`/business/1669197307`}
                  numReviews={0}
                  businessId={'1669197307'}
               />
               <FTitle>{'Featured Online Business'}</FTitle>
               <StyledBusinessPreview
                  name={'Paris Nail Lounge'}
                  imageUrl={
                     'https://s3-media2.fl.yelpcdn.com/bphoto/fN6NslNHWmB909Mk3XVjuw/o.jpg'
                  }
                  description={
                     "The first shop of it's kind to open up in San Luis Obispo!"
                  }
                  stars={0}
                  minorityTags={['LGBTQ+ Owned', 'Women Owned']}
                  keywordTags={['Nail Salon']}
                  verified={true}
                  path={`/business/-1002763084`}
                  numReviews={0}
                  businessId={'-1002763084'}
               />
            </CenterDiv>
         </BottomContent>
      </main>
   );
};

export default Home;
