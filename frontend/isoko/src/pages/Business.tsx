import React from 'react';
import styled from 'styled-components';
import Review from '../components/Review';
import BusinessHeader from '../components/business/BusinessHeader';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Title = styled.h1`
   font-size: 2.5em;
   text-align: left;
   padding: 0em 0em 0em 0.5em;
`;

const Photo = styled.img`
   height: 140px;
   width: 140px;
   margin: auto 0;
   border-radius: 5px;
   object-fit: cover;
   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const responsive = {
   superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
   },
   desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
   },
   tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
   },
   mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
   },
};

const Business = () => (
   <main>
      <h1>Business Listing</h1>
      <Carousel responsive={responsive}>
         <Photo src="https://picsum.photos/id/1018/1000/600/" />
         <Photo src="https://picsum.photos/id/1015/1000/600/" />
         <Photo src="https://picsum.photos/id/1019/1000/600/" />
         <Photo src="https://picsum.photos/id/1018/1000/600/" />
         <Photo src="https://picsum.photos/id/1015/1000/600/" />
         <Photo src="https://picsum.photos/id/1019/1000/600/" />
      </Carousel>
   </main>
);

export default Business;
