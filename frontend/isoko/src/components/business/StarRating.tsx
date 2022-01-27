import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';

const RatingContainer = styled.div`
   display: flex;
   align-items: row;
`;

interface StarRatingProps extends React.HTMLProps<HTMLDivElement> {
   rating: number;
   starSize?: string;
}

const StarRating: React.FC<StarRatingProps> = (props) => {
   const numDisplayStars = Math.round(props.rating * 2) / 2;
   const starComponents = [];

   // Add whole stars
   for (let i = 0; i < Math.floor(numDisplayStars); i++) {
      starComponents.push(
         <FontAwesomeIcon size="lg" icon={faStar} color="#F97D0B" />
      );
   }

   // Check if we have a half star
   if ((numDisplayStars * 2) % 2 == 1) {
      starComponents.push(
         <FontAwesomeIcon size="lg" icon={faStarHalfAlt} color="#F97D0B" />
      );
   }

   // Fill remaining with empty stars
   while (starComponents.length < 5) {
      starComponents.push(
         <FontAwesomeIcon size="lg" icon={faStarEmpty} color="#F97D0B" />
      );
   }

   return (
      <RatingContainer className={props.className}>
         {starComponents.map((icon) => icon)}
      </RatingContainer>
   );
};

export default StarRating;
