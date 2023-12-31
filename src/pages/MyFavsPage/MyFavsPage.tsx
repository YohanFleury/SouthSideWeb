import React from 'react'
import styled from 'styled-components';
import CreatorCard from '../../components/CreatorCard/CreatorCard';
import { CustomHeader, CustomText } from '../../components/CustomedComponents';
import colors from '../../config/colors';
import { useAppSelector } from '../../redux/store';

const MyFavsPage = () => {
    const favsList = useAppSelector(state => state.context.favoritesList)
    console.log(favsList)
  return (
    <MainContainer>
        <CustomHeader title='Favoris' />
        <div style={{height: '100%'}}>

        {
            favsList.map(el => (
                <div style={{alignSelf: 'center', margin: 10}}>
                    <CreatorCard username={el.username} name={el.displayName} creatorPicture={el.creator.image} />
                </div>
            ))
        }
        {
            favsList.length === 0 &&
            <CustomText style={{margin: 30}}>Vous n'avez aucun favori pour le moment !</CustomText>
        }
        </div>
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
export default MyFavsPage



