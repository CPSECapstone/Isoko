import React from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import styled from 'styled-components';

const KeywordTagContainer = styled.div`
   padding: 3px;
   background-color: #dcdcdc;
   text-align: center;
   border-radius: 5px;
   margin-right: 5px;
`;

const StyledText = styled.p`
   font-weight: 500;
   margin-bottom: 0px;
   font-family: 'Inter', sans-serif;
   font-size: 0.8em;
`;

interface KeywordTagProps extends React.HTMLProps<HTMLDivElement> {
   name: string;
}

const KeywordTag: React.FC<KeywordTagProps> = (props) => {
   return (
      <KeywordTagContainer className={props.className}>
         <StyledText>{props.name}</StyledText>
      </KeywordTagContainer>
   );
};

export default KeywordTag;
