import React from 'react';
import styled from 'styled-components';
import { Rating } from 'react-simple-star-rating';
import { Container, Row, Col } from 'react-bootstrap';
import MinorityTag from './MinorityTag';
import KeywordTag from './KeywordTag';

const BusinessContainer = styled(Container)`
   display: flex;
   justify-content: flex-start;
   width: 100%;
   height: 148px;
   background-color: #fff;
   border: 1px solid #cecece;
   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
   border-radius: 3px;
   margin-bottom: 3%;
`;

const Photo = styled.img`
   display: flex;
   justify-self: flex-start;
   height: 120px;
   width: 120px;
   border-radius: 3px;
   object-fit: cover;
   border: 1px solid #cecece;
   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const TagRow = styled(Row)`
   display: flex;
   flex-direction: row;
   flex-shrink: 1;
   justify-content: flex-start;
   padding-left: 0.75em;
   margin-bottom: 0px !important;
`;

const TextRow = styled(Row)`
   overflow: hidden;
   whitespace: nowrap;
   text-overflow: ellipsis;
`;

const Text = styled.div`
   font-size: 0.75rem;
   padding-bottom: 0.2em;
   overflow: hidden;
   white-space: nowrap;
   text-overflow: ellipsis;
`;

const TitleRow = styled(Row)`
   margin-bottom: 0px;
`;

const TitleCol = styled(Col)`
   display: flex;
   justify-content: flex-start;
   padding-top: 1em;
   padding-left: 0.75em;
   margin-bottom: 0%;
`;

const Title = styled.h2`
   align-self: left;
   font-size: 1rem;
`;

const StarDiv = styled.div`
   display: flex;
   justify-self: left;
   flex-shrink: 1;
   padding-top: 0.25em;
   padding-bottom: 0.1em;
`;

const PhotoCol = styled(Col)`
   padding: 0.75rem;
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
         <Row>
            <PhotoCol>
               <Photo src={rest.imageUrl} />
            </PhotoCol>
            <Col>
               <TitleRow>
                  <TitleCol>
                     <Title>{rest.name}</Title>
                  </TitleCol>
               </TitleRow>
               <TagRow>
                  {rest.minorityTags.map((tag, index) => (
                     <MinorityTag key={index} name={tag} />
                  ))}
               </TagRow>
               <Row>
                  <StarDiv>
                     <Rating
                        allowHalfIcon={true}
                        readonly={true}
                        fillColor={'#FD9E2E'}
                        size={15}
                        initialValue={rest.stars}
                     />
                  </StarDiv>
               </Row>
               <TextRow className="overflow-scroll">
                  <Text>{rest.description}</Text>
               </TextRow>
               <TagRow>
                  {rest.keywordTags.map((tag, index) => (
                     <KeywordTag key={index} name={tag} />
                  ))}
               </TagRow>
            </Col>
         </Row>
      </BusinessContainer>
   );
};

export default BusinessPreview;
