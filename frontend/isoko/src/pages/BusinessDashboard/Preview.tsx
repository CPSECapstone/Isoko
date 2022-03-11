import React, { useState } from 'react';
import Business from '../Business';
import styled from 'styled-components';

const Container = styled.div`
   position: relative;
   width: 70%;
   border-radius: 20px;
   box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.5);
   padding: 20px 20px 130px 20px;
   margin-left: 25em;
`;

const Preview: React.FC = () => {
   return (
      <main>
         <h1>Business Preview</h1>
         <Container>
            <Business showInPreview={false}></Business>
         </Container>
      </main>
   );
};

export default Preview;
