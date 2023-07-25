import React, { useState } from 'react'
import { CustomText } from '../CustomedComponents'
import styled from 'styled-components';
import colors from '../../config/colors';

const ContentDiv = styled.div`
  display: flex;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: space-between;
  padding: 0 10px;
  position: sticky;
  top: 50px;
  z-index: 15;
`;

interface StyledMenuProps {
  selected: boolean;
}

const StyledMenu = styled.div<StyledMenuProps>`
  cursor: pointer;
  border-bottom: ${props => props.selected ? `2px solid ${colors.dark.primary}` : 'none'};
`;

const ContentType = () => {
  const [selectedMenu, setSelectedMenu] = useState("Accueil");

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
  }

  return (
    <ContentDiv>
        <StyledMenu onClick={() => handleMenuClick("Accueil")} selected={selectedMenu === "Accueil"}>
            <CustomText style={{ fontSize: 'clamp(17px, 2.2vw, 19px)'}}>Accueil</CustomText>
        </StyledMenu>
        <StyledMenu onClick={() => handleMenuClick("Medias")} selected={selectedMenu === "Medias"}>
            <CustomText style={{ fontSize: 'clamp(17px, 2.2vw, 19px)'}}>Medias</CustomText>
        </StyledMenu>
        <StyledMenu onClick={() => handleMenuClick("Videos")} selected={selectedMenu === "Videos"}>
            <CustomText style={{ fontSize: 'clamp(17px, 2.2vw, 19px)'}}>Videos</CustomText>
        </StyledMenu>
        <StyledMenu onClick={() => handleMenuClick("Lives")} selected={selectedMenu === "Lives"}>
            <CustomText style={{ fontSize: 'clamp(17px, 2.2vw, 19px)'}}>Lives</CustomText>
        </StyledMenu>
    </ContentDiv>
  )
}

export default ContentType
