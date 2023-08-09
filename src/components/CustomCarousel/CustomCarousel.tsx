import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styled from 'styled-components';
import { CreatorObject } from '../../pages/ResearchPage/ResearchPage';
import CreatorCard from '../CreatorCard/CreatorCard';
import './MyCarouselStyles.css';

type Creators = {
    creators: any
}
const CustomCarousel = ({ creators }: Creators) => {
  const responsive = {
    largeDesktop: {
      breakpoint: { max: 3000, min: 1500 },
      items: 3,
      partialVisibilityGutter: 40,
    },
    desktop: {
      breakpoint: { max: 1500, min: 550 },
      items: 2,
      partialVisibilityGutter: 40,
    },
    mobile: {
      breakpoint: { max: 550, min: 0 },
      items: 1,
      partialVisibilityGutter: 40,
    }
  };

  return (
    <Carousel 
      swipeable={true}
      draggable={true}
      responsive={responsive}
      partialVisible
      
    >
      {creators.map((creator: CreatorObject) => (
        <CreatorCard 
        key={creator.id}
        username={creator.username}
        name={creator.displayName}
        creatorPicture={creator.creator.image}
         />
      ))}
    </Carousel>
  );
};

const CarouselContainer = styled.div`
  padding: 0 15px;
`;

export default CustomCarousel;
