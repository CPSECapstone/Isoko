import React from 'react';
import styled from 'styled-components';
import { Modal } from 'react-bootstrap';
import StyledButton from '../styles/StyledButton';
import { Link } from 'react-router-dom';

const StyledText = styled.div`
   font-family: Open Sans;
   font-size: 0.9rem;
`;

interface RestrictedModalProps extends React.HTMLProps<HTMLDivElement> {
   show: boolean;
   handleClose: () => void;
}

const RestrictedModal: React.FC<RestrictedModalProps> = (props) => {
   return (
      <Modal show={props.show} onHide={props.handleClose}>
         <Modal.Header closeButton>
            <Modal.Title>Account Required</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <StyledText>
               Thank you for using ISOKO! To prevent against spam and malicious
               users, you will need to create an account to perform this action.
               To create an account, head on over to our{' '}
               <Link to="/signup">Signup</Link> page and create an account. If
               you already have an account, you can{' '}
               <Link to="/login">Login</Link>.
            </StyledText>
         </Modal.Body>
         <Modal.Footer>
            <StyledButton onClick={props.handleClose}>Close</StyledButton>
         </Modal.Footer>
      </Modal>
   );
};

export default RestrictedModal;
