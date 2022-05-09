import React from 'react';
import Stat from '../../components/business_dashboard/Stat';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

const StyledDiv = styled.div`
   text-align: left;
   margin-left: 22px;
`;

const Analytics: React.FC = () => (
   <main>
      <h1>Business Dashboard Analytics</h1>
      <StyledDiv>
         <h2>General Analytics</h2>
      </StyledDiv>
      <Container>
         <Row>
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
         </Row>
      </Container>
   </main>
);

export default Analytics;
