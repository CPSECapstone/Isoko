import React from 'react';
import { Link } from 'react-router-dom';

const ProtectedPage: React.FC = () => (
   <main>
      <h1>Oops, it looks like you don&apos;t have access to this page. </h1>
      <h1>
         <Link to="/">Click Here</Link> to return to the home page!
      </h1>
   </main>
);

export default ProtectedPage;
