import React from 'react';
import styled from 'styled-components';
import { Col } from 'react-bootstrap';

const KeywordTagContainer = styled(Col)`
   margin: auto 5px auto 0px;
   display: flex;
   flex-direction: row;
   align-items: center;
   padding: 2px 4px;
   background-color: #dcdcdc;
   border-radius: 4px;
   display: inline;
   max-width: 130px;
`;

interface KeywordTagProps extends React.HTMLProps<HTMLDivElement> {
   name: string;
}

const KeywordTag = ({ ...rest }: KeywordTagProps) => {
   return <KeywordTagContainer>{rest.name}</KeywordTagContainer>;
};

export default KeywordTag;
