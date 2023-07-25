import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { CustomHeader, CustomInput, CustomText } from '../../components/CustomedComponents';
import users from '../../api/users';
import CreatorCard from '../../components/CreatorCard/CreatorCard';
import colors from '../../config/colors';
import useApi from '../../hooks/useApi/useApi';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import djj from '../../assets/djjj.jpg'
import emi from '../../assets/emi.jpg'
import maxime from '../../assets/maxime.jpg'
import pablo from '../../assets/pablo.jpeg'
import CustomCarousel from '../../components/CustomCarousel/CustomCarousel';

const responsive = {
  largeDesktop: {
    breakpoint: { max: 3000, min: 1224 },
    items: 2,
    slidesToSlide: 1
  },
  desktop: {
    breakpoint: { max: 1223, min: 700 },
    items: 2,
    slidesToSlide: 1
  },
  tablet: {
    breakpoint: { max: 699, min: 464 },
    items: 2,
    slidesToSlide: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1
  }
};


const ResearchPage = () => {

  // State
  const [textSearch, setTextSearch] = useState<string>('')

  // API
  const getCreatorsApi = useApi(users.getCreators)
  const getCreatorByUsernameAndDisplaynameApi = useApi(users.getCreatorByUsernameAndDisplayname)

  // Effects
  useEffect(() => {
    getCreatorsApi.request()
  }, [])

  useEffect(() => {
    textSearch.length > 0 &&
    getCreatorByUsernameAndDisplaynameApi.request(textSearch)
  }, [textSearch])

  useEffect(() => {
    if (getCreatorsApi.success) {
      console.log("Liste de créateurs récupérée !", getCreatorsApi.data)
    } else if (getCreatorsApi.error) {
      console.log('Erreur getCreators...')
    }
  }, [getCreatorsApi.success, getCreatorsApi.error, getCreatorsApi.data])

  // Function
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextSearch(event.target.value);
  };

  return (
    <MainContainer>
      <CustomHeader title='Recherche' />
      <InputContainer>
        <CustomInput
          placeholder='Rechercher un créateur' 
          onChange={handleChange} 
          value={textSearch}
        />
      </InputContainer>
      <div style={{margin: 10, marginTop: 20}}>
        <CustomText>Tendances</CustomText>
      </div>
      <CustomCarousel creators={getCreatorsApi.data} />
      <div style={{margin: 10, marginTop: 60}}>
        <CustomText>Suggestions</CustomText>
      </div>
      <CustomCarousel creators={getCreatorsApi.data} />
    </MainContainer>
  )
}

const MainContainer = styled.div`
  background-color: ${colors.dark.background};
  display: flex;
  flex-direction: column;
  width: 100%;
  border-left: 0.5px solid ${colors.lightDark};
  border-right: 0.5px solid ${colors.lightDark};
  margin: auto;
  position: relative;
  height: 100%;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
`;

export default ResearchPage

{/* <Carousel 
        swipeable={true}
        draggable={true}
        responsive={responsive}
        ssr={true}
        infinite={true}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
      >
{
  getCreatorsApi.data.map((creator: any) => (
    <CreatorCard 
      key={creator.id}
      username={creator.username}
      name={creator.displayName}
      creatorId={creator.id} />
  ))
}
      </Carousel> */}