import React from 'react';
import styled from 'styled-components';

const StatContainer = styled.div`
   margin: auto 5px auto 0px;
   padding: 4px 5px;
   background-color: white;
   text-align: center;
   border-radius: 4px;
   box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.25), 0px 2px 4px rgba(0, 0, 0, 0.11);
`;

const StyledText = styled.p`
   margin-bottom: 0px;
   color: #fd9e2e;
   font-weight: bold;
`;

interface BusinessStatProps extends React.HTMLProps<HTMLDivElement> {
   stat: string;
   value: number;
}

const Stat: React.FC<BusinessStatProps> = (props) => {
   return (
      <StatContainer>
         <h3>{props.stat}</h3>
         <StyledText>{props.value}</StyledText>
      </StatContainer>
   );
};

export default Stat;
