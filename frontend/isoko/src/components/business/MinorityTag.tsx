import React from 'react';
import styled from 'styled-components';

const MinorityTagContainer = styled.div`
   margin: auto 5px auto 0px;
   padding: 4px 5px;
   background-color: #f97d0b;
   color: white;
   text-align: center;
   border-radius: 4px;
`;

const StyledText = styled.p`
   font-weight: 500;
   margin-bottom: 0px;
   font-family: 'Inter', sans-serif;
   font-size: 1em;
`;

interface MinorityTagProps extends React.HTMLProps<HTMLDivElement> {
   name: string;
}

const MinorityTag: React.FC<MinorityTagProps> = (props) => {
   return (
      <MinorityTagContainer>
         <StyledText>{props.name}</StyledText>
      </MinorityTagContainer>
   );
};

export default MinorityTag;
