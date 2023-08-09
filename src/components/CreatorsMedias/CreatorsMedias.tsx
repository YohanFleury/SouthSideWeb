import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../config/colors';
import { Publication } from '../../redux/publicationsSlice/publicationsSlice';
import { FaLock } from "react-icons/fa";

interface Props {
  data: Publication[];
  isSub: boolean;
}

const CreatorsMedias: React.FC<Props> = ({ data, isSub }) => {
// Navigation
    const navigate = useNavigate();
    
    const handleClick = (username: string, publicationId: number, isVisible: boolean) => {
        if (!isVisible && !isSub) return ;
        navigate(`/${username}/post/${publicationId}`)
      }

  return (
    <Container>
      {data.map((item, index) => (
        <ImageContainer key={index}>
          <StyledImage 
            src={item.pictureUrls[0]} 
            onClick={() => handleClick(item.author.username, item.id, item.visible)} />
          {!item.visible && !isSub &&
          <LockView>
            <FaLock size={22} color={colors.dark.primary} />
          </LockView>}
        </ImageContainer>
      ))}
    </Container>
  );
};

export default CreatorsMedias;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Cela crée 3 colonnes de largeur égale */
  gap: 1px 1px; /* Espacement entre les images */
  margin-top: 20px;
`;


const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  height: 100%; 
  border-radius: 5px;
  position: relative;
`;

const LockView = styled.div`
display: flex;
width: 50px;
height: 50px;
border-radius: 50%;
border: 1px solid ${colors.dark.primary};
background-color: ${colors.dark.background};
align-items: center;
justify-content: center;
position: absolute;
top: 38%;
left: 38%;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  cursor: pointer;
`;