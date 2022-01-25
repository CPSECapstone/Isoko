import React from 'react';
import styled from 'styled-components';
import { Col } from 'react-bootstrap';

const KeywordTagContainer = styled(Col)`
   margin: auto 5px auto 0px;
   padding: 1px;
   background-color: #dcdcdc;
   text-align: center;
   border-radius: 4px;
   max-width: 130px;
`;

interface KeywordTagProps extends React.HTMLProps<HTMLDivElement> {
   name: string;
}

const KeywordTag = ({ ...rest }: KeywordTagProps) => {
   return <KeywordTagContainer>{rest.name}</KeywordTagContainer>;
};

export default KeywordTag;
