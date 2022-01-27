import React, { useState } from 'react';
import styled from 'styled-components';
import StyledButton from '../styles/StyledButton';
import { Form } from 'react-bootstrap';

/* 
  TODO: 
    - Form Validation
    - Business Photo Upload
    - Link to POST (post-list-business)
    - Define DataList for Categories
    - Define DataList for Minority Groups

    - Potentially, have check boxes unchecked by default?
      - Not as trivial as would like, as this was implemented with Boolean
    - Potentially, E2E Test in Cypress
*/

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
   const [isOwner, setIsOwner] = useState(true);
   const [isBrickAndMortar, setIsBrickAndMortar] = useState(true);
   const [businessName, setBusinessName] = useState('');
   const [street, setStreet] = useState('');
   const [city, setCity] = useState('');
   const [state, setState] = useState('');
   const [zip, setZip] = useState('');
   const [tags, setTags] = useState('');
   const [keywords, setKeywords] = useState('');
   const [businessURL, setBusinessURL] = useState('');
   const [businessDesc, setBusinessDesc] = useState('');
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

   const gatherBusinessInfo = () => {
      const businessInfo = {
         name: businessName,
         city: city,
         type: isBrickAndMortar ? 'B&M' : 'Online',
         tags: tags,
         keywords: keywords,
         address: isBrickAndMortar
            ? street + ' ' + city + ' ' + state + ', ' + zip
            : '',
         links: isBrickAndMortar ? '' : businessURL,
         hours: isBrickAndMortar
            ? {
                 Sun:
                    openHours.Sun + (openHours.Sun ? '-' : '') + closeHours.Sun,
                 Mon:
                    openHours.Mon + (openHours.Mon ? '-' : '') + closeHours.Mon,
                 Tue:
                    openHours.Tue + (openHours.Tue ? '-' : '') + closeHours.Tue,
                 Wed:
                    openHours.Wed + (openHours.Wed ? '-' : '') + closeHours.Wed,
                 Thu:
                    openHours.Thu + (openHours.Thu ? '-' : '') + closeHours.Thu,
                 Fri:
                    openHours.Fri + (openHours.Fri ? '-' : '') + closeHours.Fri,
                 Sat:
                    openHours.Sat + (openHours.Sat ? '-' : '') + closeHours.Sat,
              }
            : {},
         aboutOwner: isOwner
            ? {
                 ownerName,
                 ownerPhone,
                 ownerDesc,
              }
            : {},
      };
      console.log('BusinessInfo: ', businessInfo);
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
                     onChange={(e) => setBusinessName(e.target.value)}
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
                        list="keyword-groups"
                        value={keywords}
                        onChange={(e) => setKeywords(e.target.value)}
                     />
                     <datalist id="keyword-groups">
                        <option>Restaraunt</option>
                        <option>Service</option>
                        <option>Online Retailer</option>
                        <option>Nails</option>
                        <option>Restaraunt</option>
                        <option>Service</option>
                        <option>Online Retailer</option>
                        <option>Nails</option>
                     </datalist>
                  </SplitFormGroup>
                  <SplitFormGroup className="mb-3 ">
                     <Form.Label>
                        Minority Group <Required>*</Required>
                     </Form.Label>
                     <StyledControl
                        type="text"
                        placeholder="Viet-Owned"
                        list="minority-groups"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                     />
                     <datalist id="minority-groups">
                        <option>Hispanic</option>
                        <option>Black</option>
                        <option>Asian</option>
                        <option>Native American</option>
                        <option>LGBTQ+</option>
                        <option>Middle Eastern</option>
                        <option>Women</option>
                     </datalist>
                  </SplitFormGroup>
               </SplitContainer>

               <SectionLabel>Business Owner Details</SectionLabel>
               <SplitContainer>
                  <SplitFormGroup
                     className="mb-3"
                     style={{ marginRight: '12px' }}
                  >
                     <Form.Label>Business Owner Name</Form.Label>
                     <StyledControl
                        type="text"
                        placeholder="Juan Pérez "
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                     />
                  </SplitFormGroup>
                  <SplitFormGroup className="mb-3 ">
                     <Form.Label>Phone Number</Form.Label>
                     <StyledControl
                        type="text"
                        placeholder="805-123-7654"
                        value={ownerPhone}
                        onChange={(e) => setOwnerPhone(e.target.value)}
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
                        checked={isOwner}
                        onChange={() => setIsOwner(true)}
                     />
                     <StyledCheck
                        type="checkbox"
                        label="No"
                        checked={!isOwner}
                        onChange={() => setIsOwner(false)}
                     />
                  </CheckGroup>
               </Form.Group>

               {isOwner ? (
                  <div>
                     <Form.Group className="mb-3">
                        <Form.Label> Business Description </Form.Label>
                        <StyledTextArea
                           as="textarea"
                           rows={3}
                           value={businessDesc}
                           onChange={(e) => setBusinessDesc(e.target.value)}
                        ></StyledTextArea>
                     </Form.Group>
                     <Form.Group className="mb-3">
                        <Form.Label> About the Owner </Form.Label>
                        <StyledTextArea
                           as="textarea"
                           rows={3}
                           value={ownerDesc}
                           onChange={(e) => setOwnerDesc(e.target.value)}
                        ></StyledTextArea>
                     </Form.Group>
                     {/*
                     <Form.Label> Business Photo Upload </Form.Label>
                     <br />
                     <StyledButton className="mb-3">
                        Select Files to Upload
                     </StyledButton>
                     */}
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
                        checked={isBrickAndMortar}
                        onChange={() => setIsBrickAndMortar(true)}
                     />
                     <StyledCheck
                        type="checkbox"
                        label="Online"
                        checked={!isBrickAndMortar}
                        onChange={() => setIsBrickAndMortar(false)}
                     />
                  </CheckGroup>
               </Form.Group>

               {isBrickAndMortar ? (
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
                              onChange={(e) => setStreet(e.target.value)}
                           />
                        </MediumGroup>
                        <MediumGroup className="mb-3 mx-2">
                           <Form.Label>City</Form.Label>
                           <StyledControl
                              type="city"
                              placeholder="San Luis Obispo"
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                           />
                        </MediumGroup>
                        <SmallGroup className="">
                           <Form.Label>State</Form.Label>
                           <StyledControl
                              type="text"
                              placeholder="CA"
                              value={state}
                              onChange={(e) => setState(e.target.value)}
                           />
                        </SmallGroup>
                        <SmallGroup className="mb-3 mx-2">
                           <Form.Label>Zipcode</Form.Label>
                           <StyledControl
                              type="text"
                              pattern="[0-9]{5}"
                              placeholder="93405"
                              value={zip}
                              onChange={(e) => setZip(e.target.value)}
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
               ) : (
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
                              onChange={(e) => setBusinessURL(e.target.value)}
                           />
                        </SplitFormGroup>
                     </SplitContainer>
                  </>
               )}
               <ButtonDiv>
                  <WideButton
                     primary
                     onClick={(e) => {
                        e.preventDefault();
                        gatherBusinessInfo();
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
