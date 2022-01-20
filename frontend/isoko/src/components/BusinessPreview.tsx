import React from 'react';
import styled from 'styled-components';
import { Rating } from 'react-simple-star-rating';
import { Table } from 'react-bootstrap';
import MinorityTag from './MinorityTag';
import KeywordTag from './KeywordTag';

const BusinessContainer = styled(Table)`
   display: flex;
   flex-grow: 1;
   flex-shrink: 1;
   width: 100%;
   height: 148px;
   background-color: #fff;
   border: 1px solid #cecece;
   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
   border-radius: 3px;
   min-height: 20vh;
   min-width: 60vh;
   margin-bottom: 3%;
`;

const Photo = styled.img`
   height: 120px;
   width: 120px;
   border-radius: 3px;
   object-fit: cover;
   border: 1px solid #cecece;
   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const RightContainer = styled(Table)`
   justify-content: flex-start;
   display: flex;
   flex-grow: 1;
   flex-direction: column;
   padding-left: 0.25em;
`;

const Text = styled.div`
   font-size: 0.75rem;
   display: inline-block;
   padding-bottom: 0.5em;
   overflow: hidden;
   white-space: nowrap;
   text-overflow: ellipsis;
`;

const Title = styled.h2`
   align-self: left;
   font-size: 1rem;
   margin: auto;
   margin-block-start: 0em;
   margin-block-end: 0em;
   padding-bottom: 0.25em;
`;

const StarContainer = styled.div`
   justify-self: left;
   flex-shrink: 1;
   padding-top: 0.5em;
`;

const TableRow = styled.tr`
   white-space: nowrap;
   width: 1%;
`;

const TableData = styled.td`
   word-wrap: break-word;
   white-space: nowrap;
   text-overflow: ellipsis;
`;

const PictureData = styled.td`
   padding: 0.5rem;
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
      <BusinessContainer>
         <tbody>
            <TableRow>
               <PictureData>
                  <Photo src={rest.imageUrl} />
               </PictureData>
               <TableData>
                  <RightContainer>
                     <TableRow>
                        <TableData>
                           <Title>{rest.name}</Title>{' '}
                        </TableData>
                     </TableRow>
                     <TableRow>
                        {rest.minorityTags.map((tag, index) => (
                           <MinorityTag key={index} name={tag} />
                        ))}
                     </TableRow>
                     <TableRow>
                        <TableData>
                           <StarContainer>
                              <Rating
                                 allowHalfIcon={true}
                                 readonly={true}
                                 fillColor={'#FD9E2E'}
                                 size={15}
                                 initialValue={rest.stars}
                              />
                           </StarContainer>
                        </TableData>
                     </TableRow>
                     <TableRow>
                        <TableData>
                           <Text>{rest.description}</Text>
                        </TableData>
                     </TableRow>
                     <TableRow>
                        {rest.keywordTags.map((tag, index) => (
                           <KeywordTag key={index} name={tag} />
                        ))}
                     </TableRow>
                  </RightContainer>
               </TableData>
            </TableRow>
         </tbody>
      </BusinessContainer>
   );
};

export default BusinessPreview;
