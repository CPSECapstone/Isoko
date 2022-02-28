import React, { useState } from 'react';
import styled from 'styled-components';
import BusinessPreview from '../components/business/BusinessPreview';
import MinorityTag from '../components/business/MinorityTag';
import AddTag from '../components/search/AddTag';
import SortResultsDropdown from '../components/search/SortResultsDropdown';
import AddTagModal from '../components/search/AddTagModal';
import { Form, Container, Row, Col } from 'react-bootstrap';
import moment from 'moment-timezone';
import minorityGroups from '../constants/minorityGroups';

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
const SearchContainer = styled(Container)``;

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

interface SearchResultsProps extends React.HTMLProps<HTMLDivElement> {
   category: string;
   minorityTags: string[];
   keywordTags: string[];
   location: string;
}

const SearchResults: React.FC<SearchResultsProps> = (props) => {
   const time = moment().format('llll');
   const [showModal, setShowModal] = useState(false);

   const tags = [];
   minorityGroups.forEach((t, i) => {
      let tagObject;
      if (props.minorityTags.includes(t)) {
         tagObject = {
            text: t,
            selected: true,
         };
      } else {
         tagObject = {
            text: t,
            selected: false,
         };
      }
      tags.push(tagObject);
   });

   const [tagState, setTagState] = useState(tags);

   // mock response from API
   const businessResults = [
      {
         pk: '-348372930',
         sk: 'INFO',
         name: "Bob's Burgers",
         city: 'New York',
         state: 'NY',
         street: '20 W 34th St',
         zip: '10001',
         type: 'B&M',
         tags: ['LGBTQ+ Owned'],
         category: 'Burgers',
         keywords: ['Burger'],
         shortDesc: 'We do our best',
         businessId: '-348372930',
         hours: {},
         links: {
            Menu: 'https://arresteddevelopment.fandom.com/wiki/Bluth%27s_Original_Frozen_Banana_Stand',
         },
         aboutOwner: {
            ownerName: 'Bob Belcher',
            ownerPhone: '234-234-9482',
         },
         photos: [
            'https://www.pluggedin.com/wp-content/uploads/2020/01/bobs-burgers-review-image.jpg',
         ],
         reviews: [],
         lister: 'Linda Belcher',
         verified: false,
         timestamp: 1644963725,
      },
      {
         pk: '-664125567',
         sk: 'INFO',
         name: "Bluth's Original Frozen Banana",
         city: 'Newport Beach',
         state: 'CA',
         street: '70 Newport Pier',
         zip: '92663',
         type: 'B&M',
         tags: ['Women Owned'],
         category: 'Desserts',
         keywords: ['Chocolate', 'Bananas'],
         shortDesc: "There's always money in the banana stand.",
         businessId: '-664125567',
         hours: {
            Mon: '11:00am - 11:00pm',
            Tue: '11:00am - 11:00pm',
            Wed: '11:00am - 11:00pm',
            Thu: '11:00am - 11:00pm',
            Fri: '11:00am - 11:00pm',
            Sat: '12:00pm - 8:00pm',
            Sun: 'Closed',
         },
         links: {
            Menu: 'https://arresteddevelopment.fandom.com/wiki/Bluth%27s_Original_Frozen_Banana_Stand',
         },
         aboutOwner: {
            owner: '3bed9528-9d10-4f50-ab72-d19dad1b8698',
            ownerName: 'Maeby Funke',
            ownerPhone: '123-456-7890',
            ownerDesc: 'Marry me!',
            ownerPhoto:
               'https://static.wikia.nocookie.net/arresteddevelopment/images/c/c2/Season_1_Character_Promos_-_Maeby_F%C3%BCnke_02.jpeg/revision/latest/scale-to-width-down/300?cb=20120429230807',
         },
         photos: [
            'https://static3.srcdn.com/wordpress/wp-content/uploads/2020/02/Arrested-Development-Banana-Stand.jpg',
         ],
         reviews: [
            {
               reviewAuthor: '3bed9528-9d10-4f50-ab72-d19dad1b8698',
               authorUserName: 'Lucille Bluth',
               authorProfilePicture: '',
               stars: 1.2,
               reviewTitle: 'Not worth the money',
               description:
                  "It's one banana, Michael. What could it cost, $10?",
               pictures: ['http://i.imgur.com/pq458qHh.jpg'],
               ts: 2348769369,
            },
         ],
         lister: 'George Michael Bluth',
         verified: true,
         timestamp: 1644963553,
      },
   ];

   // filtered business results stored separately so they can be reverted if user unchecks the box
   const [filteredBusinesses, setFilteredBusinesses] =
      useState(businessResults);

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

   // when a user clicks on one of the minority tags on the left, it will be remove the tag from the search
   const removeTag = (business, tag) => {
      const tags = business.tags;
      const selectedTags = tagState.filter((t) => t.selected == true);

      const index = selectedTags.map((t) => t.text).indexOf(tag);
      selectedTags.splice(index, 1);

      // if the tag to remove isn't associated with this business, it should still be displayed
      if (tags.indexOf(tag) === -1) {
         return true;
      }

      // if the tag to remove is the only one associated with this business, it should be removed from results
      if (tags.length === 1) {
         return false;
      }

      // if there are more minorities to filter by, check if other tags associated with business fulfill them
      if (selectedTags.length > 0) {
         return selectedTags.some((t) => tags.includes(t.text));
      }
   };

   // filter businesses based on time
   const filterBusinessesByTime = (e, businesses) => {
      const day = dayOfWeek();
      // filter by time if box is checked, if unchecked, revert to original results
      if (e.target.checked) {
         setFilteredBusinesses(businesses.filter((b) => filterByTime(b, day)));
      } else {
         setFilteredBusinesses(businessResults);
      }
   };

   // filter business results when customer removes a tag
   const filterBusinessesRemoveTag = (key, businesses) => {
      setFilteredBusinesses(businesses.filter((b) => removeTag(b, key)));
      const updatedTagState = [...tagState];
      const idx = tagState.map((t) => t.text).indexOf(key);
      updatedTagState[idx].selected = !updatedTagState[idx].selected;
      setTagState(updatedTagState);
   };

   // sort businesses by value of sort dropdown
   const sortBusinesses = (key) => {
      if (key === 'reviews') {
         setFilteredBusinesses([
            ...filteredBusinesses.sort(
               (a, b) => b.reviews.length - a.reviews.length
            ),
         ]);
      } else if (key === 'recent') {
         setFilteredBusinesses([
            ...filteredBusinesses.sort((a, b) => a.timestamp - b.timestamp),
         ]);
      }
   };

   // this function will requery with new tags
   // already added to props.minorityTags
   const applyNewTags = (e, newTags) => {
      // toggle tags if previously selected and were deleted from modal, or if not selected and added through the modal
      tagState.forEach((t, i) => {
         if (
            (t.selected && !newTags.includes(t.text)) ||
            (!t.selected && newTags.includes(t.text))
         ) {
            const updatedTagState = [...tagState];
            updatedTagState[i].selected = !updatedTagState[i].selected;
            setTagState(updatedTagState);
         }
      });

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
                        {tagState.map((tag, index) =>
                           tag.selected === true ? (
                              <SelectedTagRow
                                 key={index}
                                 onClick={(e) =>
                                    filterBusinessesRemoveTag(
                                       tag.text,
                                       filteredBusinesses
                                    )
                                 }
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
                              tags={[...tagState]}
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
                     {props.category} near {props.location}
                  </StyledH2>
                  {filteredBusinesses.map((business, index) => (
                     <Row key={index}>
                        <StyledBusinessPreview
                           key={index}
                           name={business.name}
                           imageUrl={business.photos[0]}
                           description={business.shortDesc}
                           stars={4.5}
                           minorityTags={business.tags}
                           keywordTags={business.keywords}
                           verified={business.verified}
                           path="/business"
                           numReviews={business.reviews.length}
                        />
                     </Row>
                  ))}
               </ResultsContainer>
            </Col>
         </Row>
      </SearchContainer>
   );
};

export default SearchResults;
