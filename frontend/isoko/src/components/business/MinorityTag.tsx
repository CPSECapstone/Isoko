import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

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

const IconWrapper = styled.div`
   margin-left: 4px;
`;
const StyledWrapper = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: space-between;
`;

interface MinorityTagProps extends React.HTMLProps<HTMLDivElement> {
   name: string;
   mutable: boolean;
}

const MinorityTag: React.FC<MinorityTagProps> = (props) => {
   return (
      <MinorityTagContainer>
         <StyledWrapper>
            <StyledText>{props.name}</StyledText>
            <IconWrapper>
               {props.mutable ? (
                  <FontAwesomeIcon icon={faTimes} color="#fff" />
               ) : null}
            </IconWrapper>
         </StyledWrapper>
      </MinorityTagContainer>
   );
};

export default MinorityTag;
