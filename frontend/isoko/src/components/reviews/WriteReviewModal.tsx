import React, { useState } from 'react';
import styled from 'styled-components';
import StyledButton from '../../styles/StyledButton';
import { Modal, Col, Form } from 'react-bootstrap';
import { Rating } from 'react-simple-star-rating';

const CONTENTMAXLENGTH = 300;

const ModalTagCol = styled(Col)`
   margin-bottom: 5px;
`;

const Required = styled.span`
   color: red;
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

const StarContainer = styled.div`
   margin: 0.5em 0em 1em -0.2em;
   display: flex;
   align-items: center;
`;

interface WriteReviewModalProps extends React.HTMLProps<HTMLDivElement> {
   show: boolean;
   handleClose: () => void;
}

const WriteReviewModal: React.FC<WriteReviewModalProps> = (props) => {
   const [subject, setSubject] = useState('');
   const [content, setContent] = useState('');
   const [rating, setRating] = useState(0);
   const [listOfImages, setListOfImages] = useState([]);
   const [err, setErr] = useState('');

   // note that rating value is out of 100 and needs to be divided by 20 to get
   // number of stars when sending to database
   const handleRating = (rate: number) => {
      setRating(rate);
   };

   return (
      <Modal show={props.show} onHide={props.handleClose}>
         <Modal.Header closeButton>
            <Modal.Title>Write a Review</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <div>
               How would you rate this business out of 5? <Required>*</Required>
            </div>
            <StarContainer>
               <Rating
                  allowHalfIcon={true}
                  readonly={false}
                  fillColor={'#FD9E2E'}
                  size={20}
                  onClick={handleRating}
                  ratingValue={rating}
               />
            </StarContainer>
            <Form>
               <Form.Group className="mb-3">
                  <Form.Label>
                     Subject Line <Required>*</Required>
                  </Form.Label>
                  <StyledControl
                     type="text"
                     placeholder="Great food, great service"
                     value={subject}
                     onChange={(e) => {
                        setSubject(e.target.value);
                        setErr('');
                     }}
                  />
                  <br />
                  <Form.Group className="mb-3">
                     <Form.Label> Description </Form.Label>
                     <StyledTextArea
                        as="textarea"
                        placeholder="I like going here because the owner is very nice..."
                        rows={4}
                        maxLength={CONTENTMAXLENGTH}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                     ></StyledTextArea>
                  </Form.Group>
               </Form.Group>
            </Form>
         </Modal.Body>
         <Modal.Footer>
            <StyledButton onClick={props.handleClose}>Cancel</StyledButton>
         </Modal.Footer>
      </Modal>
   );
};

//Should hitting cancel clear their review state or keep it?

export default WriteReviewModal;
