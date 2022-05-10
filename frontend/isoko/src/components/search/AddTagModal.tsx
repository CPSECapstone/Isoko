import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import StyledButton from '../../styles/StyledButton';
import { Modal, Row, Col, Container } from 'react-bootstrap';

const ModalTagCol = styled(Col)`
   margin-bottom: 5px;
`;

interface Tags {
   text: string;
   selected: boolean;
}

interface AddTagModalProps extends React.HTMLProps<HTMLDivElement> {
   show: boolean;
   tags: Tags[];
   handleClose: () => void;
   applyNewTags: (tags: string[]) => void;
}

const AddTagModal: React.FC<AddTagModalProps> = (props) => {
   const [tagState, setTagState] = useState(props.tags);

   // When a tag is removed in SearchResults, update it here as well
   useEffect(() => {
      setTagState(props.tags);
   }, [props.tags]);

   const onTagClicked = (idx) => {
      const updatedTagState = tagState.map((tag, index) => {
         if (index === idx) {
            return {
               text: tag.text,
               selected: !tag.selected,
            };
         }
         return tag;
      });

      setTagState(updatedTagState);
   };

   const onModalSubmit = () => {
      const newTags = [];

      tagState.forEach((t) => {
         if (t.selected) {
            newTags.push(t.text);
         }
      });

      // Check for invalid new tag selection
      if (newTags.includes('Any Minority Owned') && newTags.length > 1) {
         alert(
            'Cannot search by "Any Minority Owned" and an additional minority group. Please pick one or the other and try again'
         );
      } else {
         props.applyNewTags(newTags);
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
                  {tagState.map((tag, index) => (
                     <ModalTagCol md={4} key={index}>
                        <StyledButton
                           key={tag.text}
                           primary={tag.selected}
                           onClick={() => onTagClicked(index)}
                        >
                           {tag.text}
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
               onClick={() => {
                  onModalSubmit();
               }}
            >
               Confirm
            </StyledButton>
         </Modal.Footer>
      </Modal>
   );
};

export default AddTagModal;
