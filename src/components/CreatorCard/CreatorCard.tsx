import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { CustomText } from '../CustomedComponents';
import { FiCheckCircle } from "react-icons/fi";
import { TfiMedall } from "react-icons/tfi";
import colors from '../../config/colors';
import useApi from '../../hooks/useApi/useApi';
import users from '../../api/users';
import { arrayBufferToBase64 } from '../../config/utils/arrayBufferToBase64';
import { useNavigate } from 'react-router-dom';

type MyCreatorCardProps = {
    name: string;
    username: string;
    isVerified?: boolean;
    creatorId: number;
}

const CreatorCard: React.FC<MyCreatorCardProps> = ({ name, isVerified = true, username, creatorId }) => {

  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => {
    setIsDragging(false);
  };

  const handleMouseMove = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    if (!isDragging) {
      handleClick();
    }
  };
    const navigate = useNavigate();

    const creatorPictureApi = useApi(users.getCreatorPicture)
    const [creatorPicture, setCreatorPicture] = useState<any>()

    const handleClick = () => {
      navigate(`/${username}`);
    };

    useEffect(() => {
        creatorPictureApi.request(creatorId)
    }, [])
  
    useEffect(() => {
        if(creatorPictureApi.success) {
            setCreatorPicture(arrayBufferToBase64(creatorPictureApi.data))
        } else if(creatorPictureApi.error) {
            console.log('Error [get creator picture]')
        }
    }, [creatorPictureApi.success, creatorPictureApi.error, creatorPictureApi.data])
      
    
  return (
    <ImageBackground 
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp} img={creatorPicture} >
        <GradientDiv>
            <NamingContainer>
                <CustomText style={{fontSize: '1em'}}>{name}</CustomText>
                <FiCheckCircle size={18} color='white' style={{marginLeft: 5}} />
            </NamingContainer>
            <UserNameContainer>
                <CustomText style={{fontSize: '0.8em',}}>{`@${username}`}</CustomText>
            </UserNameContainer>
            <CategoriesContainer>
                <CustomText style={{fontSize: '0.8em', marginRight: '1em'}}>Podcast, Sport</CustomText>
            </CategoriesContainer>
            {isVerified &&
                <TfiMedall size={16} color={colors.dark.primary} style={{ position: 'absolute', bottom: '0%', right: "0%"}} />
            }
        </GradientDiv>
    </ImageBackground>
  )
}

interface ImageBackgroundProps {
    img: string;
    onClick?: () => void;
  }

  const ImageBackground = styled.div<ImageBackgroundProps>`
  background-image: url(${({img}: any) => `data:image/jpg;base64,${img}`});
  height: 30vh;
  min-width: 200px;
  max-width: 300px;
  background-size: cover;
  margin: 1vh;
  display: flex;
  align-items: flex-end;
  cursor: pointer;
`;

const GradientDiv = styled.div`
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
  display: flex;
  height: 80px;
  width: 100%;
  position: relative;
`;

const NamingContainer = styled.div`
  display: flex;
  height: 50%;
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  padding-left: 0.5em;
  padding-rigth: 0.5em;
`;

const UserNameContainer = styled.div`
  position: absolute;
  bottom: 3%;
  left: 3%;
`;

const CategoriesContainer = styled.div`
  position: absolute;
  bottom: 3%;
  right: 3%;
`;


export default CreatorCard
