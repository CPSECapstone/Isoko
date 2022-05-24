import React, { useState } from 'react';
import CropModal from './Crop';
import { Row, Col, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: center;
`;

const PhotoContainer = styled.div`
   position: relative;
   max-width: 400px;
`;

const Photo = styled.img`
   position: relative;
   height: 200px;
   margin-top: 50px;
`;

const StyledButton = styled(Button)`
   position: absolute;
   border-radius: 200px;
   margin-top: 30px;
   margin-left: -15px;
`;

const Input = styled.input`
   display: none;
`;

const Label = styled.label`
   color: white;
   background-color: #f97d0b;
   margin: 15px;
   margin-top: 50px;
   padding: 15px;
   border-radius: 40px;
   font-size: 15px;
`;

interface MultiImageUploadProps extends React.HTMLProps<HTMLDivElement> {
   photos: Array<string>;
}

const MultiImageUpload: React.FC<MultiImageUploadProps> = (props) => {
   const [imageURL, setImageURL] = useState('');
   const [showCrop, setShowCrop] = useState(false);
   const [croppedImgList, setCroppedImgList] = useState(props.photos);
   const [busPreviewImg, setBusPreviewImg] = useState('');
   // console.log("bus", busPreviewImg);
   // console.log(croppedImgList[0]);
   const onImageChange = (e) => {
      setImageURL(URL.createObjectURL(e.target.files[0]));
      setShowCrop(true);
      e.target.value = '';
   };

   return (
      <div>
         <Input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={onImageChange}
         />
         <Label htmlFor="file-upload">Upload an Image</Label>
         <h2>
            These pictures will appear in the carousel at the top of your
            business page. The first picture uploaded will also appear as the
            thumbnail on the search results page.
         </h2>
         <CropModal
            show={showCrop}
            imgURL={imageURL}
            handleClose={() => {
               setShowCrop(false);
            }}
            updateCroppedList={(croppedImg) => {
               setCroppedImgList([...croppedImgList, croppedImg]);
               // setBusPreviewImg(croppedImgList[0]);
            }}
         />
         <Container>
            <Row>
               {croppedImgList.map((imageSrc, index) => (
                  <Col key={index}>
                     <PhotoContainer>
                        <div key={imageSrc} className="image">
                           <Photo src={imageSrc} />
                           <StyledButton
                              variant="secondary"
                              size="sm"
                              onClick={() =>
                                 setCroppedImgList(
                                    croppedImgList.filter((e) => e !== imageSrc)
                                 )
                              }
                           >
                              <FontAwesomeIcon icon={faTimesCircle} />
                           </StyledButton>
                        </div>
                     </PhotoContainer>
                  </Col>
               ))}
            </Row>
         </Container>
      </div>
   );
};

export default MultiImageUpload;
