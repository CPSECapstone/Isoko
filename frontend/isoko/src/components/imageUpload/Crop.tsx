import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import Slider from '@material-ui/core/Slider';
import { Button, Modal } from 'react-bootstrap';
import getCroppedImg from './cropImage.js';
import styled from 'styled-components';

const StyledModal = styled(Modal)`
   padding-top: 170px;

   .modal-content {
      width: 100%;
      height: 500px;
   }
`;

interface CropProps extends React.HTMLProps<HTMLDivElement> {
   show: boolean;
   imgURL: string;
   handleClose: () => void;
   updateCroppedList: (string) => void;
}

const Crop: React.FC<CropProps> = (props) => {
   const [crop, setCrop] = useState({ x: 0, y: 0 });
   const [zoom, setZoom] = useState(1);
   const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

   const onCropComplete = (croppedArea, croppedAreaPixels) => {
      setCroppedAreaPixels(croppedAreaPixels);
   };

   const saveCroppedImg = async () => {
      try {
         const croppedImage: any = await getCroppedImg(
            props.imgURL,
            croppedAreaPixels
         );

         props.updateCroppedList(croppedImage.url);
         props.handleClose();
      } catch (e) {
         console.error(e);
      }
   };

   return (
      <StyledModal show={props.show} onHide={props.handleClose}>
         <StyledModal.Header closeButton>
            <StyledModal.Title>Crop Photo</StyledModal.Title>
         </StyledModal.Header>
         <StyledModal.Body>
            <Cropper
               image={props.imgURL}
               crop={crop}
               zoom={zoom}
               aspect={1}
               onCropChange={setCrop}
               onCropComplete={onCropComplete}
               onZoomChange={setZoom}
            />
         </StyledModal.Body>
         <StyledModal.Footer>
            <Slider
               value={zoom}
               min={1}
               max={3}
               step={0.1}
               aria-labelledby="Zoom"
               onChange={(e, zoom) => {
                  setZoom(zoom as number);
               }}
            />
            <Button variant="secondary" onClick={props.handleClose}>
               Close
            </Button>
            <Button variant="primary" onClick={saveCroppedImg}>
               Save Changes
            </Button>
         </StyledModal.Footer>
      </StyledModal>
   );
};

export default Crop;
