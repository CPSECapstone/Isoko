import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import StyledButton from '../styles/StyledButton';
import { Form } from 'react-bootstrap';
import categoryList from '../constants/categoryList';
import minorityGroups from '../constants/minorityGroups';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { environment } from '../environment/environment';

const SHORTDESCMAXLENGTH = 100;

const StyledDataList = styled.datalist`
   background-color: red;
   color: blue;
`;

const StyledSearchBar = styled(Autocomplete)`
   max-height: 32px;
   font-size: 16px;

   .MuiOutlinedInput-notchedOutline {
      padding: 0px;
      margin: 0px;
      border-radius: 10px;
      border: none;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      font-size: 1.0625em;
      text-indent: 10px;
   }
   .MuiOutlinedInput-root {
      padding: 0px !important;
      font-size: 1.0625em;
   }

   .MuiButtonBase-root {
     height: 26px;
   }

   .MuiAutocomplete-popupIndicatorOpen {
     background-folor: red;
   }

   .Mui-focused .MuiOutlinedInput-notchedOutline {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border: 0px;
      outline: 1px solid rgb(249, 125, 11);
  }
 }
`;

const StyledTextField = styled(TextField)`
   background: #ffffff;
`;

const FormContainer = styled.div`
   width: 90%;
   margin: 20px auto;
   text-align: left;
   border: 1px solid darkgrey;
   padding: 12px;
   border-radius: 10px;
`;

const StyledControl = styled(Form.Control)`
   width: 100%;
   font-size: 1.0625em;
   padding: 0px 12px 0px 4px;
   border-radius: 10px;
   border: none;
   height: 32px;
   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
   text-indent: 10px;

   &:focus {
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border: 1px solid rgb(249, 125, 11);
   }
`;

const StyledTextArea = styled(Form.Control)`
   width: 100%;
   font-size: 1.0625em;
   padding: px 12px 0px 4px;
   border-radius: 10px;
   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
   border: none;
   outline: none;
   text-indent: 10px;

   &:focus,
   &:active {
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      outline: 1px solid rgb(249, 125, 11);
   }
`;

const SplitContainer = styled.div`
   display: flex;
   flex-direction: row;
   min-width: 100%;
`;

const SplitFormGroup = styled(Form.Group)`
   width: 50%;
`;

const MediumGroup = styled(Form.Group)`
   width: 40%;
`;
const SmallGroup = styled(Form.Group)`
   width: 10%;
`;

const HourContainer = styled.div`
   display: flex;
   flex-direction: row;
   min-width: 100%;
`;
const HourGroup = styled(Form.Group)`
   display: flex;
   flex-direction: row;
`;

const CheckGroup = styled.div`
   display: flex;
   flex-direction: row;
`;

const Required = styled.span`
   color: red;
`;

const SectionLabel = styled.p`
   font-weight: bold;
   font-size: 1.125em;
   margin-bottom: 8px;
`;
const HeaderLabel = styled.p`
   font-weight: bold;
   font-size: 1.625em;
   margin-bottom: 8px;
   text-align: center;
`;

const ButtonDiv = styled.div`
   display: flex;
   justify-content: right;
`;
const WideButton = styled(StyledButton)`
   width: 120px;
   border-radius: 10px;
   border: none;
   height: 32px;
   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const StyledCheck = styled(Form.Check)`
   .form-check-input {
      &:focus {
         box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.25);
         border: 1px solid rgb(249, 125, 11);
      }
   }

   .form-check-input:checked {
      background-color: rgb(249, 125, 11);
      border: none;
      box-shadow: 0px;
      &:focus {
         box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.25);
         border: 1px solid rgb(249, 125, 11);
      }
   }
`;

const HourLabel = styled(Form.Label)`
   min-width: 70px;
`;
const ListBusiness: React.FC = () => {
   const [err, setErr] = useState('');

   const [isOwner, setIsOwner] = useState('');
   const [isBrickAndMortar, setIsBrickAndMortar] = useState('');

   const [businessName, setBusinessName] = useState('');
   const [street, setStreet] = useState('');
   const [city, setCity] = useState('');
   const [state, setState] = useState('');
   const [zip, setZip] = useState('');
   const [tags, setTags] = useState([]);
   const [category, setCategory] = useState('');
   const [businessURL, setBusinessURL] = useState('');
   const [shortDesc, setShortDesc] = useState('');
   const [ownerName, setOwnerName] = useState('');
   const [ownerPhone, setOwnerPhone] = useState('');
   const [ownerDesc, setOwnerDesc] = useState('');
   const [openHours, setOpenHours] = useState({
      Sun: '',
      Mon: '',
      Tue: '',
      Wed: '',
      Thu: '',
      Fri: '',
      Sat: '',
   });
   const [closeHours, setCloseHours] = useState({
      Sun: '',
      Mon: '',
      Tue: '',
      Wed: '',
      Thu: '',
      Fri: '',
      Sat: '',
   });

   // renders the data form the constants to the page,
   // useEffect needed to load fields before page loads
   useEffect(() => {
      const categoryDataList = document.getElementById('category-groups');
      categoryList.forEach((item) => {
         const option = document.createElement('option');
         option.value = item;
         categoryDataList.appendChild(option);
      });
   }, []);

   const listABusiness = () => {
      if (isValid()) {
         const businessInfo = gatherBusinessInfo();
         postBusinessInfo(businessInfo);
      } // no need for an else. Errors are set in isValid
   };

   // this function contains a lot of ifs for more accurate error reporting
   // This function could still prob be improved
   const isValid = () => {
      if (businessName.length === 0) {
         setErr('Please fill out Business Name');
         return false;
      }
      if (category.length === 0) {
         setErr('Please fill out Business Category');
         return false;
      }
      if (tags.length === 0) {
         setErr('Please add a Minority Group');
         return false;
      }
      if (ownerName.length === 0) {
         setErr('Please fill out Business Owner Name');
         return false;
      }
      if (ownerPhone.length === 0) {
         setErr('Please fill out Business Owner Phone');
         return false;
      }
      if (isOwner === '') {
         setErr('Please select if you are the Business Owner');
         return false;
      }
      if (isBrickAndMortar === '') {
         setErr('Please select Business Type');
         return false;
      }
      if (isBrickAndMortar === 'true') {
         if (
            street.length === 0 ||
            city.length === 0 ||
            state.length === 0 ||
            zip.length === 0
         ) {
            setErr(
               'Please make sure your address fields are filled out correctly'
            );
            return false;
         }
      }
      if (isBrickAndMortar === 'false') {
         if (businessURL.length === 0) {
            setErr('Please add your websites URL');
            return false;
         }
      }
      return true;
   };

   const gatherBusinessInfo = () => {
      const businessInfo = {
         name: businessName,
         city,
         state,
         street,
         zip,
         type: isBrickAndMortar === 'true' ? 'B&M' : 'Online',
         tags: tags,
         category,
         shortDesc,
         links: isBrickAndMortar === 'true' ? '' : businessURL,
         hours:
            isBrickAndMortar === 'true'
               ? {
                    Sun:
                       openHours.Sun +
                       (openHours.Sun ? '-' : '') +
                       closeHours.Sun,
                    Mon:
                       openHours.Mon +
                       (openHours.Mon ? '-' : '') +
                       closeHours.Mon,
                    Tue:
                       openHours.Tue +
                       (openHours.Tue ? '-' : '') +
                       closeHours.Tue,
                    Wed:
                       openHours.Wed +
                       (openHours.Wed ? '-' : '') +
                       closeHours.Wed,
                    Thu:
                       openHours.Thu +
                       (openHours.Thu ? '-' : '') +
                       closeHours.Thu,
                    Fri:
                       openHours.Fri +
                       (openHours.Fri ? '-' : '') +
                       closeHours.Fri,
                    Sat:
                       openHours.Sat +
                       (openHours.Sat ? '-' : '') +
                       closeHours.Sat,
                 }
               : {},
         aboutOwner:
            isOwner == 'true'
               ? {
                    ownerName,
                    ownerPhone,
                    ownerDesc,
                 }
               : {},
      };
      return businessInfo;
   };
   const postBusinessInfo = async (businessInfo) => {
      if (isValid()) {
         console.log('BusinessInfo: ', businessInfo);
         await axios.post(`${environment.prodURL}/business`, businessInfo);
      }
   };

   return (
      <main>
         <FormContainer>
            <HeaderLabel>List a Business</HeaderLabel>
            <SectionLabel>Business Details</SectionLabel>
            <Form>
               <Form.Group className="mb-3">
                  <Form.Label>
                     Business Name <Required>*</Required>
                  </Form.Label>
                  <StyledControl
                     type="email"
                     placeholder="Fred's Barbershop"
                     value={businessName}
                     onChange={(e) => {
                        setBusinessName(e.target.value);
                        setErr('');
                     }}
                  />
               </Form.Group>

               <SplitContainer>
                  <SplitFormGroup
                     className="mb-3"
                     style={{ marginRight: '12px' }}
                  >
                     <Form.Label>
                        Business Category <Required>*</Required>
                     </Form.Label>
                     <StyledControl
                        type="text"
                        placeholder="Restaraunt"
                        list="category-groups"
                        value={category}
                        onChange={(e) => {
                           setCategory(e.target.value);
                           setErr('');
                        }}
                     />
                     <StyledDataList id="category-groups"></StyledDataList>
                  </SplitFormGroup>
                  <SplitFormGroup className="mb-3 ">
                     <Form.Label>
                        Minority Group <Required>*</Required>
                     </Form.Label>
                     <StyledSearchBar
                        multiple
                        id="tags-outlined"
                        options={minorityGroups}
                        getOptionLabel={(option: any) => option}
                        value={tags}
                        onChange={(e, value) => {
                           setTags(value);
                        }}
                        filterSelectedOptions
                        renderInput={(params) => (
                           <StyledTextField
                              {...params}
                              placeholder="Viet-Owned"
                           />
                        )}
                     />
                  </SplitFormGroup>
               </SplitContainer>

               <SectionLabel>Business Owner Details</SectionLabel>
               <SplitContainer>
                  <SplitFormGroup
                     className="mb-3"
                     style={{ marginRight: '12px' }}
                  >
                     <Form.Label>
                        Business Owner Name<Required> *</Required>
                     </Form.Label>
                     <StyledControl
                        type="text"
                        placeholder="Juan Pérez "
                        value={ownerName}
                        onChange={(e) => {
                           setOwnerName(e.target.value);
                           setErr('');
                        }}
                     />
                  </SplitFormGroup>
                  <SplitFormGroup className="mb-3 ">
                     <Form.Label>
                        Business Owner Phone Number<Required> *</Required>
                     </Form.Label>
                     <StyledControl
                        type="text"
                        placeholder="805-123-7654"
                        value={ownerPhone}
                        onChange={(e) => {
                           setOwnerPhone(e.target.value);
                           setErr('');
                        }}
                     />
                  </SplitFormGroup>
               </SplitContainer>

               <Form.Group>
                  <Form.Label>
                     Are you Business Owner <Required>*</Required>
                  </Form.Label>
                  <CheckGroup>
                     <StyledCheck
                        style={{ marginRight: '12px' }}
                        type="checkbox"
                        label="Yes"
                        checked={isOwner === 'true'}
                        onChange={() => {
                           setIsOwner('true');
                           setErr('');
                        }}
                     />
                     <StyledCheck
                        type="checkbox"
                        label="No"
                        checked={isOwner === 'false'}
                        onChange={() => setIsOwner('false')}
                     />
                  </CheckGroup>
               </Form.Group>

               {isOwner === 'true' ? (
                  <div>
                     <Form.Group className="mb-3">
                        <Form.Label> Short Business Description </Form.Label>
                        <StyledTextArea
                           as="textarea"
                           rows={3}
                           maxLength={SHORTDESCMAXLENGTH}
                           value={shortDesc}
                           onChange={(e) => setShortDesc(e.target.value)}
                        ></StyledTextArea>
                     </Form.Group>
                     <Form.Group className="mb-3">
                        <Form.Label> About the Owner </Form.Label>
                        <StyledTextArea
                           as="textarea"
                           maxLength={SHORTDESCMAXLENGTH}
                           rows={3}
                           value={ownerDesc}
                           onChange={(e) => setOwnerDesc(e.target.value)}
                        ></StyledTextArea>
                     </Form.Group>
                  </div>
               ) : null}

               <Form.Group controlId="formBasicCheckbox">
                  <Form.Label>
                     Business Type <Required>*</Required>
                  </Form.Label>
                  <CheckGroup>
                     <StyledCheck
                        style={{ marginRight: '12px' }}
                        type="checkbox"
                        label="Brick & Mortar"
                        checked={isBrickAndMortar === 'true'}
                        onChange={() => {
                           setIsBrickAndMortar('true');
                           setErr('');
                        }}
                     />
                     <StyledCheck
                        type="checkbox"
                        label="Online"
                        checked={isBrickAndMortar === 'false'}
                        onChange={() => {
                           setIsBrickAndMortar('false');
                           setErr('');
                        }}
                     />
                  </CheckGroup>
               </Form.Group>

               {isBrickAndMortar === 'true' ? (
                  <>
                     <SectionLabel>
                        Address <Required>*</Required>
                     </SectionLabel>
                     <SplitContainer>
                        <MediumGroup className="mb-3">
                           <Form.Label>Street</Form.Label>
                           <StyledControl
                              type="address"
                              placeholder="123 Cherry St."
                              value={street}
                              onChange={(e) => {
                                 setStreet(e.target.value);
                                 setErr('');
                              }}
                           />
                        </MediumGroup>
                        <MediumGroup className="mb-3 mx-2">
                           <Form.Label>City</Form.Label>
                           <StyledControl
                              type="city"
                              placeholder="San Luis Obispo"
                              value={city}
                              onChange={(e) => {
                                 setCity(e.target.value);
                                 setErr('');
                              }}
                           />
                        </MediumGroup>
                        <SmallGroup className="">
                           <Form.Label>State</Form.Label>
                           <StyledControl
                              type="text"
                              placeholder="CA"
                              maxLength={2}
                              value={state}
                              onChange={(e) => {
                                 setState(e.target.value);
                                 setErr('');
                              }}
                           />
                        </SmallGroup>
                        <SmallGroup className="mb-3 mx-2">
                           <Form.Label>Zipcode</Form.Label>
                           <StyledControl
                              type="text"
                              pattern="[0-9]{5}"
                              placeholder="93405"
                              value={zip}
                              onChange={(e) => {
                                 setZip(e.target.value);
                                 setErr('');
                              }}
                           />
                        </SmallGroup>
                     </SplitContainer>

                     <SectionLabel>Business Hours</SectionLabel>
                     <Form.Group className="mb-3">
                        <HourContainer className="mb-0">
                           <HourGroup className="mx-5">
                              <HourLabel className="mx-5 mt-1">Open </HourLabel>
                           </HourGroup>
                           <HourGroup>
                              <Form.Label className="mx-4 mt-1">
                                 Close
                              </Form.Label>
                           </HourGroup>
                        </HourContainer>
                        <HourContainer className="mb-2">
                           <HourGroup>
                              <HourLabel className="mt-2">Sunday </HourLabel>
                              <StyledControl
                                 className="mx-3"
                                 type="text"
                                 placeholder="8:00am"
                                 value={openHours.Sun}
                                 onChange={(e) =>
                                    setOpenHours({
                                       ...openHours,
                                       Sun: e.target.value,
                                    })
                                 }
                              />
                           </HourGroup>
                           <HourGroup>
                              <Form.Label className="mt-2">to</Form.Label>
                              <StyledControl
                                 className="mx-3"
                                 type="text"
                                 value={closeHours.Sun}
                                 onChange={(e) =>
                                    setCloseHours({
                                       ...closeHours,
                                       Sun: e.target.value,
                                    })
                                 }
                                 placeholder="7:00pm"
                              />
                           </HourGroup>
                        </HourContainer>
                        <HourContainer className="mb-2">
                           <HourGroup>
                              <HourLabel className="mt-2">Monday </HourLabel>
                              <StyledControl
                                 className="mx-3"
                                 type="text"
                                 placeholder="8:00am"
                                 value={openHours.Mon}
                                 onChange={(e) =>
                                    setOpenHours({
                                       ...openHours,
                                       Mon: e.target.value,
                                    })
                                 }
                              />
                           </HourGroup>
                           <HourGroup>
                              <Form.Label className="mt-2">to</Form.Label>
                              <StyledControl
                                 className="mx-3"
                                 type="text"
                                 value={closeHours.Mon}
                                 onChange={(e) =>
                                    setCloseHours({
                                       ...closeHours,
                                       Mon: e.target.value,
                                    })
                                 }
                                 placeholder="6:00pm"
                              />
                           </HourGroup>
                        </HourContainer>
                        <HourContainer className="mb-2">
                           <HourGroup>
                              <HourLabel className="mt-2">Tuesday </HourLabel>
                              <StyledControl
                                 className="mx-3"
                                 type="text"
                                 placeholder="8:00am"
                                 value={openHours.Tue}
                                 onChange={(e) =>
                                    setOpenHours({
                                       ...openHours,
                                       Tue: e.target.value,
                                    })
                                 }
                              />
                           </HourGroup>
                           <HourGroup>
                              <Form.Label className="mt-2">to</Form.Label>
                              <StyledControl
                                 className="mx-3"
                                 type="text"
                                 value={closeHours.Tue}
                                 onChange={(e) =>
                                    setCloseHours({
                                       ...closeHours,
                                       Tue: e.target.value,
                                    })
                                 }
                                 placeholder="6:00pm"
                              />
                           </HourGroup>
                        </HourContainer>
                        <HourContainer className="mb-2">
                           <HourGroup>
                              <HourLabel className="mt-2">Wednesday </HourLabel>
                              <StyledControl
                                 className="mx-3"
                                 type="text"
                                 placeholder="8:00am"
                                 value={openHours.Wed}
                                 onChange={(e) =>
                                    setOpenHours({
                                       ...openHours,
                                       Wed: e.target.value,
                                    })
                                 }
                              />
                           </HourGroup>
                           <HourGroup>
                              <Form.Label className="mt-2">to</Form.Label>
                              <StyledControl
                                 className="mx-3"
                                 type="text"
                                 value={closeHours.Wed}
                                 onChange={(e) =>
                                    setCloseHours({
                                       ...closeHours,
                                       Wed: e.target.value,
                                    })
                                 }
                                 placeholder="6:00pm"
                              />
                           </HourGroup>
                        </HourContainer>
                        <HourContainer className="mb-2">
                           <HourGroup>
                              <HourLabel className="mt-2">Thursday </HourLabel>
                              <StyledControl
                                 className="mx-3"
                                 type="text"
                                 placeholder="8:00am"
                                 value={openHours.Thu}
                                 onChange={(e) =>
                                    setOpenHours({
                                       ...openHours,
                                       Thu: e.target.value,
                                    })
                                 }
                              />
                           </HourGroup>
                           <HourGroup>
                              <Form.Label className="mt-2">to</Form.Label>
                              <StyledControl
                                 className="mx-3"
                                 type="text"
                                 value={closeHours.Thu}
                                 onChange={(e) =>
                                    setCloseHours({
                                       ...closeHours,
                                       Thu: e.target.value,
                                    })
                                 }
                                 placeholder="6:00pm"
                              />
                           </HourGroup>
                        </HourContainer>
                        <HourContainer className="mb-2">
                           <HourGroup>
                              <HourLabel className="mt-2">Friday </HourLabel>
                              <StyledControl
                                 className="mx-3"
                                 type="text"
                                 placeholder="8:00am"
                                 value={openHours.Fri}
                                 onChange={(e) =>
                                    setOpenHours({
                                       ...openHours,
                                       Fri: e.target.value,
                                    })
                                 }
                              />
                           </HourGroup>
                           <HourGroup>
                              <Form.Label className="mt-2">to</Form.Label>
                              <StyledControl
                                 className="mx-3"
                                 type="text"
                                 value={closeHours.Fri}
                                 onChange={(e) =>
                                    setCloseHours({
                                       ...closeHours,
                                       Fri: e.target.value,
                                    })
                                 }
                                 placeholder="6:00pm"
                              />
                           </HourGroup>
                        </HourContainer>
                        <HourContainer className="mb-2">
                           <HourGroup>
                              <HourLabel className="mt-2">Saturday </HourLabel>
                              <StyledControl
                                 className="mx-3"
                                 type="text"
                                 placeholder="8:00am"
                                 value={openHours.Sat}
                                 onChange={(e) =>
                                    setOpenHours({
                                       ...openHours,
                                       Sat: e.target.value,
                                    })
                                 }
                              />
                           </HourGroup>
                           <HourGroup>
                              <Form.Label className="mt-2">to</Form.Label>
                              <StyledControl
                                 className="mx-3"
                                 type="text"
                                 value={closeHours.Sat}
                                 onChange={(e) =>
                                    setCloseHours({
                                       ...closeHours,
                                       Sat: e.target.value,
                                    })
                                 }
                                 placeholder="5:00pm"
                              />
                           </HourGroup>
                        </HourContainer>
                     </Form.Group>
                  </>
               ) : isBrickAndMortar === 'false' ? (
                  <>
                     <SectionLabel>
                        Website Information <Required>*</Required>
                     </SectionLabel>
                     <SplitContainer>
                        <SplitFormGroup
                           className="mb-3"
                           style={{ marginRight: '12px' }}
                        >
                           <Form.Label>Website URL</Form.Label>
                           <StyledControl
                              type="text"
                              placeholder="https://www.amazon.com/"
                              value={businessURL}
                              onChange={(e) => {
                                 setBusinessURL(e.target.value);
                                 setErr('');
                              }}
                           />
                        </SplitFormGroup>
                     </SplitContainer>
                  </>
               ) : null}
               {err === '' ? null : <Required>{err}</Required>}

               <ButtonDiv>
                  <WideButton
                     primary
                     onClick={(e) => {
                        e.preventDefault();
                        listABusiness();
                     }}
                  >
                     Submit
                  </WideButton>
               </ButtonDiv>
            </Form>
         </FormContainer>
      </main>
   );
};

export default ListBusiness;
