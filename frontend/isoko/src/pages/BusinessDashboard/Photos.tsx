import React from 'react';
import MultiImageUpload from '../../components/imageUpload/multiImageUpload';
import SingleImageUpload from '../../components/imageUpload/singleImageUpoad';

interface PhotoProps extends React.HTMLProps<HTMLDivElement> {
   ownerPhoto?: string;
   photos: Array<string>;
}

const Photos: React.FC<PhotoProps> = (props) => (
   <main>
      <SingleImageUpload initialImage={props.ownerPhoto}></SingleImageUpload>
      <MultiImageUpload photos={props.photos}></MultiImageUpload>
   </main>
);

export default Photos;
