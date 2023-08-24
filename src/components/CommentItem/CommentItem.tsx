import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import users from '../../api/users'
import colors from '../../config/colors';
import { arrayBufferToBase64 } from '../../config/utils/arrayBufferToBase64';
import { convertTimeFormat } from '../../config/utils/ocnvertTimeFormat';
import useApi from '../../hooks/useApi/useApi'
import { useAppSelector } from '../../redux/store';
import { CustomText } from '../CustomedComponents';
import ProfilPicture from '../ProfilPicture/ProfilPicture';

interface CommentItemProps {
  displayName: string;
  username: string;
  content: string;
  date: string;
  onDelete?: () => void;
  authorId: number;
  profilPicture: string;
}

const CommentItem = ({ displayName, content, date, onDelete, username, authorId, profilPicture }: CommentItemProps) => {
  

  // Redux
  const currentUser = useAppSelector(state => state.context.currentUser)

  // API
  const getProfilPictureApi = useApi(users.getProfilPicture)

  // Effects
  useEffect(() => {
    getProfilPictureApi.request(authorId)
   }, [])

  return (
    <Container>
      <LeftContainer>
        <ProfilPicture size={40} source={profilPicture} />
      </LeftContainer>
      <RightContainer>
        <Header>
          <CustomText style={{fontSize: 14, fontWeight: 'bold'}}>{displayName}</CustomText>
          <CustomText style={{fontSize: 14, color: colors.medium}}>{convertTimeFormat(date)}</CustomText>
        </Header>
        <CustomText style={{fontSize: 15,}}>{content}</CustomText>
      </RightContainer>
    </Container>
  )
}


const Container = styled.div`
    display: flex;
    flex-direction: row;
    padding: 10px;

`;

const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;
`;

const LeftContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 10px;
    margin-right: 5px;
`;

const RightContainer = styled.div`
    padding: 5px;
    width: 100%;  /* Ajuster cette valeur en fonction de vos besoins */
`;

export default CommentItem