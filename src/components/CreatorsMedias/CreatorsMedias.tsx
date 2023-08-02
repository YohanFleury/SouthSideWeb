import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Publication } from '../../redux/publicationsSlice/publicationsSlice';

interface Props {
  data: Publication[]
}

const CreatorsMedias: React.FC<Props> = ({ data }) => {
// Navigation
    const navigate = useNavigate();
    
    const handleClick = (username: string, publicationId: number, isVisible: boolean) => {
        if (!isVisible) return ;
        navigate(`/${username}/post/${publicationId}`)
      }

  return (
    <Container>
      {data.map((item, index) => (
        <ImageContainer key={index}>
          <StyledImage 
            src={item.pictureUrls[0]} 
            onClick={() => handleClick(item.author.username, item.id, item.visible)} />
        </ImageContainer>
      ))}
    </Container>
  );
};

export default CreatorsMedias;

const Container = styled.div`
display: flex;
overflow: hidden;
max-width: 100%;
margin-top: 20px
`;

const ImageContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
overflow: hidden;
height: auto; 
margin-top: 10px;
max-height: 330px;
max-width: 33%;
border-radius: 10px;
`;


const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  cursor: pointer;
`;