import React from 'react';
import styled from 'styled-components';
import Review from '../components/Review';
import BusinessHeader from '../components/business/BusinessHeader';
import BusienssSidebar from '../components/business/BusinessSidebar';
import BusinessSidebar from '../components/business/BusinessSidebar';

const Title = styled.h1`
   font-size: 2.5em;
   text-align: left;
   padding: 0em 0em 0em 0.5em;
`;

const StyledBusinessSidebarOne = styled(BusinessSidebar)`
   position: absolute;
   right: 50px;
   top: 150px;
`;

const StyledBusinessSidebarTwo = styled(BusinessSidebar)`
   position: absolute;
   right: 50px;
   top: 800px;
`;

const Business = () => (
   <main>
      <StyledBusinessSidebarOne
         hours={{
            Mon: '8:00am - 5:00pm',
            Wed: '8:00am - 5:00pm',
            Fri: '8:00am - 5:00pm',
            Sat: '8:00am - 5:00pm',
         }}
         address="626 Broad St."
         links={[
            {
               title: 'website',
               link: 'https://www.firestonegrill.com/',
            },
         ]}
         claimed={false}
      />
      <StyledBusinessSidebarTwo
         hours={{
            Tue: '11:00am - 2:00pm',
            Sun: '6:00am - 11:00pm',
         }}
         address="626 Broad St."
         links={[
            {
               title: 'website',
               link: 'https://www.firestonegrill.com/',
            },
            {
               title: 'other',
               link: 'https://www.other.com/',
            },
         ]}
         claimed={true}
      />
      <BusinessHeader
         name="Bob's Burgers"
         description="Bob rallies the team to cook up some business, so he sends middle child Gene to push something or other here this is long"
         stars={3}
         minorityTags={['Black-Owned']}
         keywordTags={['Burgers']}
         verified={true}
         numReviews={80}
      />
      <Title>Ratings & Reviews</Title>
      <Review
         reviewerName="Sir Theodore"
         reviewerImageUrl="https://www.pluggedin.com/wp-content/uploads/2020/01/bobs-burgers-review-image.jpg"
         stars={4}
         subject="Great food and service!"
         content="I've never regretted eating at Bill's Diner. The Signature Burger is to die for and Bill is a homie. Everyone should come and eat some of Bill's food made with love and care."
         imageUrls={[
            'https://images.unsplash.com/photo-1587410131477-f01b22c59e1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dGFsbCUyMHRvd2VyfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
            'https://www.pluggedin.com/wp-content/uploads/2020/01/bobs-burgers-review-image.jpg',
            'https://www.robin-noorda.com/uploads/1/6/8/3/16830688/3347022_orig.jpg',
         ]}
      />
      <Review
         reviewerName="Sir Theodore"
         reviewerImageUrl="https://www.pluggedin.com/wp-content/uploads/2020/01/bobs-burgers-review-image.jpg"
         stars={4}
         subject="Great food and service!"
         content="I've never regretted eating at Bill's Diner. The Signature Burger is to die for and Bill is a homie. Everyone should come and eat some of Bill's food made with love and care."
         imageUrls={[
            'https://www.pluggedin.com/wp-content/uploads/2020/01/bobs-burgers-review-image.jpg',
            'https://static3.srcdn.com/wordpress/wp-content/uploads/2020/02/Arrested-Development-Banana-Stand.jpg',
         ]}
      />
      <Review
         reviewerName="Sir Theodore"
         reviewerImageUrl="https://www.pluggedin.com/wp-content/uploads/2020/01/bobs-burgers-review-image.jpg"
         stars={4}
         subject="Great food and service!"
         content="I've never regretted eating at Bill's Diner. The Signature Burger is to die for and Bill is a homie. Everyone should come and eat some of Bill's food made with love and care."
         imageUrls={[
            'https://www.pluggedin.com/wp-content/uploads/2020/01/bobs-burgers-review-image.jpg',
         ]}
      />
      <Review
         reviewerName="Sir Theodore"
         reviewerImageUrl="https://www.pluggedin.com/wp-content/uploads/2020/01/bobs-burgers-review-image.jpg"
         stars={4}
         subject="Great food and service!"
         content="I've never regretted eating at Bill's Diner. The Signature Burger is to die for and Bill is a homie. Everyone should come and eat some of Bill's food made with love and care."
      />
   </main>
);

export default Business;
