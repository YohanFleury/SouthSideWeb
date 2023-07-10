import React from 'react'
import styled from 'styled-components';
import colors from '../../config/colors';
import CustomText from './CustomText';

interface Props {
    title: string;
    onClick: () => void;
    icon?: any;
    disabled?: boolean,
    loading?: boolean,
  }

const CustomButton: React.FC<Props> = ({ title, onClick, icon, disabled = false, loading = false,  }) => {
  return (
    <StyledButton onClick={onClick} style={{backgroundColor: disabled ? colors.medium : '#1E6CD0'}} >
        {icon}
        <CustomText style={{fontSize: 'clamp(16px, 2vw, 20px)'}}>{title}</CustomText>
    </StyledButton>
  )
}

const StyledButton = styled.div`
  padding: 10px;
  width: 60%;
  border-radius: 25px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export default CustomButton