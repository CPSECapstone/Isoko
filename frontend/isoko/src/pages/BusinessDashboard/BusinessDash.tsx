import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavbarComponent from '../../components/NavbarComponent';
import {
   faHome,
   faEdit,
   faComments,
   faCamera,
   faChartLine,
} from '@fortawesome/free-solid-svg-icons';
import Preview from './Preview';
import UpdateInfo from './UpdateInfo';
import Reviews from './Reviews';
import Photos from './Photos';
import Analytics from './Analytics';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { initializeBusinessDashboardAsync } from '../../features/dashboard/DashboardSlice';
import { SpinnerCircularFixed } from 'spinners-react';

const StyledCol1 = styled(Col)`
   max-width: 225px;
`;

const NavBarContainer = styled.div`
   position: fixed;
   min-width: 180px;
   border-radius: 0 20px 20px 0;
   box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.5);
   padding: 10px 10px 10px 0px;
`;

const NavDiv = styled.div`
   display: flex;
   flex-direction: row;
   border-radius: 10px;
   margin: 10px 10px 10px 20px;
   cursor: pointer;

   &:hover {
      box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
   }
`;

const IconContainer = styled.div`
   width: 32px;
   padding-left: 4px;
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
   font-size: 20px;
   margin-top: 5px;
`;

const StyledLink = styled.p`
   margin: 3px;
   margin-left: 10px;
   font-size: 1.25em;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const Content = styled(Col)`
   animation: ${fadeIn} 0.5s linear;
`;

const StyledSpinner = styled(SpinnerCircularFixed)`
   position: absolute;
   top: 50%;
   left: 50%;

   animation: ${fadeIn} 0.5s linear;
`;

const BusinessDash: React.FC = () => {
   const [activeComponent, setActiveComponent] = React.useState('Preview');

   const ownedBusinessId = useAppSelector((store) => store.profile.businessId);
   const dashboardStore = useAppSelector((store) => store.dashboard);

   const dispatch = useAppDispatch();

   useEffect(() => {
      // Don't need to worry about ownedBusinessId being undefined bc auth protections
      // Should handle that case
      dispatch(initializeBusinessDashboardAsync(ownedBusinessId));
   }, []);

   return (
      <main>
         <NavbarComponent />
         <div>
            <Row>
               <StyledCol1>
                  <NavBarContainer>
                     <NavDiv
                        onClick={() => setActiveComponent('Preview')}
                        style={{
                           outline:
                              activeComponent === 'Preview'
                                 ? '1px solid #f97d0b'
                                 : 'none',
                        }}
                     >
                        <IconContainer>
                           <StyledFontAwesomeIcon icon={faHome} color="black" />
                        </IconContainer>
                        <StyledLink>Preview </StyledLink>
                     </NavDiv>
                     <NavDiv
                        onClick={() => setActiveComponent('UpdateInfo')}
                        style={{
                           outline:
                              activeComponent === 'UpdateInfo'
                                 ? '1px solid #f97d0b'
                                 : 'none',
                        }}
                     >
                        <IconContainer>
                           <StyledFontAwesomeIcon icon={faEdit} color="black" />
                        </IconContainer>
                        <StyledLink>Update Info</StyledLink>
                     </NavDiv>
                     <NavDiv
                        onClick={() => setActiveComponent('Reviews')}
                        style={{
                           outline:
                              activeComponent === 'Reviews'
                                 ? '1px solid #f97d0b'
                                 : 'none',
                        }}
                     >
                        <IconContainer>
                           <StyledFontAwesomeIcon
                              icon={faComments}
                              color="black"
                           />
                        </IconContainer>
                        <StyledLink> Reviews</StyledLink>
                     </NavDiv>
                     <NavDiv
                        onClick={() => setActiveComponent('Photos')}
                        style={{
                           outline:
                              activeComponent === 'Photos'
                                 ? '1px solid #f97d0b'
                                 : 'none',
                        }}
                     >
                        <IconContainer>
                           <StyledFontAwesomeIcon
                              icon={faCamera}
                              color="black"
                           />
                        </IconContainer>
                        <StyledLink>Photos </StyledLink>
                     </NavDiv>
                     <NavDiv
                        onClick={() => setActiveComponent('Analytics')}
                        style={{
                           outline:
                              activeComponent === 'Analytics'
                                 ? '1px solid #f97d0b'
                                 : 'none',
                        }}
                     >
                        <IconContainer>
                           <StyledFontAwesomeIcon
                              icon={faChartLine}
                              color="black"
                           />
                        </IconContainer>
                        <StyledLink>Analytics </StyledLink>
                     </NavDiv>
                  </NavBarContainer>
               </StyledCol1>
               {dashboardStore.status === 'loading' ||
               dashboardStore.business === null ? (
                  <StyledSpinner thickness={125} color="#F97D0B" />
               ) : (
                  <Content>
                     {activeComponent === 'Preview' ? (
                        <Preview businessDetails={dashboardStore.business} />
                     ) : null}
                     {activeComponent === 'UpdateInfo' ? (
                        <UpdateInfo
                           setActiveComponent={setActiveComponent}
                           businessDetails={dashboardStore.business}
                        />
                     ) : null}
                     {activeComponent === 'Reviews' ? (
                        <Reviews reviews={dashboardStore.business.reviews} />
                     ) : null}
                     {activeComponent === 'Photos' ? (
                        <Photos
                           ownerPhoto={dashboardStore.business.aboutOwner.photo}
                           photos={dashboardStore.business.photos}
                           businessId={dashboardStore.business.businessId}
                           city={dashboardStore.business.city}
                           state={dashboardStore.business.state}
                           type={dashboardStore.business.type}
                           category={dashboardStore.business.category}
                        />
                     ) : null}
                     {activeComponent === 'Analytics' ? (
                        <Analytics
                           rating={dashboardStore.business.stars}
                           reviews={dashboardStore.business.reviews}
                        />
                     ) : null}
                  </Content>
               )}
            </Row>
         </div>
      </main>
   );
};

export default BusinessDash;
