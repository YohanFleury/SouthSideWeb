import React from 'react'
import styled from 'styled-components';
import colors from '../../config/colors';
import { CustomText } from '../CustomedComponents';
import ProfilPicture from '../ProfilPicture/ProfilPicture';
import { BiRightArrow } from "react-icons/bi";

const ResearchResults = () => {
  return (
    <MainContainer>
        <ItemContainer>
            <InfosCreator>
                <div style={{backgroundColor: 'pink'}}>

                <ProfilPicture source='' onPress={() => null} size={45} />
                </div>
                <NamingContainer>
                    <CustomText style={{fontSize: 18, marginBottom: 2}}>
                        Kaaris
                    </CustomText>
                    <CustomText style={{fontSize: 13, color: colors.medium}}>@kaaris93270</CustomText>
                </NamingContainer>
            </InfosCreator>
            <BiRightArrow color='white' size={13} />
        </ItemContainer>
    </MainContainer>
  )
}

const MainContainer = styled.div`
  background-color: ${colors.dark.background};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.5px solid ${colors.lightDark};
  width: 80%;
`;

const InfosCreator = styled.div`
  display: flex;  
`;

const NamingContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px
`;

export default ResearchResults