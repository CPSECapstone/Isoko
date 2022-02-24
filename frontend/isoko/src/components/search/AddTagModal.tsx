import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import StyledButton from '../../styles/StyledButton';
import minorityGroups from '../../constants/minorityGroups';
import { Modal, Row, Col, Container } from 'react-bootstrap';

const ModalTagCol = styled(Col)`
   margin-bottom: 5px;
`;

interface AddTagModalProps extends React.HTMLProps<HTMLDivElement> {
   show: boolean;
   selectedTags: string[];
   handleClose: () => void;
   applyNewTags: (e: MouseEvent, tags: string[]) => void;
}

const AddTagModal: React.FC<AddTagModalProps> = (props) => {
   //const newTags = [...props.selectedTags];
   const allTags = [...minorityGroups];
   // const [chosenTags, setChosenTags] = useState(props.selectedTags);
   // useEffect(() => { setChosenTags(props.selectedTags), [props.selectedTags]});

   const newTags = [];
   const tags = [];
   allTags.forEach((t, i) => {
      console.log('here');
      let tagObject;
      if (props.selectedTags.includes(t)) {
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
   // const tags = [
   //    {
   //       text: 'Black-Owned',
   //       selected: true,
   //    },
   //    {
   //       text: 'Asian-Owned',
   //       selected: true,
   //    },
   //    {
   //       text: 'Viet-Owned',
   //       selected: false,
   //    },
   // ];

   const [tagState, setTagState] = useState(tags);
   console.log('tag state');
   console.log(tagState);
   useEffect(() => {
      setTagState(tags);
   }, [props.selectedTags]);

   const onTagClicked = (idx) => {
      const updatedTagState = [...tagState];
      updatedTagState[idx].selected = !updatedTagState[idx].selected;
      setTagState(updatedTagState);
   };

   const addNewTags = () => {
      tagState.forEach((t, i) => {
         if (t.selected) {
            newTags.push(t.text);
         }
      });
   };

   // handle when a user clicks a minority tag in the Add Tags modal
   // const addTag = (id) => {
   //    const btn = document.getElementById(id);

   //    if (props.selectedTags.includes(id)) {
   //       btn.style.background = '#fff';
   //       btn.style.color = '#F97D0B';
   //       const index = newTags.indexOf(id);
   //       newTags.splice(index, 1);
   //    } else {
   //       btn.style.background = '#F97D0B';
   //       btn.style.color = '#fff';
   //       newTags.push(id);
   //    }
   // };

   return (
      <Modal show={props.show} onHide={props.handleClose}>
         <Modal.Header closeButton>
            <Modal.Title>Business Tags</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <Container>
               <Row>
                  {/* {props.allTags.map((tag, index) => (
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
                  ))} */}

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
               onClick={(e) => {
                  addNewTags();
                  props.applyNewTags(e, newTags);
               }}
            >
               Confirm
            </StyledButton>
         </Modal.Footer>
      </Modal>
   );
};

export default AddTagModal;
