import React from 'react';
import MultiImageUpload from '../../components/imageUpload/multiImageUpload';
import SingleImageUpload from '../../components/imageUpload/singleImageUpoad';

const Photos: React.FC = () => (
   <main>
      <SingleImageUpload></SingleImageUpload>
      <MultiImageUpload></MultiImageUpload>
   </main>
);

export default Photos;
