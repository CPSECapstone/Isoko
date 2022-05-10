import React, { useState } from 'react';
import styled from 'styled-components';
import { ResponsiveContainer } from 'recharts';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const OptionContainer = styled.div`
   display: flex;
   flex-direction: row;
   gap: 12px;
`;

const StyledDropdownButton = styled(DropdownButton)`
   color: #000;
   text-decoration: underline;
   font-size: 0.5rem;
   margin-top: -2px;

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

const StartDatePicker = styled(DayPicker)`
   display: hidden;
`;

const CustomAnalytics: React.FC = () => {
   const now = new Date();
   const oneWeekAgo = new Date();
   oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
   const [graphType, setGraphType] = useState('Page Views');
   const [graphFrequency, setGraphFrequency] = useState('Month');
   const [startDay, setStartDay] = useState<Date>(oneWeekAgo);
   const [endDay, setEndDay] = useState<Date>(now);

   const [isActive, setActive] = useState(false);

   const toggleStartDayPicker = () => {
      setActive(!isActive);
   };

   return (
      <>
         <OptionContainer>
            <div>
               <h2>I want to see</h2>
            </div>
            <div>
               <StyledDropdownButton title={graphType}>
                  <Dropdown.Item as="button">
                     <div onClick={() => setGraphType('Page Views')}>
                        Page Views
                     </div>
                  </Dropdown.Item>
                  <Dropdown.Item as="button">
                     <div onClick={() => setGraphType('Links Clicked')}>
                        Links Clicked
                     </div>
                  </Dropdown.Item>
                  <Dropdown.Item as="button">
                     <div onClick={() => setGraphType('Average Rating')}>
                        Average Rating
                     </div>
                  </Dropdown.Item>
               </StyledDropdownButton>
            </div>
            <div>
               <h2>Per</h2>
            </div>
            <div>
               <StyledDropdownButton title={graphFrequency}>
                  <Dropdown.Item as="button">
                     <div onClick={() => setGraphFrequency('Day')}>Day</div>
                  </Dropdown.Item>
                  <Dropdown.Item as="button">
                     <div onClick={() => setGraphFrequency('Week')}>Week</div>
                  </Dropdown.Item>
                  <Dropdown.Item as="button">
                     <div onClick={() => setGraphFrequency('Month')}>Month</div>
                  </Dropdown.Item>
                  <Dropdown.Item as="button">
                     <div onClick={() => setGraphFrequency('Year')}>Year</div>
                  </Dropdown.Item>
               </StyledDropdownButton>
            </div>
            <div>
               <h2>From</h2>
            </div>
            <div>
               <StyledDropdownButton
                  title={format(startDay, 'PPP')}
                  onClick={toggleStartDayPicker}
               >
                  <StartDatePicker
                     mode="single"
                     selected={startDay}
                     onSelect={setStartDay}
                     footer={'Select your start date'}
                  />
               </StyledDropdownButton>
            </div>
            <div>
               <h2>To</h2>
            </div>
            <div>
               <StyledDropdownButton
                  title={format(endDay, 'PPP')}
                  onClick={toggleStartDayPicker}
               >
                  <StartDatePicker
                     mode="single"
                     selected={endDay}
                     onSelect={setEndDay}
                     footer={'Select your start date'}
                  />
               </StyledDropdownButton>
            </div>
         </OptionContainer>
         <ResponsiveContainer
            height="100%"
            width="80%"
            minWidth={500}
            minHeight={250}
         >
            <div>Placeholder for graph</div>
         </ResponsiveContainer>
      </>
   );
};

export default CustomAnalytics;
