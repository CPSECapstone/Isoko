import React from 'react';
import ListBusiness from '../ListBusiness';

interface updateInfoProps extends React.HTMLProps<HTMLDivElement> {
   setActiveComponent: (text: string) => void;
}
const UpdateInfo: React.FC<updateInfoProps> = (props) => (
   <main>
      <h1>Business Dashboard Update Info</h1>
      <ListBusiness
         name="Bob's Burgers"
         city="San Luis Obispo"
         state="CA"
         street="1 Grand Ave"
         zip="93405"
         ownerName="Bob Belcher"
         ownerDesc="My name is Bob, idrk much about myself, as I've never seen this show but oh well!!"
         ownerPhone="805-222-3333"
         hours={{
            Mon: '9:00am-5:00pm',
            Tue: '9:00am-5:00pm',
            Fri: '9:00am-5:00pm',
            Sat: '8:00am-10:00pm',
         }}
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
         description="Bob rallies the team to cook up some business, so he sends middle child Gene to push something or other here this is long this is long this is long this is long this is long this is long this is long this is long this is long"
         stars={3}
         minorityTags={['Black Owned']}
         category="Food"
         keywordTags={['Burgers']}
         verified={true}
         numReviews={80}
         setActiveComponent={props.setActiveComponent}
      />
   </main>
);

export default UpdateInfo;
