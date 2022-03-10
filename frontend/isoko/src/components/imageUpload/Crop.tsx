import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';
import Slider from '@material-ui/core/Slider';
import StButton from '../../styles/StyledButton';
import { Button, Modal } from 'react-bootstrap';
import styled from 'styled-components';

const StyledModal = styled(Modal)`
   width: 100%;
   height: 800px;
`;

interface CropProps extends React.HTMLProps<HTMLDivElement> {
   show: boolean;
   imgURL: string;
   handleClose: () => void;
}

const Crop: React.FC<CropProps> = (props) => {
   const [crop, setCrop] = useState({ x: 0, y: 0 });
   const [zoom, setZoom] = useState(1);
   const [croppedArea, setCroppedAreaPixels] = useState();

   const cropComplete = (croppedArea) => {
      setCroppedAreaPixels[croppedArea];
      // console.log(croppedArea, croppedAreaPixels)
   };

   // const cropImg = async () => {

   // }

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
               onCropComplete={cropComplete}
               onZoomChange={setZoom}
            />
            {/* <Button
                onClick={props.handleClose}>
                    Cancel
                </Button> */}
            {/* <Button
                onClick={cropImg}>
                    Crop
                </Button> */}
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
            <Button variant="primary" onClick={props.handleClose}>
               Save Changes
            </Button>
         </StyledModal.Footer>
      </StyledModal>
   );
};

export default Crop;
