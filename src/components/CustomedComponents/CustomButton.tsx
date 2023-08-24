import React from 'react'
import styled, { css } from 'styled-components';
import colors from '../../config/colors';
import CustomText from './CustomText';

interface Props {
    title: string;
    onClick: () => void;
    icon?: any;
    disabled?: boolean,
    loading?: boolean,
    buttonStyle?: React.CSSProperties, // Nouvelle prop pour le style du bouton
    textStyle?: React.CSSProperties, // Nouvelle prop pour le style du texte
}

const CustomButton: React.FC<Props> = ({ title, onClick, icon, disabled = false, loading = false, buttonStyle, textStyle }) => {
  return (
    <StyledButton onClick={onClick} style={{...buttonStyle, backgroundColor: disabled ? '#042145' : '#1D62B9'}} >
        {icon}
        <CustomText style={{...textStyle, fontSize: textStyle?.fontSize || 'clamp(16px, 2vw, 20px)'}}>{title}</CustomText>
    </StyledButton>
  )
}

const StyledButton = styled.div`
  padding: 10px;
  width: 100%;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export default CustomButton
