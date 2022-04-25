import React from 'react';
import Business from '../../components/business/Business';
import styled from 'styled-components';
import { Business as BusinessType } from '../../types/GlobalTypes';

const Container = styled.div`
   position: relative;
   width: 70%;
   border-radius: 20px;
   box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.5);
   padding: 20px 20px 130px 20px;
   margin-left: 25em;
   margin-bottom: 25px;
   margin-top: 25px;
`;

interface PreviewProps extends React.HTMLProps<HTMLDivElement> {
   businessDetails: BusinessType;
}

const Preview: React.FC<PreviewProps> = (props) => {
   return (
      <main>
         <Container>
            <Business
               showInPreview={false}
               businessDetails={props.businessDetails}
            ></Business>
         </Container>
      </main>
   );
};

export default Preview;
