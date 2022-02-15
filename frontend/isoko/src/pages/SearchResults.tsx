import React, { useState } from 'react';
import styled from 'styled-components';
import BusinessPreview from '../components/business/BusinessPreview';
import MinorityTag from '../components/business/MinorityTag';
import AddTag from '../components/search/AddTag';
import StyledButton from '../styles/StyledButton';
import {
   Modal,
   Form,
   Dropdown,
   DropdownButton,
   Container,
   Row,
   Col,
} from 'react-bootstrap';
import moment from 'moment-timezone';

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

const StyledDropdownButton = styled(DropdownButton)`
   background: #fff;
   color: #000;
   text-decoration: underline;
   font-size: 0.5rem;

   .btn-primary {
      background-color: #fbfbfb;
      color: black;
      border-color: #fbfbfb;
      padding: 0px;
      font-size: 0.9rem;

      &:focus {
         background-color: #fbfbfb;
         color: black;
         border-color: #fbfbfb;
      }

      &:hover {
         box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.25);
      }

      &.dropdown-toggle:focus {
         box-shadow: none;
      }
   }

   .btn {
      text-decoration: underline;
   }
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

const ModalTagRow = styled(Row)`
   display: flex;
   justify-content: left;
   padding-bottom: 5px;
`;

const ModalTagCol = styled(Col)`
   display: flex;
   align-self: flex-start;
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
   time: string;
}

const SearchResults: React.FC<SearchResultsProps> = (props) => {
   const [sortKey, setSortKey] = useState('Recently added');
   const [showModal, setShowModal] = useState(false);
   // will be replaced upon completion of is-88
   const allTags = [
      'Black-Owned',
      'Asian-Owned',
      'Mexican-Owned',
      'Women-Owned',
      'LGBTQ-Owned',
   ];
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
         tags: ['LGBTQ-Owned'],
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
         tags: ['Women-Owned'],
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
      const dateComponents = props.time.split(',');
      return dateComponents[0];
   };

   const displayTime = () => {
      return moment(props.time, 'llll').format('h:mm A');
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

      const now = moment(props.time, 'h:mm a');

      if (now.isAfter(open) && now.isBefore(closed)) {
         return true;
      }

      return false;
   };

   // when a user clicks on one of the minority tags on the left, it will be remove the tag from the search
   const removeTag = (business, tag) => {
      const tags = business.tags;
      const selectedTags = [];

      props.minorityTags.forEach((t, i) => {
         selectedTags.push(t);
      });

      const tagIndex = selectedTags.indexOf(tag);
      selectedTags.splice(tagIndex, 1);

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
         return selectedTags.some((t) => tags.includes(t));
      }
   };

   // filter businesses based on sidebar components
   const filterBusinesses = (e, key, businesses) => {
      // filter by "open now"
      if (key == 'time') {
         const day = dayOfWeek();
         console.log('day');
         console.log(day);
         console.log(e.target.checked);
         // filter by time if box is checked, if unchecked, revert to original results
         if (e.target.checked) {
            setFilteredBusinesses(
               businesses.filter((b) => filterByTime(b, day))
            );
         } else {
            setFilteredBusinesses(businessResults);
         }
      }

      // minority tag removed
      else {
         setFilteredBusinesses(businesses.filter((b) => removeTag(b, key)));
         const tagIndex = props.minorityTags.indexOf(key);
         props.minorityTags.splice(tagIndex, 1);
      }
   };

   // sort businesses by value of sort dropdown
   const sortBusinesses = (key) => {
      if (key === 'reviews') {
         setFilteredBusinesses(
            filteredBusinesses.sort(
               (a, b) => b.reviews.length - a.reviews.length
            )
         );
      } else if (key === 'recent') {
         console.log('here');
         setFilteredBusinesses(
            filteredBusinesses.sort((a, b) => a.timestamp - b.timestamp)
         );
      }
   };

   // this function will requery with new tags
   // already added to props.minorityTags
   const applyNewTags = () => {
      setShowModal(false);
      console.log('hi');
   };

   // modal functions
   const handleCloseModal = () => {
      setShowModal(false);
   };

   // handle when a user clicks a minority tag in the Add Tags modal
   const addTag = (id) => {
      const btn = document.getElementById(id);

      if (props.minorityTags.includes(id)) {
         btn.style.background = '#fff';
         btn.style.color = '#F97D0B';
         const index = props.minorityTags.indexOf(id);
         props.minorityTags.splice(index, 1);
      } else {
         btn.style.background = '#F97D0B';
         btn.style.color = '#fff';
         props.minorityTags.push(id);
      }
   };

   // build rows of minority tags in the Add Tags modal
   const renderRows = () => {
      const fullList = [];
      const finalArr = [];
      let columns = [];

      props.minorityTags.forEach((m, i) => {
         fullList.push(m);
      });

      // remove tags that are already selected
      allTags.forEach((t, i) => {
         if (!props.minorityTags.includes(t)) {
            fullList.push(t);
         }
      });

      fullList.forEach((tag, i) => {
         if (props.minorityTags.includes(tag)) {
            columns.push(
               <ModalTagCol className="col-auto" key={i}>
                  <StyledButton primary id={tag} onClick={() => addTag(tag)}>
                     {tag}
                  </StyledButton>
               </ModalTagCol>
            );
         } else {
            columns.push(
               <ModalTagCol className="col-auto" key={i}>
                  <StyledButton id={tag} onClick={() => addTag(tag)}>
                     {tag}
                  </StyledButton>
               </ModalTagCol>
            );
         }
         // only 4 tags/row
         if ((i + 1) % 3 === 0) {
            finalArr.push(<ModalTagRow>{columns}</ModalTagRow>);
            columns = [];
         }
      });
      finalArr.push(<ModalTagRow>{columns}</ModalTagRow>);
      return finalArr;
   };

   return (
      <SearchContainer>
         <Row>
            <Col className="col-sm-3">
               <Sidebar>
                  <StyledH2>Sort</StyledH2>
                  <SidebarContainer>
                     <StyledDropdownButton title={sortKey}>
                        <Dropdown.Item as="button">
                           <div
                              onClick={(e) => {
                                 setSortKey(e.target.textContent);
                                 sortBusinesses('recent');
                              }}
                           >
                              Recently added
                           </div>
                        </Dropdown.Item>
                        <Dropdown.Item as="button">
                           <div
                              onClick={(e) => {
                                 setSortKey(e.target.textContent);
                                 sortBusinesses('reviews');
                              }}
                           >
                              Most reviews
                           </div>
                        </Dropdown.Item>
                        <Dropdown.Item as="button">
                           <div
                              onClick={(e) => {
                                 setSortKey(e.target.textContent);
                              }}
                           >
                              Highest rated
                           </div>
                        </Dropdown.Item>
                     </StyledDropdownButton>
                  </SidebarContainer>
                  <StyledH2>Filters</StyledH2>
                  <StyledH3>Tags</StyledH3>
                  <TagContainer>
                     <Row>
                        {props.minorityTags.map((tag, index) => (
                           <SelectedTagRow
                              key={index}
                              onClick={(e) =>
                                 filterBusinesses(e, tag, filteredBusinesses)
                              }
                           >
                              <MinorityTag
                                 key={index}
                                 name={tag}
                                 mutable={true}
                              />
                           </SelectedTagRow>
                        ))}
                     </Row>
                     <Row>
                        <AddTagCol className="col-auto">
                           <div
                              onClick={() => {
                                 setShowModal(true);
                                 console.log('hit');
                              }}
                           >
                              <AddTag />
                           </div>
                           <Modal show={showModal} onHide={handleCloseModal}>
                              <Modal.Header closeButton>
                                 <Modal.Title>Business Tags</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                 <Container>{renderRows()}</Container>
                              </Modal.Body>
                              <Modal.Footer>
                                 <StyledButton onClick={handleCloseModal}>
                                    Cancel
                                 </StyledButton>
                                 <StyledButton primary onClick={applyNewTags}>
                                    Confirm
                                 </StyledButton>
                              </Modal.Footer>
                           </Modal>
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
                              filterBusinesses(e, 'time', filteredBusinesses);
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
