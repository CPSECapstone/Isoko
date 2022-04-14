import React, { useState, useEffect } from 'react';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { environment } from '../environment/environment';
import styled from 'styled-components';
import device from '../../src/styles/devices';
import Review from '../components/reviews/Review';
import BusinessHeader from '../components/business/BusinessHeader';
import AboutTheOwner from '../components/business/AboutTheOwner';
import ImageCarousel from '../components/business/ImageCarousel';
import NavbarComponent from '../components/NavbarComponent';
import BusinessSidebar from '../components/business/BusinessSidebar';
import { Row, Col } from 'react-bootstrap';
import WriteReview from '../components/reviews/WriteReview';
import WriteReviewModal from '../components/reviews/WriteReviewModal';
import SortReviewsDropdown from '../components/business_dashboard/SortReviewsDropdown';
import RestrictedModal from './RestrictedModal';

const PositionedSidebar = styled(BusinessSidebar)`
   position: absolute;
   right: 30px;
   margin-top: 10px;

   @media ${device.tablet} {
      position: relative;
      left: 10px;
      bottom: 5px;
   }
`;

const StyledCol = styled(Col)`
   margin: 0px;
   padding: 0px;
`;

const StyledRow = styled(Row)`
   width: 100%;
   margin: 0px;
   padding: 0px;
`;

const Title = styled.h1`
   font-size: 2.5em;
   text-align: left;
   padding: 0em 0em 0em 0.5em;
`;

const StyledCarousel = styled(ImageCarousel)`
   width: 100%;
   margin-top: 5px;
`;

const ContainerDiv = styled.div`
   margin: 20px;
`;

const SortByContainer = styled.div`
   display: flex;
   flex-direction: row;
   align-items: center;
   padding: 0em 0em 0em 1.5em;
`;

const SortByText = styled.h3`
   margin-top: 0.7em;
   margin-right: 0.5em;
`;

const WriteReviewContainer = styled(WriteReview)`
   margin: 1em 0em 1em 1.5em;
`;

interface PreviewProps extends React.HTMLProps<HTMLDivElement> {
   showInPreview: boolean;
}

const Business: React.FC<PreviewProps> = (props) => {
   const [showWriteReviewsModal, setShowWriteReviewsModal] = useState(false);
   const [showRestrictedModal, setShowRestrictedModal] = useState(false);
   const [isLoggedIn, setIsLoggedIn] = useState(false);

   useEffect(() => {
      const userPool = new CognitoUserPool({
         UserPoolId: environment.cognitoUserPoolId,
         ClientId: environment.cognitoAppClientId,
      });
      // checks if user is logged in
      const cognitoUser = userPool.getCurrentUser();
      if (cognitoUser != null) {
         cognitoUser.getSession(function (err, result) {
            if (result) {
               setIsLoggedIn(true);
            }
         });
      }
   }, []);

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
      {
         pk: '12345678',
         sk: 'REVIEW#1645601444#randomUser3',
         reviewAuthor: 'William',
         authorUserName: 'randomUser3',
         authorProfilePicture:
            'https://srkheadshotday.com/wp-content/uploads/Herman_Man_Headshot_19G1006.jpg',
         stars: 2,
         reviewTitle: 'Mid',
         description:
            "Didn't know food could be so mid. Owner seems chill though",
         pictures: [
            'https://www.pluggedin.com/wp-content/uploads/2020/01/bobs-burgers-review-image.jpg',
         ],
         ts: 1637715559,
      },
   ];

   const [sortedReviews, setSortedReviews] = useState(
      reviewsList.sort((a, b) => b.ts - a.ts)
   );

   const sortReviews = (key) => {
      if (key === 'recent') {
         setSortedReviews([...sortedReviews.sort((a, b) => b.ts - a.ts)]);
      } else if (key === 'highestRated') {
         setSortedReviews([...sortedReviews.sort((a, b) => b.stars - a.stars)]);
      } else if (key === 'lowestRated') {
         setSortedReviews([...sortedReviews.sort((a, b) => a.stars - b.stars)]);
      }
   };

   return (
      <main>
         {props.showInPreview ? <NavbarComponent /> : null}
         <ContainerDiv>
            <StyledRow>
               <StyledCarousel
                  images={[
                     'https://www.thebossykitchen.com/wp-content/uploads/2021/05/French-fries-720x720.jpg',
                     'https://www.thecookierookie.com/wp-content/uploads/2018/04/how-to-broil-hamburgers-broiled-hamburger-recipe-7-of-9.compressed-copy.jpg',
                     'https://www.drinkstuff.com/productimg/104599_large.jpg',
                     'https://www.thebossykitchen.com/wp-content/uploads/2021/05/French-fries-720x720.jpg',
                     'https://www.thecookierookie.com/wp-content/uploads/2018/04/how-to-broil-hamburgers-broiled-hamburger-recipe-7-of-9.compressed-copy.jpg',
                     'https://www.drinkstuff.com/productimg/104599_large.jpg',
                  ]}
               />
            </StyledRow>
            <StyledRow>
               <StyledCol lg={8} md={7} xs={12}>
                  <BusinessHeader
                     name="Bob's Burgers"
                     description="Bob rallies the team to cook up some business, so he sends middle child Gene to push something or other here this is long this is long this is long this is long this is long this is long this is long this is long this is long"
                     stars={3}
                     minorityTags={['Black-Owned']}
                     keywordTags={['Burgers']}
                     verified={true}
                     numReviews={80}
                  />
                  <Title>About the Owner</Title>
                  <AboutTheOwner
                     ownerImageUrl="https://www.pluggedin.com/wp-content/uploads/2020/01/bobs-burgers-review-image.jpg"
                     content="My name is Bill and I am the proud owner of Bill’s Diner. 
         For the past 15 years I’ve been in the restuarant industry and 
         I’ve always been a proud black business owner. As a black 
         business owner some of the things I value is seving authentic 
         and delicious food to the great community here in San Luis Obispo. 
         Come on down to Bill’s Diner and don’t be afraid to say hi if 
         you see me there!"
                  />
                  {props.showInPreview ? (
                     <>
                        <Title>Ratings & Reviews</Title>
                        <div
                           onClick={() => {
                              if (isLoggedIn) {
                                 setShowWriteReviewsModal(true);
                              } else {
                                 setShowRestrictedModal(true);
                              }
                           }}
                        >
                           <WriteReviewContainer />
                        </div>
                        <SortByContainer>
                           <SortByText>Sort By: </SortByText>
                           <SortReviewsDropdown
                              sortFunction={sortReviews}
                           ></SortReviewsDropdown>
                        </SortByContainer>

                        {isLoggedIn ? (
                           <WriteReviewModal
                              show={showWriteReviewsModal}
                              handleClose={() => {
                                 setShowWriteReviewsModal(false);
                              }}
                           />
                        ) : (
                           <RestrictedModal
                              show={showRestrictedModal}
                              handleClose={() => {
                                 setShowRestrictedModal(false);
                              }}
                           />
                        )}
                        {sortedReviews.map((review, index) => (
                           <Review
                              key={index}
                              reviewerName={review.reviewAuthor}
                              reviewerImageUrl={review.authorProfilePicture}
                              stars={review.stars}
                              subject={review.reviewTitle}
                              content={review.description}
                              imageUrls={review.pictures}
                              ts={review.ts}
                           />
                        ))}
                     </>
                  ) : null}
               </StyledCol>
               <StyledCol md={4} xs={12}>
                  <PositionedSidebar
                     id="sidebar"
                     claimed={false}
                     hours={{
                        Mon: '9:00am-5:00pm',
                        Tue: '9:00am-5:00pm',
                        Fri: '9:00am-5:00pm',
                     }}
                     address="626 Broad"
                     links={[
                        {
                           title: 'Website',
                           link: 'https://isoko.com/',
                        },
                        {
                           title: 'Menu',
                           link: 'https://isoko.com/menu',
                        },
                     ]}
                  />
               </StyledCol>
            </StyledRow>
         </ContainerDiv>
      </main>
   );
};

export default Business;
