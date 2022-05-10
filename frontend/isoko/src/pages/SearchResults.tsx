import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import BusinessPreview from '../components/business/BusinessPreview';
import MinorityTag from '../components/business/MinorityTag';
import AddTag from '../components/search/AddTag';
import SortResultsDropdown from '../components/search/SortResultsDropdown';
import AddTagModal from '../components/search/AddTagModal';
import { Form, Container, Row, Col } from 'react-bootstrap';
import moment from 'moment-timezone';
import { useAppSelector } from '../app/hooks';
import { BusinessPreview as BusinessPreviewType } from '../types/GlobalTypes';
import { SpinnerCircularFixed } from 'spinners-react';
import { useAppDispatch } from '../app/hooks';
import {
   removeMinorityTag,
   setMinorityTags,
   getSearchResultsAsync,
} from '../features/business/SearchResultsSlice';
import { getSearchParams } from '../features/business/SearchResultsAPI';

const Sidebar = styled.div`
   padding: 0.2rem;
`;

const StyledH2 = styled.h2`
   display: flex;
   align-self: left;
   font-size: 1.2rem;
`;

const StyledH3 = styled.h3`
   display: flex;
   align-self: left;
   font-size: 0.9rem;
`;

const SidebarContainer = styled.div`
   display: flex;
   flex-shrink: 1;
   align-self: left;
   margin-bottom: 10px;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const ResultsRow = styled(Row)`
   animation: ${fadeIn} 0.5s linear;
`;

const StyledSpinner = styled(SpinnerCircularFixed)`
   position: absolute;
   top: 50%;
   left: 50%;

   animation: ${fadeIn} 0.5s linear;
`;

const ResultsContainer = styled.div`
   display: flex;
   flex-direction: column;
   flex-grow: 1;
`;

const StyledBusinessPreview = styled(BusinessPreview)`
   margin-bottom: 15px;
`;

const LeftDiv = styled.div`
   display: flex;
   justify-content: left;
`;
const SearchContainer = styled(Container)`
   margin-top: 25px;
`;

const TagContainer = styled(Container)`
   padding: 5px;
   margin: 8px;
`;

const SelectedTagRow = styled(Row)`
   margin-bottom: 5px;
   max-width: 200px;
`;

const AddTagCol = styled(Col)`
   padding-left: 0px;
`;

const SearchResults: React.FC = () => {
   const time = moment().format('llll');
   const [showModal, setShowModal] = useState(false);
   const searchResultsStore = useAppSelector((store) => store.searchResults);

   const dispatch = useAppDispatch();

   // filtered business results stored separately so they can be reverted if user unchecks the box
   const [filteredBusinesses, setFilteredBusinesses] = useState<
      Array<BusinessPreviewType>
   >(searchResultsStore.businesses);

   useEffect(() => {
      setFilteredBusinesses(searchResultsStore.businesses);
   }, [searchResultsStore.businesses]);

   const dayOfWeek = () => {
      const dateComponents = time.split(',');
      return dateComponents[0];
   };

   const displayTime = () => {
      return moment(time, 'llll').format('h:mm A');
   };

   const filterByTime = (business, day) => {
      // business doesn't have hours listed
      if (Object.keys(business.hours).length === 0) {
         return false;
      }
      const timestring = business.hours[day];

      if (timestring === 'Closed') {
         return false;
      }

      const splitstring = timestring.split(' - ');

      const openString =
         splitstring[0].substring(0, splitstring[0].length - 2) +
         ' ' +
         splitstring[0].slice(-2);

      const closedString =
         splitstring[1].substring(0, splitstring[1].length - 2) +
         ' ' +
         splitstring[1].slice(-2);
      const open = moment(openString, 'h:mm a');
      const closed = moment(closedString, 'h:mm a');

      const now = moment(time, 'h:mm a');

      if (now.isAfter(open) && now.isBefore(closed)) {
         return true;
      }

      return false;
   };

   // filter businesses based on time
   const filterBusinessesByTime = (e, businesses) => {
      const day = dayOfWeek();
      // filter by time if box is checked, if unchecked, revert to original results
      if (e.target.checked) {
         setFilteredBusinesses(businesses.filter((b) => filterByTime(b, day)));
      } else {
         setFilteredBusinesses(searchResultsStore.businesses);
      }
   };

   // Re-search the database when a user removes a tag
   const removeTag = (key) => {
      if (key === 'Any Minority Owned') {
         alert(
            'Searching by no tags is equivalent to searching by "Any Minority Owned"'
         );
      } else {
         dispatch(removeMinorityTag(key));
         dispatch(
            getSearchResultsAsync(
               getSearchParams(
                  searchResultsStore.location,
                  searchResultsStore.minorityTags
                     .filter((tag) => tag.selected && tag.text !== key)
                     .map((tag) => tag.text),
                  searchResultsStore.searchTerm
               )
            )
         );
      }
   };

   // sort businesses by value of sort dropdown
   const sortBusinesses = (key) => {
      const sorted = [...filteredBusinesses];

      if (key === 'reviews') {
         sorted.sort((a, b) => b.numReviews - a.numReviews);
      } else if (key === 'recent') {
         sorted.sort((a, b) => a.timestamp - b.timestamp);
      } else if (key === 'rating') {
         sorted.sort((a, b) => b.rating - a.rating);
      }

      setFilteredBusinesses(sorted);
   };

   // Called when a user clicks confirm on Add Tag Modal
   // Requeries with new selected tags and updates store with newly selected tags
   const applyNewTags = (newTags) => {
      dispatch(
         getSearchResultsAsync(
            getSearchParams(
               searchResultsStore.location,
               newTags,
               searchResultsStore.searchTerm
            )
         )
      );
      dispatch(setMinorityTags(newTags));
      setShowModal(false);
   };

   return (
      <SearchContainer>
         <Row>
            <Col sm={3}>
               <Sidebar>
                  <StyledH2>Sort</StyledH2>
                  <SidebarContainer>
                     <SortResultsDropdown sortFunction={sortBusinesses} />
                  </SidebarContainer>
                  <StyledH2>Filters</StyledH2>
                  <StyledH3>Tags</StyledH3>
                  <TagContainer>
                     <Row>
                        {searchResultsStore.minorityTags.map((tag, index) =>
                           tag.selected === true ? (
                              <SelectedTagRow
                                 key={index}
                                 onClick={() => removeTag(tag.text)}
                              >
                                 <MinorityTag
                                    key={index}
                                    name={tag.text}
                                    mutable={true}
                                 />
                              </SelectedTagRow>
                           ) : null
                        )}
                     </Row>
                     <Row>
                        <AddTagCol className="col-auto">
                           <div
                              onClick={() => {
                                 setShowModal(true);
                              }}
                           >
                              <AddTag />
                           </div>
                           <AddTagModal
                              show={showModal}
                              tags={[...searchResultsStore.minorityTags]}
                              handleClose={() => {
                                 setShowModal(false);
                              }}
                              applyNewTags={applyNewTags}
                           />
                        </AddTagCol>
                     </Row>
                  </TagContainer>
                  <StyledH3>Open</StyledH3>
                  <Form>
                     <LeftDiv>
                        <Form.Check
                           type="checkbox"
                           label={`Open now: ${displayTime()}`}
                           onChange={(e) => {
                              filterBusinessesByTime(e, filteredBusinesses);
                           }}
                        />
                     </LeftDiv>
                  </Form>
               </Sidebar>
            </Col>
            <Col>
               <ResultsContainer>
                  <StyledH2>
                     {searchResultsStore.searchTerm} near{' '}
                     {searchResultsStore.location}
                  </StyledH2>
                  {searchResultsStore.status === 'loading' ? (
                     <StyledSpinner thickness={125} color="#F97D0B" />
                  ) : (
                     filteredBusinesses.map((business, index) => (
                        <ResultsRow key={index}>
                           <StyledBusinessPreview
                              key={index}
                              name={business.name}
                              imageUrl={business.photo}
                              description={business.shortDesc}
                              stars={business.rating}
                              minorityTags={business.tags}
                              keywordTags={business.keywords}
                              verified={business.verified}
                              path={`/business/${business.businessId}`}
                              numReviews={business.numReviews}
                              businessId={business.businessId}
                           />
                        </ResultsRow>
                     ))
                  )}
               </ResultsContainer>
            </Col>
         </Row>
      </SearchContainer>
   );
};

export default SearchResults;
