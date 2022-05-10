import React, { useState } from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import Review from '../../components/reviews/Review';
import SortReviewsDropdown from '../../components/business_dashboard/SortReviewsDropdown';
import { Review as ReviewType } from '../../types/GlobalTypes';

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

interface ReviewProps extends React.HTMLProps<HTMLDivElement> {
   reviews: Array<ReviewType>;
}

const Reviews: React.FC<ReviewProps> = (props) => {
   const reviewsList = props.reviews;

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
                     name={review.reviewAuthor}
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
