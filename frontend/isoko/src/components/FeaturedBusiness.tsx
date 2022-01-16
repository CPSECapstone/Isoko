import React from 'react';
import styled from 'styled-components';
import { Rating } from 'react-simple-star-rating';
import { Table } from 'react-bootstrap';

const BusinessContainer = styled(Table)`
   width: 85%;
   height: 25%;
   background-color: #fff;
   border: 1px solid #cecece;
   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
   min-height: 20vh;
   min-width: 60vh;
   margin-bottom: 3%;
`;

const Photo = styled.img`
   height: 100%;
   width: 100%;
   object-fit: cover;
`;

const RightContainer = styled(Table)`
   justify-content: left;
   display: flex;
   flex-grow: 1;
   flex-direction: column;
`;

const Text = styled.div`
   font-size: 0.75rem;
   display: flex;
   flex-shrink: 1;
   padding-left: 1em;
   padding-top: 0.01em;
`;

const Title = styled.h2`
   align-self: left;
   font-size: 1rem;
   margin-right: 18px;
   margin-left: 15px;
   margin-top: 15px;
   margin: none;
   margin-block-start: 0em;
   margin-block-end: 0em;
   padding-top: 15px;
`;

const StarContainer = styled.div`
   justify-self: left;
   flex-shrink: 1;
   padding-left: 1em;
   padding-top: 0.01em;
`;

const TableRow = styled.tr`
   white-space: nowrap;
   width: 1%;
`;

const TableData = styled.td`
   white-space: nowrap;
   width: 80%;
`;

const PictureData = styled.td`
    padding: 0.5rem; 
    width: 15%
    min-width: 30vh; 
`;

interface FeaturedBusinessProps extends React.HTMLProps<HTMLDivElement> {
   type: 'B&M' | 'Online';
   name: string;
   imageUrl: string;
   description: string;
   stars: number;
}

const FeaturedBusiness = ({
   children,
   type = 'B&M',
   ...rest
}: FeaturedBusinessProps) => {
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
                  </RightContainer>
               </TableData>
            </TableRow>
         </tbody>
      </BusinessContainer>
   );
};

export default FeaturedBusiness;
