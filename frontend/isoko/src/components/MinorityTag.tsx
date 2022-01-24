import React from 'react';
import styled from 'styled-components';
import { Col } from 'react-bootstrap';

const MinorityTagContainer = styled(Col)`
   display: flex;
   flex-direction: row;
   align-items: center;
   padding: 4px 8px;
   background-color: #f97d0b;
   border-radius: 4px;
   color: white;
   display: inline;
   margin-right: 0.75em;
   max-width: 130px;
`;

interface MinorityTagProps extends React.HTMLProps<HTMLDivElement> {
   name: string;
}

const MinorityTag = ({ ...rest }: MinorityTagProps) => {
   return <MinorityTagContainer>{rest.name}</MinorityTagContainer>;
};

export default MinorityTag;
