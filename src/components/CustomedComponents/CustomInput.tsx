import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../redux/store'
import colors from '../../config/colors';

type CustomInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  stylesCustom?: React.CSSProperties;
};

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>((props, ref) => {
  const theme = useAppSelector((state) => state.context.theme)

  return (
      <InputContainer>
        <StyledInput
          ref={ref}
          style={props.stylesCustom}
          {...props}
        />
      </InputContainer>
  );
});

const InputContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const StyledInput = styled.input`
  height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${colors.medium};
  background-color: #222223;
  padding: 10px;
  border-radius: 10px;
  width: 80%;
  color: white;

   &::placeholder {
    color: ${colors.medium};
    font-size: 16px;
  }
  :-ms-input-placeholder { /* Internet Explorer 10-11 */
    font-size: 20px;
  }

  ::-ms-input-placeholder { /* Microsoft Edge */
    font-size: 20px;
  }
`;

export default CustomInput;
