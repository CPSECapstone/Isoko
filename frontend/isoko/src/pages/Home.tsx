import React from 'react';
import SignOutButton from '../components/SignOutButton';
import FeaturedBusiness from '../components/FeaturedBusiness';
import styled from 'styled-components';

const ContentContainer = styled.div`
   display: flex;
   justify-content: center;
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
   flex-direction: column;
   align-items: flex-start;
   height: 50%;
   margin-left: 10%;
   margin-right: 5%;
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
            <FeaturedBusiness
               type="B&M"
               name="Bluth's Original Frozen Banana"
               imageUrl="https://static3.srcdn.com/wordpress/wp-content/uploads/2020/02/Arrested-Development-Banana-Stand.jpg"
               description="There's always money in the banana stand"
               stars={4.5}
            />
            <Title>{'Featured Online Business'}</Title>
            <FeaturedBusiness
               type="Online"
               name="Bob's Burgers"
               imageUrl="https://www.pluggedin.com/wp-content/uploads/2020/01/bobs-burgers-review-image.jpg"
               description="Most average burger place"
               stars={3}
            />
         </FeaturedBusinesses>
      </ContentContainer>
   </main>
);

export default Home;
