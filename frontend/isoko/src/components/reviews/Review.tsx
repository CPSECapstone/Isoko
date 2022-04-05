import React from 'react';
import styled from 'styled-components';
import { Rating } from 'react-simple-star-rating';
import ImageCarousel from '../business/ImageCarousel';
import moment from 'moment';

const ReviewContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: start;
   padding: 0.5em;
   margin: 0em 0em 1em 1em;
   border-left: 2px solid #999999;
`;

interface ReviewPhotoProps {
   maxWidth?: number;
}

const ReviewPhoto = styled.img<ReviewPhotoProps>`
   max-height: 200px;
   max-width: ${(props) => `${props.maxWidth}%`};
   object-fit: contain;
   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
   margin: 0px 7px 0px 0px;
`;

const ReviewPhotoContainer = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: start;
   margin-top: 1em;
   align-items: center;
`;

const UserPhoto = styled.img`
   height: 30px;
   width: 30px;
   object-fit: cover;
   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
   border-radius: 50%;
`;

const UserContainer = styled.div`
   display: flex;
   align-items: center;
   margin-bottom: 7px;
`;

const UserText = styled.div`
   padding: 0.5em 0em 0.5em 0.5em;
`;

const ContentText = styled.div`
   text-align: left;
`;

const StarContainer = styled.div`
   margin: -0.6em 0em 0em 0em;
   display: flex;
   align-items: center;
`;

const ReviewDateText = styled.div`
   color: #a7a8a8;
   padding: 0.3em 0em 0em 0.4em;
`;

const StyledCarousel = styled(ImageCarousel)`
   width: 100%;
   margin-top: 1em;
`;

interface ReviewProps extends React.HTMLProps<HTMLDivElement> {
   reviewerName: string;
   reviewerImageUrl: string;
   stars: number;
   subject?: string;
   content?: string;
   imageUrls?: string[];
   ts: number;
}

const Review: React.FC<ReviewProps> = (props: ReviewProps) => {
   let images = props.imageUrls;
   if (images == null) {
      images = [];
   }
   const reviewDate = new Date(props.ts * 1000);
   const formattedReviewDate = moment(reviewDate).format('MM/DD/YYYY');
   return (
      <ReviewContainer className={props.className}>
         <UserContainer>
            <UserPhoto src={props.reviewerImageUrl} />
            <UserText> {props.reviewerName} </UserText>
         </UserContainer>
         {props.subject ? <h3>{props.subject}</h3> : <br></br>}
         <StarContainer>
            <Rating
               allowHalfIcon={true}
               readonly={true}
               fillColor={'#FD9E2E'}
               size={15}
               initialValue={props.stars}
               ratingValue={0}
            />
            <ReviewDateText>{formattedReviewDate}</ReviewDateText>
         </StarContainer>
         {props.content ? (
            <ContentText>{props.content}</ContentText>
         ) : (
            <br></br>
         )}
         {images.length >= 3 ? (
            <StyledCarousel maxHeight={200} images={images}></StyledCarousel>
         ) : (
            <ReviewPhotoContainer>
               {images.map((photo, index) => (
                  <ReviewPhoto
                     maxWidth={images.length === 2 ? 48 : 75}
                     key={index}
                     src={photo}
                  ></ReviewPhoto>
               ))}
            </ReviewPhotoContainer>
         )}
      </ReviewContainer>
   );
};

export default Review;
