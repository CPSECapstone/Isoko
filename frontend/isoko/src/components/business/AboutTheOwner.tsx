import React from 'react';
import styled from 'styled-components';

const AboutTheOwnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    text-align: left;
    margin: 12px;
    padding: 0em 0em 0em 0.5em;
    min-height: 140px;
`;

const ContentText = styled.p`
    padding: 0.5em 0em 0.5em 2em;
    width: 100%;
`;

const Content = styled.div`
    display: flex;
    align-items: center; 
`;


const Photo = styled.img`
   height: 120px;
   width: 120px;
   margin: auto 0;
   border-radius: 5px;
   object-fit: cover;
   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

interface AboutTheOwnerProps extends React.HTMLProps<HTMLDivElement> {
    ownerImageUrl: string;
    content: string;
 }
 
 const AboutTheOwner: React.FC<AboutTheOwnerProps> = (props) => {
    return (
       <AboutTheOwnerContainer className={props.className}>
           <Content>
            <Photo src={props.ownerImageUrl}/>
            <ContentText>{props.content}</ContentText>
           </Content>
       </AboutTheOwnerContainer>
    );
 };
 
 export default AboutTheOwner;