import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { CustomHeader, CustomInput, CustomText } from '../../components/CustomedComponents';
import users from '../../api/users';
import colors from '../../config/colors';
import useApi from '../../hooks/useApi/useApi';

import CustomCarousel from '../../components/CustomCarousel/CustomCarousel';
import ResearchResult from '../../components/ResearchResults/ResearchResults';
import { currentUser } from '../../redux/contextSlice/contextSlice';

import { MdClose } from 'react-icons/md';


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
console.log('Recherche: ', getCreatorByUsernameAndDisplaynameApi.data)
  return (
    <MainContainer>
      <CustomHeader title='Recherche' />
      <InputContainer>
        <CustomInput
          placeholder='Rechercher un créateur' 
          onChange={handleChange} 
          value={textSearch}
        />
        {textSearch.length > 0 &&
        <MdClose 
          onClick={() => setTextSearch('')}
          style={{position: 'absolute', right: 25, cursor: 'pointer'}} 
          size={22} 
          color='white' />}
      </InputContainer>
      {textSearch.length > 0 &&
      <ResearchResults>
        {!getCreatorByUsernameAndDisplaynameApi.loading &&
          getCreatorByUsernameAndDisplaynameApi.data.map((creator: currentUser) => (
            <ResearchResult 
              key={creator.id} 
              username={creator.username} 
              creatorId={creator.id} 
              displayName={creator.displayName} />
          ))
        }
        {
          getCreatorByUsernameAndDisplaynameApi.loading &&
          <CustomText>Chargement ...</CustomText>
        }
      </ResearchResults>}
      {textSearch.length == 0 &&
       <div style={{margin: 10, marginTop: 20}}>
        <CustomText>Tendances</CustomText>
      </div>}
      {textSearch.length == 0 &&
      <CustomCarousel creators={getCreatorsApi.data} />}
      {textSearch.length == 0 &&
      <div style={{margin: 10, marginTop: 60}}>
        <CustomText>Suggestions</CustomText>
      </div>}
      {textSearch.length == 0 &&
      <CustomCarousel creators={getCreatorsApi.data} />}
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
  min-height: 800px;
`;

const ResearchResults = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 600px;
  overflow-y: auto;

  @media (max-width: 768px) {
    max-height: 100vh;
  }
`;
const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  position: relative;
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