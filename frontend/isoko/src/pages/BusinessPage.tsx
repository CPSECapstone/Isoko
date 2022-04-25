import React from 'react';
import Business from '../components/business/Business';

const BusinessPage: React.FC = () => {
   return (
      <main>
         <Business
            showInPreview={true}
            businessDetails={{
               businessId: 'fake-data',
               name: "Bob's Burgers",
               type: 'B&M',
               shortDesc:
                  'Bob rallies the team to cook up some business, so he sends middle child Gene to push something or other here this is long this is long this is long this is long this is long this is long this is long this is long this is long',
               rating: 3.5,
               tags: ['Black-Owned'],
               keywords: ['Burgers'],
               claimed: true,
               numReviews: 3,
               aboutOwner: {
                  photo: 'https://www.pluggedin.com/wp-content/uploads/2020/01/bobs-burgers-review-image.jpg',
                  ownerDesc: `My name is Bill and I am the proud owner of Bill’s Diner. 
               For the past 15 years I’ve been in the restuarant industry and 
               I’ve always been a proud black business owner. As a black 
               business owner some of the things I value is seving authentic 
               and delicious food to the great community here in San Luis Obispo. 
               Come on down to Bill’s Diner and don’t be afraid to say hi if 
               you see me there!`,
               },
               hours: {
                  Mon: '9:00am-5:00pm',
                  Tue: '9:00am-5:00pm',
                  Fri: '9:00am-5:00pm',
               },
               street: '626 Broad St.',
               city: 'San Luis Obispo',
               zip: '93405',
               state: 'CA',
               links: {
                  Website: 'https://isoko.com/',
                  Menu: 'https://isoko.com/menu',
               },
               reviews: [
                  {
                     reviewAuthor: 'Christina',
                     authorUserName: 'randomUser',
                     authorProfilePicture:
                        'https://www.unh.edu/unhtoday/sites/default/files/styles/article_huge/public/article/2019/professional_woman_headshot.jpg?itok=3itzxHXh',
                     rating: 4,
                     reviewTitle: 'Great',
                     description: 'Was pretty good. Could have better service',
                     pictures: [
                        'https://images.unsplash.com/photo-1587410131477-f01b22c59e1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dGFsbCUyMHRvd2VyfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
                        'https://www.pluggedin.com/wp-content/uploads/2020/01/bobs-burgers-review-image.jpg',
                        'https://www.robin-noorda.com/uploads/1/6/8/3/16830688/3347022_orig.jpg',
                     ],
                     ts: 1645923559,
                  },
                  {
                     reviewAuthor: 'Jerry',
                     authorUserName: 'randomUser2',
                     authorProfilePicture:
                        'https://d5t4h5a9.rocketcdn.me/wp-content/uploads/2021/04/Website-Photo-18.png',
                     rating: 3,
                     reviewTitle: 'Okay',
                     description: 'Wanted more food.',
                     pictures: [
                        'https://www.pluggedin.com/wp-content/uploads/2020/01/bobs-burgers-review-image.jpg',
                        'https://static3.srcdn.com/wordpress/wp-content/uploads/2020/02/Arrested-Development-Banana-Stand.jpg',
                     ],
                     ts: 1631235559,
                  },
                  {
                     reviewAuthor: 'William',
                     authorUserName: 'randomUser3',
                     authorProfilePicture:
                        'https://srkheadshotday.com/wp-content/uploads/Herman_Man_Headshot_19G1006.jpg',
                     rating: 2,
                     reviewTitle: 'Mid',
                     description:
                        "Didn't know food could be so mid. Owner seems chill though",
                     pictures: [
                        'https://www.pluggedin.com/wp-content/uploads/2020/01/bobs-burgers-review-image.jpg',
                     ],
                     ts: 1637715559,
                  },
               ],
               photos: [
                  'https://www.thebossykitchen.com/wp-content/uploads/2021/05/French-fries-720x720.jpg',
                  'https://www.thecookierookie.com/wp-content/uploads/2018/04/how-to-broil-hamburgers-broiled-hamburger-recipe-7-of-9.compressed-copy.jpg',
                  'https://www.drinkstuff.com/productimg/104599_large.jpg',
                  'https://www.thebossykitchen.com/wp-content/uploads/2021/05/French-fries-720x720.jpg',
                  'https://www.thecookierookie.com/wp-content/uploads/2018/04/how-to-broil-hamburgers-broiled-hamburger-recipe-7-of-9.compressed-copy.jpg',
                  'https://www.drinkstuff.com/productimg/104599_large.jpg',
               ],
            }}
         />
      </main>
   );
};

export default BusinessPage;
