import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const AddTagContainer = styled.div`
   display: flex;
   align-items: flex-row;
   padding: 4px 5px 4px 5px;
   background-color: #fff;
   color: black;
   text-align: center;
   border-radius: 4px;
   box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.25), 0px 2px 4px rgba(0, 0, 0, 0.11);
   cursor: pointer;
`;

const StyledText = styled.p`
   font-weight: 500;
   margin-bottom: 0px;
   margin-left: 5px;
   font-family: 'Inter', sans-serif;
   font-size: 1em;
`;

const AddTag: React.FC = () => {
   return (
      <AddTagContainer>
         <div>
            <FontAwesomeIcon icon={faPlus} color="#000" />
         </div>
         <StyledText>Add Tags</StyledText>
      </AddTagContainer>
   );
};

export default AddTag;
