import React, { useState } from 'react'
import { CustomText } from '../CustomedComponents'
import styled from 'styled-components';
import colors from '../../config/colors';
import { useAppDispatch } from '../../redux/store';
import { setContentType } from '../../redux/contextSlice/contextSlice';

const ContentDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
  width: 80%;
`;

interface StyledMenuProps {
  selected: boolean;
}

const StyledMenu = styled.div<StyledMenuProps>`
  cursor: pointer;
  border-bottom: ${props => props.selected ? `2px solid ${colors.dark.primary}` : 'none'};
`;

const ContentType = () => {
  const dispatch = useAppDispatch()

  const [selectedMenu, setSelectedMenu] = useState("home");

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
    dispatch(setContentType(menu))
  }

  return (
    <ContentDiv>
        <StyledMenu onClick={() => handleMenuClick("home")} selected={selectedMenu === "home"}>
            <CustomText style={{ fontSize: 'clamp(17px, 2.2vw, 19px)'}}>Accueil</CustomText>
        </StyledMenu>
        <StyledMenu onClick={() => handleMenuClick("medias")} selected={selectedMenu === "medias"}>
            <CustomText style={{ fontSize: 'clamp(17px, 2.2vw, 19px)'}}>Medias</CustomText>
        </StyledMenu>
        <StyledMenu onClick={() => handleMenuClick("videos")} selected={selectedMenu === "videos"}>
            <CustomText style={{ fontSize: 'clamp(17px, 2.2vw, 19px)'}}>Videos</CustomText>
        </StyledMenu>
        <StyledMenu onClick={() => handleMenuClick("lives")} selected={selectedMenu === "lives"}>
            <CustomText style={{ fontSize: 'clamp(17px, 2.2vw, 19px)'}}>Lives</CustomText>
        </StyledMenu>
    </ContentDiv>
  )
}

export default ContentType
