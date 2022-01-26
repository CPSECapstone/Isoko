import React from 'react';
import SignOutButton from '../components/SignOutButton';
import BusinessPreview from '../components/BusinessPreview';
import styled from 'styled-components';

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

const Title = styled.h2`
   font-size: 1.25rem;
   margin: none;
   margin-block-start: 0em;
   margin-block-end: 0em;
   align-self: left;
`;

const Home = () => (
   <main>
      <h1>Home!</h1>
      <SignOutButton />

      <ContentContainer>
         <SearchContainer />
         <FeaturedBusinesses>
            <Title>{'Featured Brick & Mortar Business'}</Title>
            <BusinessPreview
               type="B&M"
               name="Bluth's Original Frozen Banana"
               imageUrl="https://static3.srcdn.com/wordpress/wp-content/uploads/2020/02/Arrested-Development-Banana-Stand.jpg"
               description="There's always money in the banana stand"
               stars={4.5}
               minorityTags={['Black-Owned', 'Woman-Owned']}
               keywordTags={['Smoothies', 'Bananas']}
               verified={true}
               path="/business"
            />
            <Title>{'Featured Online Business'}</Title>
            <BusinessPreview
               type="Online"
               name="Bob's Burgers"
               imageUrl="https://www.pluggedin.com/wp-content/uploads/2020/01/bobs-burgers-review-image.jpg"
               description="Bob rallies the team to cook up some business, so he sends middle child Gene to push something or other here this is long"
               stars={3}
               minorityTags={['Black-Owned']}
               keywordTags={['Burgers']}
               verified={false}
               path="/business"
            />
         </FeaturedBusinesses>
      </ContentContainer>
   </main>
);

export default Home;
