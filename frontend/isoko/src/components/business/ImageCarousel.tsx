import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styled from 'styled-components';
import { ArrowProps } from 'react-multi-carousel/lib/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faChevronRight,
   faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';

const CarouselContainer = styled.div`
   width: 100%;
`;

const Photo = styled.img`
   height: 95%;
   width: 95%;
   border-radius: 5px;
   object-fit: cover;
   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const RightArrow = styled(FontAwesomeIcon)`
   position: absolute;
   right: 15px;
   cursor: pointer;
   font-size: 2.5em;
`;

const LeftArrow = styled(FontAwesomeIcon)`
   position: absolute;
   left: 15px;
   cursor: pointer;
   font-size: 2.5em;
`;

interface CarouselProps extends React.HTMLProps<HTMLDivElement> {
   images: string[];
}

const CustomRightArrow = ({ onClick }: ArrowProps) => (
   <RightArrow icon={faChevronRight} onClick={onClick} />
);

const CustomLeftArrow = ({ onClick }: ArrowProps) => (
   <LeftArrow icon={faChevronLeft} onClick={onClick} />
);

const ImageCarousel: React.FC<CarouselProps> = (props) => {
   let images = props.images;
   if (images.length < 3) {
      // if there's one image this will result in [1, 1, 1]
      // if there's two images this will result in [1, 2, 1, 2, 1, 2]
      images = [...images, ...images, ...images];
   }

   return (
      <CarouselContainer className={props.className}>
         <Carousel
            responsive={{
               all: {
                  items: 3,
                  breakpoint: { max: 5000, min: 0 },
               },
            }}
            arrows={true}
            customRightArrow={<CustomRightArrow />}
            customLeftArrow={<CustomLeftArrow />}
            draggable={false}
            infinite={true}
         >
            {images.map((img, idx) => (
               <Photo src={img} key={idx} />
            ))}
         </Carousel>
      </CarouselContainer>
   );
};

export default ImageCarousel;
