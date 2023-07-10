import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import users from '../../api/users';
import CreatorCard from '../../components/CreatorCard/CreatorCard';
import CreatorsList from '../../components/CreatorsList/CreatorsList';
import { CustomHeader, CustomInput } from '../../components/CustomedComponents';
import colors from '../../config/colors';
import useApi from '../../hooks/useApi/useApi';

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

  // Fonction
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextSearch(event.target.value);
  };
  return (
    <MainContainer>
      <CustomHeader title='Recherche' />
      <CustomInput
        placeholder='Rechercher un créateur' 
        onChange={handleChange} 
        value={textSearch}
      />
      <div>
      <CreatorsList title='Tendances' data={getCreatorsApi.data} />
      <CreatorsList title='Suggestion' data={getCreatorsApi.data} />
      </div>
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

export default ResearchPage