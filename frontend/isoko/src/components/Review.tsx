import React from 'react';
import styled from 'styled-components';
import { Rating } from 'react-simple-star-rating';

const ReviewContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: start;
   width: 40%;
   padding: 0.5em;
   margin: 0em 0em 1em 1em;
   border-style: solid;
   border-width: 2px;
   border-radius: 5%;
`;

const UserPhoto = styled.img`
   height: 30px;
   width: 30px;
   object-fit: cover;
   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
   border-radius: 50%;
`;

const ReviewPhoto = styled.img`
   max-width: 32.5%;
   max-height: 40%;
   object-fit: contain;
   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const ReviewPhotoContainer = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: space-evenly;
   margin-top: 1em;
   align-items: center;
`;

const UserContainer = styled.div`
   display: flex;
   align-items: center;
`;

const UserText = styled.div`
   padding: 0.5em 0em 0.5em 0.5em;
`;

const ContentText = styled.div`
   text-align: left;
`;

const StarContainer = styled.div`
   margin: -0.5em 0em 0em 0em;
`;

interface ReviewProps extends React.HTMLProps<HTMLDivElement> {
   reviewerName: string;
   reviewerImageUrl: string;
   stars: number;
   subject?: string;
   content?: string;
   imageUrls?: string[];
}

const Review = (props: ReviewProps) => {
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
         </StarContainer>
         {props.content ? (
            <ContentText>{props.content}</ContentText>
         ) : (
            <br></br>
         )}
         {props.imageUrls ? (
            <ReviewPhotoContainer>
               {props.imageUrls.map((photo, index) => (
                  <ReviewPhoto key={index} src={photo}></ReviewPhoto>
               ))}
            </ReviewPhotoContainer>
         ) : null}
      </ReviewContainer>
   );
};

export default Review;
