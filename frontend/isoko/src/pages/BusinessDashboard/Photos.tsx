import React from 'react';
import MultiImageUpload from '../../components/imageUpload/multiImageUpload';
import SingleImageUpload from '../../components/imageUpload/singleImageUpoad';

const Photos: React.FC = () => (
   <main>
      <h1>Business Dashboard Photos</h1>
      {/* <MultiImageUpload></MultiImageUpload> */}
      <SingleImageUpload></SingleImageUpload>
   </main>
);

export default Photos;
