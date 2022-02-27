import React, { useState } from 'react';
import styled from 'styled-components';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const StyledDropdownButton = styled(DropdownButton)`
   .btn-primary {
      background-color: #fbfbfb;
      color: black;
      border-color: #fbfbfb;
      border-radius: 5px;
      padding: 0px;
      font-size: 0.75rem;
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
   }
   .btn {
      text-decoration: underline;
   }
`;

interface SortDropdownProps extends React.HTMLProps<HTMLDivElement> {
   sortFunction: (key: string) => void;
}

const SortResultsDropdown: React.FC<SortDropdownProps> = (props) => {
   const [sortKey, setSortKey] = useState('Recently Added');

   return (
      <StyledDropdownButton className={props.className} title={sortKey}>
         <Dropdown.Item as="button">
            <div
               onClick={(e) => {
                  setSortKey((e.target as HTMLElement).textContent);
                  props.sortFunction('recent');
               }}
            >
               Recently Added
            </div>
         </Dropdown.Item>
         <Dropdown.Item as="button">
            <div
               onClick={(e) => {
                  setSortKey((e.target as HTMLElement).textContent);
                  props.sortFunction('highestRated');
               }}
            >
               Highest Rated
            </div>
         </Dropdown.Item>
         <Dropdown.Item as="button">
            <div
               onClick={(e) => {
                  setSortKey((e.target as HTMLElement).textContent);
                  props.sortFunction('lowestRated');
               }}
            >
               Lowest Rated
            </div>
         </Dropdown.Item>
      </StyledDropdownButton>
   );
};

export default SortResultsDropdown;
