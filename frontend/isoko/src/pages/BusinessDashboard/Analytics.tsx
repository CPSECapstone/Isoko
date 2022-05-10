import React from 'react';
import Stat from '../../components/business_dashboard/Stat';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import RatingGraph from '../../components/business_dashboard/RatingGraph';
import CustomAnalytics from '../../components/business_dashboard/CustomAnalytics';

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

// will be calculated by retrieving ratings from reviews of a business
const ratings = [
   {
      rating: 5,
      count: 34,
   },
   {
      rating: 4,
      count: 10,
   },
   {
      rating: 3,
      count: 2,
   },
   {
      rating: 2,
      count: 3,
   },
   {
      rating: 1,
      count: 5,
   },
];

// will be retrieved from rating attribute of business
const avgRating = 4.02;

const Analytics: React.FC = () => (
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
               <Stat stat="Total Reviews" value={17} />
            </Col>
            <Col>
               <Stat stat="Total Ratings" value={54} />
            </Col>
            <Col>
               <Stat stat="Links Clicked" value={43} />
            </Col>
         </StyledRow>
         <Row>
            <StyledDiv>
               <h2>Rating Breakdown</h2>
            </StyledDiv>
         </Row>
         <Row>
            <ChartTitle>Average Rating - {avgRating}</ChartTitle>
         </Row>
         <StyledRow>
            <RatingGraph ratings={ratings} />
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

export default Analytics;
