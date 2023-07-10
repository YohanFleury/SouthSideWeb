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
}

const CommentItem = ({ displayName, content, date, onDelete, username, authorId }: CommentItemProps) => {
  
  // State
  const [profilPicture, setProfilPicture] = useState<any>(undefined)

  // Redux
  const currentUser = useAppSelector(state => state.context.currentUser)

  // API
  const getProfilPictureApi = useApi(users.getProfilPicture)

  // Effects
  useEffect(() => {
    getProfilPictureApi.request(authorId)
   }, [])

   useEffect(() => {
    if(getProfilPictureApi.success) {
       console.log('Photo profil bien récupérée dans les commentaires!', getProfilPictureApi.data)
       setProfilPicture(arrayBufferToBase64(getProfilPictureApi.data))
    } else if(getProfilPictureApi.error) {
       console.log('Error [Get creator picture / Drawer]')
    }
    }, [getProfilPictureApi.success, getProfilPictureApi.error, getProfilPictureApi.data])

  return (
    <Container>
      <LeftContainer>
        <ProfilPicture size={40} source={`data:image/jpg;base64,${profilPicture}`} />
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
    width: 15%;  /* Ajuster cette valeur en fonction de vos besoins */
    margin-bottom: 10px
`;

const RightContainer = styled.div`
    padding: 5px;
    width: 85%;  /* Ajuster cette valeur en fonction de vos besoins */
`;

export default CommentItem