import React, { useState } from 'react';
import styled from 'styled-components';
import StyledButton from '../../styles/StyledButton';
import { Modal, Row, Col, Container } from 'react-bootstrap';

const ModalTagCol = styled(Col)`
   margin-bottom: 5px;
`;

interface AddTagModalProps extends React.HTMLProps<HTMLDivElement> {
   show: boolean;
   selectedTags: string[];
   allTags: string[];
   handleClose: () => void;
   applyNewTags: (e: MouseEvent, tags: string[]) => void;
}

const AddTagModal: React.FC<AddTagModalProps> = (props) => {
   const newTags = [...props.selectedTags];

   // handle when a user clicks a minority tag in the Add Tags modal
   const addTag = (id) => {
      const btn = document.getElementById(id);

      if (props.selectedTags.includes(id)) {
         btn.style.background = '#fff';
         btn.style.color = '#F97D0B';
         const index = newTags.indexOf(id);
         newTags.splice(index, 1);
      } else {
         btn.style.background = '#F97D0B';
         btn.style.color = '#fff';
         newTags.push(id);
      }
   };

   return (
      <Modal show={props.show} onHide={props.handleClose}>
         <Modal.Header closeButton>
            <Modal.Title>Business Tags</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <Container>
               <Row>
                  {props.allTags.map((tag, index) => (
                     <ModalTagCol md={4} key={index}>
                        <StyledButton
                           key={index}
                           id={tag}
                           primary={
                              props.selectedTags.includes(tag) ? true : false
                           }
                           onClick={() => addTag(tag)}
                        >
                           {tag}
                        </StyledButton>
                     </ModalTagCol>
                  ))}
               </Row>
            </Container>
         </Modal.Body>
         <Modal.Footer>
            <StyledButton onClick={props.handleClose}>Cancel</StyledButton>
            <StyledButton
               primary
               onClick={(e) => props.applyNewTags(e, newTags)}
            >
               Confirm
            </StyledButton>
         </Modal.Footer>
      </Modal>
   );
};

export default AddTagModal;
