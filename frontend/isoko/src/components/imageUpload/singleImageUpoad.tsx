import React, { useState } from 'react';
import CropModal from './Crop';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

const Container = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: center;
   margin-top: 8%;
`;

const Photo = styled.img`
   position: relative;
   height: 200px;
   margin-top: 20px;
`;

const Input = styled.input`
   display: none;
`;

const Label = styled.label`
   color: white;
   background-color: #f97d0b;
   margin: 15px;
   margin-top: 75px;
   padding: 15px;
   border-radius: 40px;
   font-size: 15px;
`;

interface ImageUploadProps extends React.HTMLProps<HTMLDivElement> {
   initialImage?: string;
}

const SingleImageUpload: React.FC<ImageUploadProps> = (props) => {
   const [imageURL, setImageURL] = useState('');
   const [showCrop, setShowCrop] = useState(false);
   const [displayImage, setdisplayImage] = useState(props.initialImage || '');

   const onImageChange = (e) => {
      setImageURL(URL.createObjectURL(e.target.files[0]));
      setShowCrop(true);
      e.target.value = '';
   };

   return (
      <Container>
         <Input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={onImageChange}
         />
         <Row>
            <Col>
               <Label htmlFor="avatar-upload">Upload a Profile Pic</Label>
               <h2>This picture will appear in the About the Owner section</h2>
            </Col>
            <CropModal
               show={showCrop}
               imgURL={imageURL}
               handleClose={() => {
                  setShowCrop(false);
               }}
               updateCroppedList={(croppedImg) => {
                  setdisplayImage(croppedImg);
               }}
            />
            <Col>
               <Photo src={displayImage} />
            </Col>
         </Row>
      </Container>
   );
};

export default SingleImageUpload;
