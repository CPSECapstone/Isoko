import React, { useState } from 'react';
import CropModal from './Crop';

const SingleImageUpload: React.FC = () => {
   const [imageURL, setImageURL] = useState('');
   console.log('image passed in:', imageURL);

   const [showCrop, setShowCrop] = useState(false);
   const [croppedImgList, setCroppedImgList] = useState('');
   console.log('cropped image', croppedImgList);

   // console.log('croppedImgLis: ', croppedImgList);
   const onImageChange = (e) => {
      setImageURL(URL.createObjectURL(e.target.files[0]));
      setShowCrop(true);
   };

   //    const daList = [];
   const croppedImageList = (croppedImage) => {
      //   daList.push(croppedImage);
      // setCroppedImgList([...croppedImgList, croppedImage])
      setCroppedImgList(croppedImage);
   };

   return (
      <div>
         <input type="file" accept="image/*" onChange={onImageChange} />
         <CropModal
            show={showCrop}
            imgURL={imageURL}
            handleClose={() => {
               setShowCrop(false);
            }}
            cropped={croppedImageList}
         />
         <img src={croppedImgList} width="300" />
      </div>
   );
};

export default SingleImageUpload;
