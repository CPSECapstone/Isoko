import React, { useState } from 'react';
import styled from 'styled-components';
import StyledButton from '../../styles/StyledButton';
import { Modal, Row, Col, Container } from 'react-bootstrap';

const ModalTagRow = styled(Row)`
   display: flex;
   justify-content: left;
   padding-bottom: 5px;
`;

const ModalTagCol = styled(Col)`
   display: flex;
   align-self: flex-start;
`;

interface AddTagModalProps extends React.HTMLProps<HTMLDivElement> {
   show: boolean;
   selectedTags: string[];
   allTags: string[];
   handleClose: () => void;
   applyNewTags: (e: MouseEvent, tags: string[]) => void;
}

const AddTagModal: React.FC<AddTagModalProps> = (props) => {
   const newTags = [];

   // handle when a user clicks a minority tag in the Add Tags modal
   const addTag = (id) => {
      const btn = document.getElementById(id);

      if (props.selectedTags.includes(id)) {
         btn.style.background = '#fff';
         btn.style.color = '#F97D0B';
         const index = newTags.indexOf(id);
         newTags.splice(index, 1);
         // const index = props.selectedTags.indexOf(id);
         // props.selectedTags.splice(index, 1);
      } else {
         btn.style.background = '#F97D0B';
         btn.style.color = '#fff';
         newTags.push(id);
         //props.selectedTags.push(id);
      }
   };

   // build rows of minority tags in the Add Tags modal
   const renderRows = () => {
      const fullList = [];
      const finalArr = [];
      let columns = [];

      props.selectedTags.forEach((m, i) => {
         fullList.push(m);
         newTags.push(m);
      });

      // remove tags that are already selected
      props.allTags.forEach((t, i) => {
         if (!props.selectedTags.includes(t)) {
            fullList.push(t);
         }
      });

      fullList.forEach((tag, i) => {
         if (props.selectedTags.includes(tag)) {
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
      <Modal show={props.show} onHide={props.handleClose}>
         <Modal.Header closeButton>
            <Modal.Title>Business Tags</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <Container>{renderRows()}</Container>
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
