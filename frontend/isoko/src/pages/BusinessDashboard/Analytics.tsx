import React, { useState } from 'react';
import Stat from '../../components/business_dashboard/Stat';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import RatingGraph from '../../components/business_dashboard/RatingGraph';
import CustomAnalytics from '../../components/business_dashboard/CustomAnalytics';
import { Review as ReviewType } from '../../types/GlobalTypes';

const StyledDiv = styled.div`
   text-align: left;
`;

const StyledRow = styled(Row)`
   margin-bottom: 20px;
   display: flex;
`;

const ChartTitle = styled.div`
   text-align: left;
   font-weight: bold;
   margin-left: 35%;
`;

interface ReviewProps extends React.HTMLProps<HTMLDivElement> {
   rating: number;
   reviews: Array<ReviewType>;
}

// will be calculated by retrieving ratings from reviews of a business

const Analytics: React.FC<ReviewProps> = (props) => {
   const ratingArray = [
      {
         rating: 5,
         count: 0,
      },
      {
         rating: 4,
         count: 0,
      },
      {
         rating: 3,
         count: 0,
      },
      {
         rating: 2,
         count: 0,
      },
      {
         rating: 1,
         count: 0,
      },
   ];

   const buildRatingCount = (ratingCount) => {
      props.reviews.forEach((review) => {
         const index = ratingCount.findIndex(
            (obj) => obj.rating == Math.round(review.stars)
         );
         ratingCount[index].count = ratingCount[index].count + 1;
      });
      return ratingCount;
   };

   const totalRatings = props.reviews.length;

   return (
      <main>
         <h1>Business Dashboard Analytics</h1>
         <Container>
            <Row>
               <StyledDiv>
                  <h2>General Analytics</h2>
               </StyledDiv>
            </Row>
            <StyledRow>
               <Col>
                  <Stat stat="Page Views" value={130} />
               </Col>
               <Col>
                  <Stat stat="Unique Views" value={94} />
               </Col>
               <Col>
                  <Stat stat="Total Ratings" value={totalRatings} />
               </Col>
            </StyledRow>
            <Row>
               <StyledDiv>
                  <h2>Rating Breakdown</h2>
               </StyledDiv>
            </Row>
            <Row>
               <ChartTitle>Average Rating - {props.rating}</ChartTitle>
            </Row>
            <StyledRow>
               <RatingGraph ratings={buildRatingCount(ratingArray)} />
            </StyledRow>
            <Row>
               <StyledDiv>
                  <h2>Custom Analytics</h2>
               </StyledDiv>
               <StyledRow>
                  <CustomAnalytics />
               </StyledRow>
            </Row>
         </Container>
      </main>
   );
};

export default Analytics;
