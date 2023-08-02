import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import colors from '../../config/colors';
import { CustomText } from '../CustomedComponents';
import ProfilPicture from '../ProfilPicture/ProfilPicture';
import { BiRightArrow } from "react-icons/bi";
import useApi from '../../hooks/useApi/useApi';
import users from '../../api/users';
import { arrayBufferToBase64 } from '../../config/utils/arrayBufferToBase64';
import { useNavigate } from 'react-router-dom';

type ResearchResultProps = {
    username: string;
    displayName: string;
    creatorId: number;
}

const ResearchResult = ({ username, displayName, creatorId }: ResearchResultProps) => {
    const navigate = useNavigate();
    const [profilPicture, setProfilPicture] = useState<any>()

    const getProfilPictureApi = useApi(users.getProfilPicture)

    useEffect(() => {
        getProfilPictureApi.request(creatorId)
     }, [])
   
     useEffect(() => {
        if(getProfilPictureApi.success) {
           setProfilPicture(arrayBufferToBase64(getProfilPictureApi.data))
        } else if(getProfilPictureApi.error) {
           console.log('Error [Get creator picture [PostCardHeader]]')
        }
     }, [getProfilPictureApi.success, getProfilPictureApi.error, getProfilPictureApi.data])
     
     const handleClick = () => {
        navigate(`/${username}`);
      };

  return (
    <MainContainer onClick={handleClick}>
        <ItemContainer>
            <InfosCreator>
                <ProfilPicture source={`data:image/jpg;base64,${profilPicture}`} size={45} />
                <NamingContainer>
                    <CustomText style={{fontSize: 18, marginBottom: 2}}>
                        {displayName}
                    </CustomText>
                    <CustomText style={{fontSize: 13, color: colors.medium}}>{`@${username}`}</CustomText>
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
  justify-content: center;
  cursor: pointer;

`;

const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.5px solid ${colors.lightDark};
  width: 80%;
  padding: 5px;
  &:hover {
    background-color: #333;
  }
`;

const InfosCreator = styled.div`
  display: flex;  
  align-items: flex-start
`;

const NamingContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
  margin-top: 5px;
`;

export default ResearchResult