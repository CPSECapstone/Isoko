import React from 'react';
import styled from 'styled-components';
import StarRating from './StarRating';
import MinorityTag from './MinorityTag';
import KeywordTag from './KeywordTag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: space-evenly;
   padding: 0px;
   margin: 12px;
   min-height: 140px;
   text-align: left;
`;

const TagRow = styled.div`
   display: flex;
   align-items: row;
`;

const Text = styled.p`
   width: 100%;
   font-size: 1.15em;
   margin-bottom: 5px;
`;

const Title = styled.h2`
   font-size: 2.3em;
   margin: 0px;
   margin-right: 10px;
   font-weight: 700;
   font-family: Comfortaa, sans-serif;
`;

const StyledStarRating = styled(StarRating)`
   margin-top: 5px;
   margin-bottom: 5px;
   font-size: 1.3em;
`;

const ReviewLabel = styled.p`
   font-weight: 600;
   margin: 0px;
   margin-left: 5px;
   align-self: center;
   font-size: 1.3em;

   &:hover {
      text-decoration: underline;
      cursor: pointer;
   }
`;

const StyledKeywordTag = styled(KeywordTag)`
   font-size: 1.1em;
`;

const VerifiedIcon = styled(FontAwesomeIcon)`
   vertical-align: middle;
`;

interface BusinessHeaderProps extends React.HTMLProps<HTMLDivElement> {
   name: string;
   description: string;
   stars: number;
   minorityTags: string[];
   keywordTags: string[];
   verified: boolean;
   numReviews: number;
}

const BusinessHeader: React.FC<BusinessHeaderProps> = (props) => {
   return (
      <Container className={props.className}>
         <TagRow>
            <Title>
               {props.name}{' '}
               {props.verified ? (
                  <VerifiedIcon icon={faCheckSquare} color="#72D3FC" />
               ) : null}
            </Title>
            {props.minorityTags.map((tag, index) => (
               <MinorityTag key={index} name={tag} />
            ))}
         </TagRow>

         <TagRow>
            <StyledStarRating rating={props.stars} />
            <ReviewLabel>{props.numReviews} Reviews</ReviewLabel>
         </TagRow>

         <Text>{props.description}</Text>

         <TagRow>
            {props.keywordTags.map((tag, index) => (
               <StyledKeywordTag key={index} name={tag} />
            ))}
         </TagRow>
      </Container>
   );
};

export default BusinessHeader;
