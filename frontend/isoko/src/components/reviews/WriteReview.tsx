import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const WriteReviewContainer = styled.div`
   display: flex;
   padding: 4px 5px 4px 5px;
   background-color: #f97d0b;
   text-align: center;
   border-radius: 4px;
   box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.25), 0px 2px 4px rgba(0, 0, 0, 0.11);
   cursor: pointer;
   width: 115px;
   color: #fff;
`;

const StyledText = styled.p`
   font-weight: 500;
   margin-bottom: 0px;
   margin-left: 5px;
   font-family: 'Inter', sans-serif;
   font-size: 1em;
`;

const WriteReview: React.FC = (props) => {
   return (
      <WriteReviewContainer className={props.className}>
         <div>
            <FontAwesomeIcon icon={faPencilAlt} color="#fff" />
         </div>
         <StyledText>Write a Review</StyledText>
      </WriteReviewContainer>
   );
};

export default WriteReview;
