import React from 'react'
import styled from 'styled-components';
import { CustomText } from '.';
import colors from '../../config/colors';
import { useAppSelector } from '../../redux/store';

interface CustomHeaderProps {
    title: string
}

const CustomHeader:React.FC<CustomHeaderProps> = ({ title }) => {
  const isNewPostModalOpen = useAppSelector(state => state.context.openNewPostModal)
  return (
    <BlurryDiv style={{zIndex: isNewPostModalOpen ? 0 : 10 }}>
        <CustomText>{title}</CustomText>
    </BlurryDiv>
  )
}

const BlurryDiv = styled.div`
  border-bottom: 0.5px solid ${colors.lightDark};
  position: sticky; // Ajout de la propriété de position
  top: 0; 
  width: 100%;
  backdrop-filter: blur(10px);
  height: 50px;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default CustomHeader