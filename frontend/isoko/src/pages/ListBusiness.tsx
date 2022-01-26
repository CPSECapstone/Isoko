import React from 'react';
import styled from 'styled-components';
import { Form, Button } from 'react-bootstrap';

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

const ListBusiness = () => {
   return (
      <main>
         <FormContainer>
            <h2>List a Business</h2>
            <SectionLabel>Business Details</SectionLabel>
            <Form>
               <Form.Group className="mb-3">
                  <Form.Label>
                     Business Name <Required>*</Required>
                  </Form.Label>
                  <StyledControl type="email" placeholder="Enter email" />
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

               {/* TODO: Only allow one Checked, need to do with JS */}
               <Form.Group controlId="formBasicCheckbox">
                  <Form.Label>
                     Business Type <Required>*</Required>
                  </Form.Label>
                  <CheckGroup>
                     <StyledCheck
                        style={{ marginRight: '12px' }}
                        type="checkbox"
                        label="Brick & Mortar"
                     />
                     <StyledCheck type="checkbox" label="Online" />
                  </CheckGroup>
               </Form.Group>

               {/* TODO: Only show if Brick & Mortar is Checked, otherwise show Website*/}
               <SectionLabel>
                  Address <Required>*</Required>
               </SectionLabel>
               <SplitContainer>
                  <MediumGroup className="mb-3">
                     <Form.Label>Street</Form.Label>
                     <StyledControl
                        type="address"
                        placeholder="123 Cherry St."
                     />
                  </MediumGroup>
                  <MediumGroup className="mb-3 mx-2">
                     <Form.Label>City</Form.Label>
                     <StyledControl type="city" placeholder="San Luis Obispo" />
                  </MediumGroup>
                  <SmallGroup className="">
                     <Form.Label>State</Form.Label>
                     <StyledControl type="city" placeholder="CA" />
                  </SmallGroup>
                  <SmallGroup className="mb-3 mx-2">
                     <Form.Label>Zipcode</Form.Label>
                     <StyledControl
                        type="text"
                        pattern="[0-9]{5}"
                        placeholder="93405"
                     />
                  </SmallGroup>
               </SplitContainer>

               <SectionLabel>Business Owner Details</SectionLabel>
               <SplitContainer>
                  <SplitFormGroup
                     className="mb-3"
                     style={{ marginRight: '12px' }}
                  >
                     <Form.Label>Business Owner Name</Form.Label>
                     <StyledControl type="text" placeholder="Juan Pérez " />
                  </SplitFormGroup>
                  <SplitFormGroup className="mb-3 ">
                     <Form.Label>Phone Number</Form.Label>
                     <StyledControl type="text" placeholder="805-123-7654" />
                  </SplitFormGroup>
               </SplitContainer>

               {/* TODO: Only allow one Checked, need to do with JS */}
               <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Label>
                     Are you Business Owner <Required>*</Required>
                  </Form.Label>
                  <CheckGroup>
                     <StyledCheck
                        style={{ marginRight: '12px' }}
                        type="checkbox"
                        label="Yes"
                     />
                     <StyledCheck type="checkbox" label="No" />
                  </CheckGroup>
               </Form.Group>

               <Button variant="primary" type="submit">
                  Submit
               </Button>
            </Form>
         </FormContainer>
      </main>
   );
};

export default ListBusiness;
