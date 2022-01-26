import React from 'react';
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

const KeywordTag = ({ ...rest }: KeywordTagProps) => {
   return (
      <KeywordTagContainer>
         <StyledText>{rest.name}</StyledText>
      </KeywordTagContainer>
   );
};

export default KeywordTag;
