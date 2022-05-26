import React, { useState } from 'react';
import styled from 'styled-components';
import {
   ResponsiveContainer,
   LineChart,
   Line,
   XAxis,
   YAxis,
   Label,
   CartesianGrid,
   Tooltip,
   Legend,
} from 'recharts';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useAppSelector } from '../../app/hooks';

const yearTestData = [
   {
      name: '2019',
      uv: 4000,
      value: 430,
      amt: 430,
   },
   {
      name: '2020',
      uv: 3000,
      value: 1398,
      amt: 1398,
   },
   {
      name: '2021',
      uv: 2000,
      value: 1742,
      amt: 1742,
   },
   {
      name: '2022',
      uv: 2780,
      value: 1231,
      amt: 1231,
   },
];

const monthTestData = [
   {
      name: 'January',
      uv: 4000,
      value: 61,
      amt: 61,
   },
   {
      name: 'February',
      uv: 3000,
      value: 92,
      amt: 92,
   },
   {
      name: 'March',
      uv: 2000,
      value: 112,
      amt: 112,
   },
   {
      name: 'April',
      uv: 2780,
      value: 77,
      amt: 77,
   },
   {
      name: 'May',
      uv: 2780,
      value: 80,
      amt: 80,
   },
   {
      name: 'June',
      uv: 2780,
      value: 12,
      amt: 12,
   },
];

const weekTestData = [
   {
      name: 'May 5',
      uv: 2780,
      value: 10,
      amt: 10,
   },
   {
      name: 'May 12',
      uv: 2780,
      value: 14,
      amt: 14,
   },
   {
      name: 'May 19',
      uv: 2000,
      value: 12,
      amt: 12,
   },

   {
      name: 'May 26',
      uv: 3000,
      value: 15,
      amt: 15,
   },
   {
      name: 'June 2',
      uv: 4000,
      value: 23,
      amt: 23,
   },
];

const dayTestData = [
   {
      name: 'May 27',
      uv: 2780,
      value: 3,
      amt: 3,
   },
   {
      name: 'May 28',
      uv: 2780,
      value: 2,
      amt: 2,
   },
   {
      name: 'May 29',
      uv: 2780,
      value: 2,
      amt: 2,
   },
   {
      name: 'May 30',
      uv: 2780,
      value: 1,
      amt: 1,
   },
   {
      name: 'May 31',
      uv: 2000,
      value: 6,
      amt: 6,
   },
   {
      name: 'June 1',
      uv: 3000,
      value: 3,
      amt: 3,
   },
   {
      name: 'June 2',
      uv: 4000,
      value: 4,
      amt: 4,
   },
];

const yearTestDataRating = [
   {
      name: '2019',
      uv: 5,
      value: 3.7,
      amt: 3.7,
   },
   {
      name: '2020',
      uv: 5,
      value: 3.9,
      amt: 3.9,
   },
   {
      name: '2021',
      uv: 5,
      value: 4.4,
      amt: 4.4,
   },
   {
      name: '2022',
      uv: 5,
      value: 4.8,
      amt: 4.8,
   },
];

const monthTestDataRating = [
   {
      name: 'January',
      uv: 5,
      value: 3.2,
      amt: 3.2,
   },
   {
      name: 'February',
      uv: 5,
      value: 3.7,
      amt: 3.7,
   },
   {
      name: 'March',
      uv: 5,
      value: 3.9,
      amt: 3.9,
   },
   {
      name: 'April',
      uv: 5,
      value: 3.7,
      amt: 3.7,
   },
   {
      name: 'May',
      uv: 5,
      value: 4.0,
      amt: 4.0,
   },
   {
      name: 'June',
      uv: 5,
      value: 4.7,
      amt: 4.7,
   },
];

const weekTestDataRating = [
   {
      name: 'May 5',
      uv: 5,
      value: 3.2,
      amt: 3.2,
   },
   {
      name: 'May 12',
      uv: 5,
      value: 4.1,
      amt: 4.1,
   },
   {
      name: 'May 19',
      uv: 5,
      value: 3.6,
      amt: 3.6,
   },

   {
      name: 'May 26',
      uv: 5,
      value: 4.4,
      amt: 4.4,
   },
   {
      name: 'June 2',
      uv: 5,
      value: 4.6,
      amt: 4.6,
   },
];

const dayTestDataRating = [
   {
      name: 'May 27',
      uv: 5,
      value: 3,
      amt: 3,
   },
   {
      name: 'May 28',
      uv: 5,
      value: 2.5,
      amt: 2.5,
   },
   {
      name: 'May 29',
      uv: 5,
      value: 0,
      amt: 0,
   },
   {
      name: 'May 30',
      uv: 5,
      value: 5.0,
      amt: 5.0,
   },
   {
      name: 'May 31',
      uv: 5,
      value: 3.5,
      amt: 3.5,
   },
   {
      name: 'June 1',
      uv: 5,
      value: 4.0,
      amt: 4.0,
   },
   {
      name: 'June 2',
      uv: 5,
      value: 4.7,
      amt: 4.7,
   },
];

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
   const [graphFrequency, setGraphFrequency] = useState('Day');
   const [startDay, setStartDay] = useState<Date>(oneWeekAgo);
   const [endDay, setEndDay] = useState<Date>(now);

   const [isActive, setActive] = useState(false);

   const toggleStartDayPicker = () => {
      setActive(!isActive);
   };

   const dashboardStore = useAppSelector((store) => store.dashboard);
   console.log('STORE: ', dashboardStore);
   console.log('Analytics: ', dashboardStore.analytics);

   const getCorrectData = () => {
      if (graphFrequency === 'Day') {
         return graphType === 'Page Views' ? dayTestData : dayTestDataRating;
      } else if (graphFrequency === 'Week') {
         return graphType === 'Page Views' ? weekTestData : weekTestDataRating;
      } else if (graphFrequency === 'Month') {
         return graphType === 'Page Views'
            ? monthTestData
            : monthTestDataRating;
      } else if (graphFrequency === 'Year') {
         return graphType === 'Page Views' ? yearTestData : yearTestDataRating;
      }
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
                     <div
                        onClick={() => {
                           setGraphFrequency('Day');
                           const oneWeekAgo = new Date();
                           oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                           setStartDay(oneWeekAgo);
                        }}
                     >
                        Day
                     </div>
                  </Dropdown.Item>
                  <Dropdown.Item as="button">
                     <div
                        onClick={() => {
                           setGraphFrequency('Week');
                           const oneMonthAgo = new Date();
                           oneMonthAgo.setDate(oneMonthAgo.getDate() - 35);
                           setStartDay(oneMonthAgo);
                        }}
                     >
                        Week
                     </div>
                  </Dropdown.Item>
                  <Dropdown.Item as="button">
                     <div
                        onClick={() => {
                           setGraphFrequency('Month');
                           const sixMonthsAgo = new Date();
                           sixMonthsAgo.setDate(sixMonthsAgo.getDate() - 150);
                           setStartDay(sixMonthsAgo);
                        }}
                     >
                        Month
                     </div>
                  </Dropdown.Item>
                  <Dropdown.Item as="button">
                     <div
                        onClick={() => {
                           setGraphFrequency('Year');
                           const fourYearsAgo = new Date();
                           fourYearsAgo.setDate(
                              fourYearsAgo.getDate() - 365 * 3
                           );
                           setStartDay(fourYearsAgo);
                        }}
                     >
                        Year
                     </div>
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
                     footer={'Select your end date'}
                  />
               </StyledDropdownButton>
            </div>
         </OptionContainer>
         <ResponsiveContainer maxHeight={300} width="85%" minHeight={250}>
            <LineChart
               width={500}
               height={300}
               data={getCorrectData()}
               margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
               }}
            >
               <CartesianGrid strokeDasharray="3 3" />
               <XAxis dataKey="name">
                  <Label value="Dates" offset={0} position="insideBottom" />
               </XAxis>
               <YAxis>
                  <Label value={graphType} angle={-90} position="insideLeft" />
               </YAxis>
               <Tooltip />
               <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#F97D0B"
                  activeDot={{ r: 8 }}
               />
            </LineChart>
         </ResponsiveContainer>
      </>
   );
};

export default CustomAnalytics;
