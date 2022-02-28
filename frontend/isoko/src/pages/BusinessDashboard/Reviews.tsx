import React, { useState } from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import Review from '../../components/Review';
import SortReviewsDropdown from '../../components/business_dashboard/SortReviewsDropdown';

const ReviewsContainer = styled.div`
   margin-left: 225px;
   margin-right: 300px;
`;

const ReviewsTitle = styled.h2`
   text-align: left;
   margin-bottom: 1em;
   margin-top: 0.7em;
`;

const SortByContainer = styled.div`
   display: flex;
   flex-direction: row;
   align-items: center;
`;

const SortByText = styled.h3`
   margin-top: 0.7em;
   margin-right: 0.5em;
`;

const Reviews: React.FC = () => {
   const reviewsList = [
      {
         pk: '12345678',
         sk: 'REVIEW#1645601555#randomUser',
         reviewAuthor: 'Christina',
         authorUserName: 'randomUser',
         authorProfilePicture:
            'https://www.unh.edu/unhtoday/sites/default/files/styles/article_huge/public/article/2019/professional_woman_headshot.jpg?itok=3itzxHXh',
         stars: 4,
         reviewTitle: 'Great',
         description: 'Was pretty good. Could have better service',
         pictures: [
            'https://images.unsplash.com/photo-1587410131477-f01b22c59e1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dGFsbCUyMHRvd2VyfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
            'https://www.pluggedin.com/wp-content/uploads/2020/01/bobs-burgers-review-image.jpg',
            'https://www.robin-noorda.com/uploads/1/6/8/3/16830688/3347022_orig.jpg',
         ],
         ts: 1645923559,
      },
      {
         pk: '12345678',
         sk: 'REVIEW#1645601222#randomUser2',
         reviewAuthor: 'Jerry',
         authorUserName: 'randomUser2',
         authorProfilePicture:
            'https://d5t4h5a9.rocketcdn.me/wp-content/uploads/2021/04/Website-Photo-18.png',
         stars: 3,
         reviewTitle: 'Okay',
         description: 'Wanted more food.',
         pictures: [
            'https://www.pluggedin.com/wp-content/uploads/2020/01/bobs-burgers-review-image.jpg',
            'https://static3.srcdn.com/wordpress/wp-content/uploads/2020/02/Arrested-Development-Banana-Stand.jpg',
         ],
         ts: 1631235559,
      },
      {
         pk: '12345678',
         sk: 'REVIEW#1645601444#randomUser3',
         reviewAuthor: 'William',
         authorUserName: 'randomUser3',
         authorProfilePicture:
            'https://srkheadshotday.com/wp-content/uploads/Herman_Man_Headshot_19G1006.jpg',
         stars: 2,
         reviewTitle: 'Mid',
         description:
            "Didn't know food could be so mid. Owner seems chill though",
         pictures: [
            'https://www.pluggedin.com/wp-content/uploads/2020/01/bobs-burgers-review-image.jpg',
         ],
         ts: 1637715559,
      },
   ];

   const [sortedReviews, setSortedReviews] = useState(
      reviewsList.sort((a, b) => b.ts - a.ts)
   );

   const sortReviews = (key) => {
      if (key === 'recent') {
         setSortedReviews([...sortedReviews.sort((a, b) => b.ts - a.ts)]);
      } else if (key === 'highestRated') {
         setSortedReviews([...sortedReviews.sort((a, b) => b.stars - a.stars)]);
      } else if (key === 'lowestRated') {
         setSortedReviews([...sortedReviews.sort((a, b) => a.stars - b.stars)]);
      }
   };
   return (
      <ReviewsContainer>
         <ReviewsTitle>Reviews</ReviewsTitle>
         <SortByContainer>
            <SortByText>Sort By: </SortByText>
            <SortReviewsDropdown
               sortFunction={sortReviews}
            ></SortReviewsDropdown>
         </SortByContainer>
         <Col>
            {sortedReviews.map((review, index) => (
               <Row key={index}>
                  <Review
                     reviewerName={review.reviewAuthor}
                     reviewerImageUrl={review.authorProfilePicture}
                     stars={review.stars}
                     subject={review.reviewTitle}
                     content={review.description}
                     imageUrls={review.pictures}
                     ts={review.ts}
                  />
               </Row>
            ))}
         </Col>
      </ReviewsContainer>
   );
};

export default Reviews;
