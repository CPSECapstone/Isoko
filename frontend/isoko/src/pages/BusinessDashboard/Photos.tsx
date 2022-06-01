import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import MultiImageUpload from '../../components/imageUpload/multiImageUpload';
import SingleImageUpload from '../../components/imageUpload/singleImageUpoad';
import StyledButton from '../../styles/StyledButton';
import { updateBusinessDetailsAsync } from '../../features/dashboard/DashboardSlice';
import { useAppDispatch } from '../../app/hooks';

const Container = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: center;
   margin-top: 8%;
`;

const WideButton = styled(StyledButton)`
   width: 120px;
   border-radius: 10px;
   border: none;
   height: 32px;
   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

interface PhotoProps extends React.HTMLProps<HTMLDivElement> {
   ownerPhoto?: string;
   photos: Array<string>;
   businessId: string;
}

const Photos: React.FC<PhotoProps> = (props) => {
   const [photosState, setPhotosState] = useState<Array<string>>(props.photos);
   const [imageState, setImageState] = useState(
      props.ownerPhoto
         ? props.ownerPhoto
         : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'
   );
   const dispatch = useAppDispatch();

   const hashCode = (s) =>
      s.split('').reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0);

   const getPermUrls = async (url: string) => {
      if (
         url.startsWith(
            'https://image-bucket-isoko.s3.us-west-2.amazonaws.com/'
         )
      ) {
         return url;
      }

      const photoId = hashCode(url).toString();
      const getResponse = await axios.get(
         `https://xyalrvt8gb.execute-api.us-west-2.amazonaws.com/Prod/photos/${photoId}`
      );
      const uploadURL = getResponse.data.uploadURL;
      const arrayBuffer = await (await fetch(url)).arrayBuffer();
      const blobData = new Blob([new Uint8Array(arrayBuffer)], {
         type: 'image/jpeg',
      });

      await fetch(uploadURL, {
         method: 'PUT',
         body: blobData,
      });

      const permUrl =
         'https://image-bucket-isoko.s3.us-west-2.amazonaws.com/' +
         photoId +
         '.jpg';
      // setPermURLS([...permURLS, permUrl]);
      return permUrl;
   };

   const updatePhotos = async () => {
      const photoPromises = photosState.map(getPermUrls);
      const permanentURLS = await Promise.all(photoPromises);
      const aboutOwnerPic = await getPermUrls(imageState);

      dispatch(
         updateBusinessDetailsAsync({
            businessId: props.businessId,
            photos: permanentURLS,
            aboutOwner: {
               photo: aboutOwnerPic,
            },
         })
      );
   };

   return (
      <main>
         <WideButton
            //permanent urls for endpoint
            primary
            onClick={(e) => {
               updatePhotos();
            }}
         >
            Submit
         </WideButton>
         <Container>
            <SingleImageUpload
               initialImage={imageState}
               label={'This picture will appear in the About the Owner section'}
               changeImageState={setImageState}
            ></SingleImageUpload>
         </Container>
         <MultiImageUpload
            photos={photosState}
            changePhotosState={setPhotosState}
         ></MultiImageUpload>
      </main>
   );
};

export default Photos;
