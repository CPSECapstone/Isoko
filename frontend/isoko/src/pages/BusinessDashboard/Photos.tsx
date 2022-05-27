import React, { useState } from 'react';
import styled from 'styled-components';
import MultiImageUpload from '../../components/imageUpload/multiImageUpload';
import SingleImageUpload from '../../components/imageUpload/singleImageUpoad';
import StyledButton from '../../styles/StyledButton';

const Container = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: center;
   margin-top: 8%;
`;

const WideButton = styled(StyledButton)`
   width: 120px;
   border-radius: 10px;
   border: none;
   height: 32px;
   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

interface PhotoProps extends React.HTMLProps<HTMLDivElement> {
   ownerPhoto?: string;
   photos: Array<string>;
}

const Photos: React.FC<PhotoProps> = (props) => {
   const [photosState, setPhotosState] = useState<Array<string>>(props.photos);
   const [imageState, setImageState] = useState(
      props.ownerPhoto
         ? props.ownerPhoto
         : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'
   );

   return (
      <main>
         <WideButton
            //permanent urls for endpoint
            primary
            onClick={(e) => {
               e.preventDefault();
               listABusiness();
            }}
         >
            Submit
         </WideButton>
         <Container>
            <SingleImageUpload
               initialImage={imageState}
               label={'This picture will appear in the About the Owner section'}
               changeImageState={setImageState}
            ></SingleImageUpload>
         </Container>
         <MultiImageUpload
            photos={photosState}
            changePhotosState={setPhotosState}
         ></MultiImageUpload>
      </main>
   );
};

export default Photos;
