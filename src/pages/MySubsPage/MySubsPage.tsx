import React from 'react'
import styled from 'styled-components'
import CreatorCard from '../../components/CreatorCard/CreatorCard'
import { CustomHeader, CustomText } from '../../components/CustomedComponents'
import colors from '../../config/colors'
import { useAppSelector } from '../../redux/store'

const MySubsPage = () => {
    const subsList = useAppSelector(state => state.context.subsList)
    return (
      <MainContainer>
          <CustomHeader title='Abonnements' />
          {
              subsList.map(el => (
                <div style={{alignSelf: 'center', margin: 10}}>
                    <CreatorCard username={el.username} name={el.displayName} creatorPicture={'undefined'} />
                </div>
              ))
          }
          {
              subsList.length === 0 &&
              <CustomText style={{margin: 30}}>Vous n'avez aucun abonnement pour le moment !</CustomText>
          }
      </MainContainer>
    )
}

const MainContainer = styled.div`
  background-color: ${colors.dark.background};
  display: flex;
  flex-direction: column;
  flex: 1;
  border-left: 0.5px solid ${colors.lightDark};
  border-right: 0.5px solid ${colors.lightDark};
  margin: auto;
  position: relative;
  min-height: 800px;
`;

export default MySubsPage