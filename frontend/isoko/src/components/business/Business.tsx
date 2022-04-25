import React, { useState, useEffect } from 'react';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { environment } from '../../environment/environment';
import styled from 'styled-components';
import Review from '../reviews/Review';
import BusinessHeader from '../business/BusinessHeader';
import AboutTheOwner from '../business/AboutTheOwner';
import ImageCarousel from '../business/ImageCarousel';
import NavbarComponent from '../NavbarComponent';
import BusinessSidebar from './BusinessSidebar';
import { Row, Col } from 'react-bootstrap';
import WriteReview from '../reviews/WriteReview';
import WriteReviewModal from '../reviews/WriteReviewModal';
import SortReviewsDropdown from '../business_dashboard/SortReviewsDropdown';
import RestrictedModal from '../../pages/RestrictedModal';
import { Business as BusinessType } from '../../types/GlobalTypes';

const PositionedSidebar = styled(BusinessSidebar)`
   position: absolute;
   right: 30px;
   margin-top: 10px;

   @media (max-width: 1200px) {
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
   businessDetails: BusinessType;
}

const Business: React.FC<PreviewProps> = (props) => {
   const [showWriteReviewsModal, setShowWriteReviewsModal] = useState(false);
   const [showRestrictedModal, setShowRestrictedModal] = useState(false);
   const [isLoggedIn, setIsLoggedIn] = useState(false);

   const { businessDetails } = props;

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

   const reviewsList = businessDetails.reviews;

   const [sortedReviews, setSortedReviews] = useState(
      reviewsList.sort((a, b) => b.ts - a.ts)
   );

   const sortReviews = (key) => {
      if (key === 'recent') {
         setSortedReviews([...sortedReviews.sort((a, b) => b.ts - a.ts)]);
      } else if (key === 'highestRated') {
         setSortedReviews([
            ...sortedReviews.sort((a, b) => b.rating - a.rating),
         ]);
      } else if (key === 'lowestRated') {
         setSortedReviews([
            ...sortedReviews.sort((a, b) => a.rating - b.rating),
         ]);
      }
   };

   return (
      <div>
         {props.showInPreview ? <NavbarComponent /> : null}
         <ContainerDiv>
            <StyledRow>
               <StyledCarousel images={businessDetails.photos} />
            </StyledRow>
            <StyledRow>
               <StyledCol lg={12} xl={7}>
                  <BusinessHeader
                     name={businessDetails.name}
                     description={businessDetails.shortDesc}
                     stars={businessDetails.rating}
                     minorityTags={businessDetails.tags}
                     keywordTags={businessDetails.keywords}
                     verified={businessDetails.claimed}
                     numReviews={businessDetails.numReviews}
                  />
                  {businessDetails.aboutOwner ? (
                     <div>
                        <Title>About the Owner</Title>
                        <AboutTheOwner
                           ownerImageUrl={businessDetails.aboutOwner.photo}
                           content={businessDetails.aboutOwner.ownerDesc}
                        />
                     </div>
                  ) : null}

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
                              stars={review.rating}
                              subject={review.reviewTitle}
                              content={review.description}
                              imageUrls={review.pictures}
                              ts={review.ts}
                           />
                        ))}
                     </>
                  ) : null}
               </StyledCol>
               <StyledCol lg={4} md={12}>
                  <PositionedSidebar
                     id="sidebar"
                     claimed={businessDetails.claimed}
                     hours={businessDetails.hours}
                     address={businessDetails.address}
                     links={Object.keys(businessDetails.links).map(
                        (linkName) => ({
                           title: linkName,
                           link: businessDetails.links[linkName],
                        })
                     )}
                  />
               </StyledCol>
            </StyledRow>
         </ContainerDiv>
      </div>
   );
};

export default Business;
