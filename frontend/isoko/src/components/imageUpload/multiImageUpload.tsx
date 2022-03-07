import React from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import StyledButton from '../../styles/StyledButton';

const MultiImageUpload: React.FC = () => {
   const [images, setImages] = React.useState([]);
   const maxNumber = 20;

   const onChange = (
      imageList: ImageListType,
      addUpdateIndex: number[] | undefined
   ) => {
      // data for submit
      console.log(imageList, addUpdateIndex);
      setImages(imageList as never[]);
   };

   return (
      <div className="App">
         <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
         >
            {({
               imageList,
               onImageUpload,
               onImageRemoveAll,
               onImageUpdate,
               onImageRemove,
               isDragging,
               dragProps,
            }) => (
               // write your building UI
               <div className="upload__image-wrapper">
                  <StyledButton onClick={onImageUpload}>
                     Upload a Photo
                  </StyledButton>
                  &nbsp;
                  <StyledButton onClick={onImageRemoveAll}>
                     Remove all Photos
                  </StyledButton>
                  {imageList.map((image, index) => (
                     <div key={index} className="image-item">
                        <img src={image.dataURL} alt="" width="100" />
                        <div className="image-item__btn-wrapper">
                           <StyledButton onClick={() => onImageUpdate(index)}>
                              Replace
                           </StyledButton>
                           <StyledButton onClick={() => onImageRemove(index)}>
                              Remove
                           </StyledButton>
                        </div>
                     </div>
                  ))}
               </div>
            )}
         </ImageUploading>
      </div>
   );
};

export default MultiImageUpload;
