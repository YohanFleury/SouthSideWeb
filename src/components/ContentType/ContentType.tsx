import React, { useState } from 'react'
import { CustomText } from '../CustomedComponents'
import styled from 'styled-components';
import colors from '../../config/colors';
import { useAppDispatch } from '../../redux/store';
import { setContentType } from '../../redux/contextSlice/contextSlice';

const ContentDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 5px 10px;
  width: 80%;
`;

interface StyledMenuProps {
  selected: boolean;
}

const StyledMenuLeft = styled.div<StyledMenuProps>`
  cursor: pointer;
  border-bottom: ${props => props.selected ? `2px solid ${colors.dark.primary}` : 'none'};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 5px
`;
const StyledMenuRight = styled.div<StyledMenuProps>`
  cursor: pointer;
  border-bottom: ${props => props.selected ? `2px solid ${colors.dark.primary}` : 'none'};
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 5px;
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
        <StyledMenuLeft 
          onClick={() => handleMenuClick("home")}
          selected={selectedMenu === "home"}>
            <CustomText style={{ fontSize: 'clamp(17px, 2.2vw, 19px)'}}>Accueil</CustomText>
        </StyledMenuLeft>
        <StyledMenuRight onClick={() => handleMenuClick("medias")} selected={selectedMenu === "medias"}>
            <CustomText style={{ fontSize: 'clamp(17px, 2.2vw, 19px)'}}>Medias</CustomText>
        </StyledMenuRight>
    </ContentDiv>
  )
}

export default ContentType
