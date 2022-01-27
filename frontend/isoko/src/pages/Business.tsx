import React from 'react';
import BusinessHeader from '../components/business/BusinessHeader';

const Business = () => (
   <main>
      <h1>Business Listing</h1>
      <BusinessHeader
         name="Bob's Burgers"
         description="Bob rallies the team to cook up some business, so he sends middle child Gene to push something or other here this is long"
         stars={3}
         minorityTags={['Black-Owned']}
         keywordTags={['Burgers']}
         verified={true}
         numReviews={80}
      />
   </main>
);

export default Business;
