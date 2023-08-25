import React from 'react'
import styled from 'styled-components';
import { useAppSelector } from '../../redux/store';

const PrivateGallerie = () => {

  const feed = useAppSelector(state => state.publications.feedPublications)

  return (
    <Container>
    {feed.map((item, index) => {
      if (item.nbPictures > 0)
      return (
      <ImageContainer key={index}>
        <StyledImage 
          src={item.pictureUrls[0]} 
          />
      </ImageContainer>
    )})}
  </Container>
  )
}

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
  position: relative;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  cursor: pointer;
`;
export default PrivateGallerie