import React from 'react';
import BusinessSidebar from '../components/businessPage/BusinessSidebar';

const Business = () => (
   <main>
      <h1>Business Listing</h1>
      <BusinessSidebar
         claimed={false}
         hours={{
            Mon: '9:00am-5:00pm',
            Tue: '9:00am-5:00pm',
            Fri: '9:00am-5:00pm',
         }}
         address="626 Broad"
         links={[
            {
               title: 'Website',
               link: 'https://isoko.com/',
            },
            {
               title: 'Menu',
               link: 'https://isoko.com/menu',
            },
         ]}
      />
   </main>
);

export default Business;
