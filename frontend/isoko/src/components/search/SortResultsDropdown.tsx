import React, { useState } from 'react';
import styled from 'styled-components';
import { Dropdown, DropdownButton } from 'react-bootstrap';

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

      &.dropdown-toggle {
         color: black;
         background-color: #fbfbfb;
         border: none;
      }
   }

   .btn {
      text-decoration: underline;
   }
`;

interface SortDropdownProps extends React.HTMLProps<HTMLDivElement> {
   sortFunction: (key: string) => void;
}

const SortResultsDropdown: React.FC<SortDropdownProps> = (props) => {
   const [sortKey, setSortKey] = useState('Recently added');

   return (
      <StyledDropdownButton title={sortKey}>
         <Dropdown.Item as="button">
            <div
               onClick={(e) => {
                  setSortKey(e.target.textContent);
                  props.sortFunction('recent');
               }}
            >
               Recently added
            </div>
         </Dropdown.Item>
         <Dropdown.Item as="button">
            <div
               onClick={(e) => {
                  setSortKey(e.target.textContent);
                  props.sortFunction('reviews');
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
   );
};

export default SortResultsDropdown;
