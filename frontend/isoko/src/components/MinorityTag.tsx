import React from 'react';
import styled from 'styled-components';
import { Col } from 'react-bootstrap';

const MinorityTagContainer = styled(Col)`
   margin: auto 5px auto 0px;
   padding: 1px;
   background-color: #f97d0b;
   color: white;
   text-align: center;
   border-radius: 4px;
   max-width: 130px;
`;

interface MinorityTagProps extends React.HTMLProps<HTMLDivElement> {
   name: string;
}

const MinorityTag = ({ ...rest }: MinorityTagProps) => {
   return <MinorityTagContainer>{rest.name}</MinorityTagContainer>;
};

export default MinorityTag;
