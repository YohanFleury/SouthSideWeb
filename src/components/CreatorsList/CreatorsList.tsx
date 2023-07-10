import React from 'react'
import styled from 'styled-components';
import CreatorCard from '../CreatorCard/CreatorCard';
import { CustomText } from '../CustomedComponents';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

type CreatorsListProps = {
    data: any[];
    title?: string;
}

const CreatorsList: React.FC<CreatorsListProps> = ({data, title })=> {
    const dataArray = data || []
    const settings = {
      dots: true,
      arrows: true,
      infinite: false,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 2,
      initialSlide: 0,
      nextArrow: <div style={{backgroundColor: "pink", display: "block"}} />,
      prevArrow: <div style={{backgroundColor: "pink", display: "block"}} />,
    };
  return (
    <ListContainer>
    <CustomText>{title}</CustomText>  
    <Slider {...settings} >
      {
    dataArray.map((creator, index) => (
        <CreatorCard
            key={index}
            username={creator.username}
            name={creator.displayName}
            creatorId={creator.id}
        />
    ))
 }

  </Slider> 
    </ListContainer>
  )
}


const ListContainer = styled.div`
  width: 100%;
  min-width: 100%;
  max-width: 100%;
  padding: 10px;
  overflow: hidden;
  margin-top: 20px
`;



export default CreatorsList
{/* {
    dataArray.map((creator, index) => (
      <SwiperSlide>
        <CreatorCard
            key={index}
            username={creator.username}
            name={creator.displayName}
            creatorId={creator.id}
            onPress={() => console.log('Pressed: ', creator.username)}
        />
      </SwiperSlide>
    ))
 */}