import React, { useState } from 'react';
import CropModal from './Crop';

const MultiImageUpload: React.FC = () => {
   const [imageURL, setImageURL] = useState('');
   console.log('image passed in:', imageURL);

   const [showCrop, setShowCrop] = useState(false);
   const [croppedImgList, setCroppedImgList] = useState([]);

   // console.log('croppedImgLis: ', croppedImgList);
   const onImageChange = (e) => {
      setImageURL(URL.createObjectURL(e.target.files[0]));
      setShowCrop(true);
   };

   const daList = [];
   const croppedImageList = (croppedImage) => {
      daList.push(croppedImage);
      // setCroppedImgList([...croppedImgList, croppedImage])
      setCroppedImgList(daList);
   };

   return (
      <div>
         <input
            type="file"
            multiple
            accept="image/*"
            onChange={onImageChange}
         />
         <CropModal
            show={showCrop}
            imgURL={imageURL}
            handleClose={() => {
               setShowCrop(false);
            }}
            cropped={croppedImageList}
         />
         {croppedImgList.map((imageSrc, index) => (
            <div key={index} className="image-item">
               <img src={imageSrc} width="300" />
            </div>
         ))}
      </div>
   );
};

export default MultiImageUpload;
