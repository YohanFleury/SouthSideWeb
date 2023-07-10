import React from 'react'
import styled from 'styled-components';
import { CustomText } from '.';
import colors from '../../config/colors';

interface CustomHeaderProps {
    title: string
}

const CustomHeader:React.FC<CustomHeaderProps> = ({ title }) => {
  return (
    <BlurryDiv>
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
  height: 80px;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default CustomHeader