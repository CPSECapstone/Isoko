import React from 'react';
import styled from 'styled-components';
import { Rating } from 'react-simple-star-rating';
import { Container, Row, Col } from 'react-bootstrap';
import MinorityTag from './MinorityTag';
import KeywordTag from './KeywordTag';

const BusinessContainer = styled(Container)`
   display: flex;
   flex-direction: row;
   justify-content: flex-start;
   text-align: left;
   align-self: left;
   width: 100%;
   min-width: 100%;
   min-height: 148px;
   background-color: #fff;
   border: 1px solid #cecece;
   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
   border-radius: 3px;
   margin-bottom: 3%;
`;

const ContentContainer = styled.div`
   text-align: left;
   align-self: left;
   flex-direction: column;
   justify-content: flex-start;
   position: relative;
   padding: 0px;
   margin: 12px;
`;

const Photo = styled.img`
   margin: 0.75rem;
   max-height: 130px;
   max-width: 130px;
   min-height: 130px;
   min-width: 130px;
   top: 0;
   bottom: 0;
   margin: auto 0;
   border-radius: 3px;
   object-fit: cover;
   border: 1px solid #cecece;
   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const TagRow = styled(Row)`
   justify-content: flex-start;
   padding-left: 0.75em;
   margin-bottom: 0px !important;
`;

const Text = styled.p`
   width: 100%;
   font-size: 0.75rem;
   padding-bottom: 0.2em;
   text-overflow: ellipsis;
`;

const Title = styled.h2`
   align-self: left;
   font-size: 1rem;
   margin: 0px;
`;

const StarDiv = styled.div`
   flex-shrink: 1;
   padding-top: 0.25em;
   padding-bottom: 0.1em;
`;

const PhotoCol = styled(Col)`
   align-self: left;
`;

interface BusinessPreviewProps extends React.HTMLProps<HTMLDivElement> {
   type: 'B&M' | 'Online';
   name: string;
   imageUrl: string;
   description: string;
   stars: number;
   minorityTags: string[];
   keywordTags: string[];
}

const BusinessPreview = ({
   children,
   type = 'B&M',
   ...rest
}: BusinessPreviewProps) => {
   return (
      <BusinessContainer className="fluid overflow-auto">
         <Photo src={rest.imageUrl} />
         <ContentContainer>
            <Title>{rest.name}</Title>
            <TagRow>
               {rest.minorityTags.map((tag, index) => (
                  <MinorityTag key={index} name={tag} />
               ))}
            </TagRow>
            <StarDiv>
               <Rating
                  allowHalfIcon={true}
                  readonly={true}
                  fillColor={'#FD9E2E'}
                  size={15}
                  initialValue={rest.stars}
               />
            </StarDiv>
            <Text>{rest.description}</Text>
            <TagRow>
               {rest.keywordTags.map((tag, index) => (
                  <KeywordTag key={index} name={tag} />
               ))}
            </TagRow>
         </ContentContainer>
      </BusinessContainer>
   );
};

export default BusinessPreview;
