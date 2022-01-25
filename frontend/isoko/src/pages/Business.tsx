import React from 'react';
import StarRating from '../components/StarRating';
import styled from 'styled-components';

const StyledStarRating = styled(StarRating)`
   position: absolute;
   left: 200px;
`;

const Business = () => (
   <main>
      <h1>Business Listing</h1>
      <StyledStarRating rating={2.3} />
   </main>
);

export default Business;
