import React from 'react';
import {
   Bar,
   BarChart,
   CartesianGrid,
   Label,
   Tooltip,
   XAxis,
   YAxis,
   ResponsiveContainer,
} from 'recharts';

interface RatingCounts {
   rating: number;
   count: number;
}

interface RatingGraphProps extends React.HTMLProps<HTMLDivElement> {
   ratings: RatingCounts[];
}

const RatingGraph: React.FC<RatingGraphProps> = (props) => {
   return (
      <ResponsiveContainer
         height="100%"
         width="80%"
         minWidth={500}
         minHeight={250}
      >
         <BarChart data={props.ratings}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="rating">
               <Label value="Stars Given" offset={0} position="insideBottom" />
            </XAxis>
            <YAxis>
               <Label value="Total Ratings" angle={-90} position="insideLeft" />
            </YAxis>
            <Tooltip />
            <Bar dataKey="count" fill="#fd9e2e" />
         </BarChart>
      </ResponsiveContainer>
   );
};

export default RatingGraph;
