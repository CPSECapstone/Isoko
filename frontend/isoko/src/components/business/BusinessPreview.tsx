import React from 'react';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import MinorityTag from './MinorityTag';
import KeywordTag from './KeywordTag';
import StarRating from './StarRating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const BusinessContainer = styled.div`
   cursor: pointer;
   display: flex;
   flex-direction: row;
   text-align: left;
   width: 100%;
   background-color: #fff;
   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
   border-radius: 5px;
   padding: 16px 14px;
   transition: box-shadow 0.3s;

   &:hover {
      box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.25);
   }
`;

const ContentContainer = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: space-evenly;
   padding: 0px;
   margin: 12px;
   min-height: 140px;
`;

const Photo = styled.img`
   height: 140px;
   width: 140px;
   margin: auto 0;
   border-radius: 5px;
   object-fit: cover;
   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const TagRow = styled.div`
   display: flex;
   align-items: row;
`;

const Text = styled.p`
   width: 100%;
   font-size: 0.75rem;
   margin-bottom: 5px;
`;

const Title = styled.h2`
   font-size: 1.05rem;
   margin: 0px;
   margin-bottom: 3px;
   font-weight: 500;
`;

const StyledStarRating = styled(StarRating)`
   margin-top: 5px;
   margin-bottom: 5px;
`;

const ReviewLabel = styled.p`
   font-weight: 600;
   margin: 0px;
   margin-left: 5px;
   align-self: center;
`;

interface BusinessPreviewProps extends React.HTMLProps<HTMLDivElement> {
   name: string;
   imageUrl: string;
   description: string;
   stars: number;
   minorityTags: string[];
   keywordTags: string[];
   verified: boolean;
   path: string;
   numReviews: number;
}

const BusinessPreview: React.FC<BusinessPreviewProps> = (props) => {
   const navigate = useNavigate();

   return (
      <BusinessContainer
         className={props.className}
         onClick={() => {
            navigate(props.path);
         }}
      >
         <Photo src={props.imageUrl} />
         <ContentContainer>
            <Title>
               {props.name}{' '}
               {props.verified ? (
                  <FontAwesomeIcon icon={faCheckSquare} color="#72D3FC" />
               ) : null}
            </Title>

            <TagRow>
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
                  <KeywordTag key={index} name={tag} />
               ))}
            </TagRow>
         </ContentContainer>
      </BusinessContainer>
   );
};

export default BusinessPreview;
