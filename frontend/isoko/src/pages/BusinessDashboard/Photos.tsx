import React from 'react';
import styled from 'styled-components';
import MultiImageUpload from '../../components/imageUpload/multiImageUpload';
import SingleImageUpload from '../../components/imageUpload/singleImageUpoad';

const Container = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: center;
   margin-top: 8%;
`;

interface PhotoProps extends React.HTMLProps<HTMLDivElement> {
   ownerPhoto?: string;
   photos: Array<string>;
}

const Photos: React.FC<PhotoProps> = (props) => (
   <main>
      <Container>
         <SingleImageUpload
            initialImage={props.ownerPhoto}
            label={'This picture will appear in the About the Owner section'}
         ></SingleImageUpload>
      </Container>
      <MultiImageUpload photos={props.photos}></MultiImageUpload>
   </main>
);

export default Photos;
