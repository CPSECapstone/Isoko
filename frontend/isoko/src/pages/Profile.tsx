import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import Review from '../components/reviews/Review';
import NavbarComponent from '../components/NavbarComponent';
import SingleImageUpload from '../components/imageUpload/singleImageUpoad';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ProfileInfo = styled.div`
   display: flex;
   flex-direction: column;
   margin-top: 1.25em;
`;

const ReviewsTitle = styled.h2`
   text-align: left;
   margin-bottom: 1em;
   margin-top: 0.7em;
   font-size: 1.5rem;
`;

const PageTitle = styled.h1`
   margin-top: 1em;
   font-size: 1.7rem;
`;

const UserName = styled.h2`
   font-size: 1.5rem;
`;

const NumReviews = styled.h2`
   font-size: 1rem;
   margin-left: 15px;
`;

const ReviewIcon = styled(FontAwesomeIcon)`
   margin-left: 15px;
   margin-bottom: 10px;
   font-size: 2.2em;
`;

const PageContainer = styled.div`
   border: 1px solid darkgrey;
   border-radius: 10px;
   margin-left: 100px;
   margin-right: 100px;
`;

const ReviewsHeader = styled.div`
   display: flex;
   flex-direction: row;
   align-items: center;
`;
const StyledDiv2 = styled.div`
   margin: 0 auto;
   width: 200px;
`;

const StyledDiv3 = styled.div`
   margin-right: 20px;
`;

interface PhotoProps extends React.HTMLProps<HTMLDivElement> {
   ownerPhoto?: string;
}

const Profile: React.FC<PhotoProps> = (props) => {
   const reviewsList = [
      {
         pk: '12345678',
         sk: 'REVIEW#1645601555#randomUser',
         reviewAuthor: 'Christina',
         authorUserName: 'randomUser',
         authorProfilePicture:
            'https://www.unh.edu/unhtoday/sites/default/files/styles/article_huge/public/article/2019/professional_woman_headshot.jpg?itok=3itzxHXh',
         stars: 4,
         reviewTitle: 'Great',
         description: 'Was pretty good. Could have better service',
         pictures: [
            'https://images.unsplash.com/photo-1587410131477-f01b22c59e1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dGFsbCUyMHRvd2VyfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
            'https://www.pluggedin.com/wp-content/uploads/2020/01/bobs-burgers-review-image.jpg',
            'https://www.robin-noorda.com/uploads/1/6/8/3/16830688/3347022_orig.jpg',
         ],
         ts: 1645923559,
      },
      {
         pk: '12345678',
         sk: 'REVIEW#1645601222#randomUser2',
         reviewAuthor: 'Jerry',
         authorUserName: 'randomUser2',
         authorProfilePicture:
            'https://d5t4h5a9.rocketcdn.me/wp-content/uploads/2021/04/Website-Photo-18.png',
         stars: 3,
         reviewTitle: 'Okay',
         description: 'Wanted more food.',
         pictures: [
            'https://www.pluggedin.com/wp-content/uploads/2020/01/bobs-burgers-review-image.jpg',
            'https://static3.srcdn.com/wordpress/wp-content/uploads/2020/02/Arrested-Development-Banana-Stand.jpg',
         ],
         ts: 1631235559,
      },
   ];

   return (
      <main>
         <NavbarComponent />
         <PageTitle>User Profile</PageTitle>
         <PageContainer>
            <Row>
               <Col xl={3} lg={4}>
                  <ProfileInfo>
                     <UserName>Eric Koston</UserName>
                     <StyledDiv2>
                        <SingleImageUpload
                           initialImage={props.ownerPhoto}
                        ></SingleImageUpload>
                     </StyledDiv2>
                  </ProfileInfo>
               </Col>
               <Col lg={8}>
                  <div>
                     <ReviewsHeader>
                        <ReviewsTitle>Your Reviews</ReviewsTitle>
                        <ReviewIcon icon={faComment} color="#72D3FC" />
                        <NumReviews>23 Reviews</NumReviews>
                     </ReviewsHeader>
                     <StyledDiv3>
                        {reviewsList.map((review, index) => (
                           <Row key={index}>
                              <Review
                                 name={"Jeanie's Bonchon"}
                                 reviewerImageUrl={review.authorProfilePicture}
                                 stars={review.stars}
                                 subject={review.reviewTitle}
                                 content={review.description}
                                 imageUrls={review.pictures}
                                 ts={review.ts}
                              />
                           </Row>
                        ))}
                     </StyledDiv3>
                  </div>
               </Col>
            </Row>
         </PageContainer>
      </main>
   );
};

export default Profile;
