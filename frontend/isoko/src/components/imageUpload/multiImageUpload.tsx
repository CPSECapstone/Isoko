import React, { useState } from 'react';
import Crop from './Crop';

const MultiImageUpload: React.FC = () => {
   const [imageURLs, setImageURLs] = useState([]);
   console.log(imageURLs);

   const [showCrop, setShowCrop] = useState(false);

   const onImageChange = (e) => {
      setImageURLs([URL.createObjectURL(e.target.files[0]), ...imageURLs]);
      // cropImg(URL.createObjectURL(e.target.files[0]))
      setShowCrop(true);
   };

   //once changes are saved from crop, add cropped img to another state list and map that
   return (
      <div>
         <input
            type="file"
            multiple
            accept="image/*"
            onChange={onImageChange}
         />

         {imageURLs.map((imageSrc, index) => (
            <div key={index} className="image-item">
               <img src={imageSrc} width="200" />
            </div>
         ))}

         <Crop
            show={showCrop}
            imgURL={imageURLs[0]}
            handleClose={() => {
               setShowCrop(false);
            }}
         />
      </div>
   );
};

export default MultiImageUpload;
