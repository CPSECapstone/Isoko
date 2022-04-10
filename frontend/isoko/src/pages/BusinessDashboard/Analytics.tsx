import React from 'react';
import {
   LineChart,
   Line,
   BarChart,
   Bar,
   Cell,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   Legend,
   ResponsiveContainer,
} from 'recharts';

const data = [
   {
      name: '1',
      numReviews: 5,
   },
   {
      name: '2',
      numReviews: 10,
   },
   {
      name: '3',
      numReviews: 40,
   },
   {
      name: '4',
      numReviews: 50,
   },
   {
      name: '5',
      numReviews: 200,
   },
];

const data2 = [
   {
      name: '12-31-2020',
      pv: 2400,
   },
   {
      name: '01-31-2021',
      pv: 1398,
   },
   {
      name: '02-31-2021',
      pv: 9800,
   },
   {
      name: '03-31-2021',
      pv: 3908,
   },
];

const Analytics: React.FC = () => {
   return (
      <main>
         <h1>Compiling lol</h1>
         <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
               top: 5,
               right: 30,
               left: 20,
               bottom: 5,
            }}
         >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="numReviews" fill="#F97D0B" />
         </BarChart>
         <LineChart
            width={500}
            height={300}
            data={data2}
            margin={{
               top: 5,
               right: 30,
               left: 20,
               bottom: 5,
            }}
         >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
               type="monotone"
               dataKey="pv"
               stroke="#8884d8"
               activeDot={{ r: 8 }}
            />
         </LineChart>
      </main>
   );
};

export default Analytics;
