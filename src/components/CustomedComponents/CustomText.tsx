import React from 'react'
import styled, { css } from 'styled-components'

import { useAppSelector } from '../../redux/store'
import colors from '../../config/colors'

type TextProp = {
    children: string | number | undefined,
    style?: any,
}

const TextWrapper = styled.span`
    font-size: 18px;
    color: ${colors.white};
`;

const CustomText:React.FC<TextProp> = ({children, style}) => {


   return (
      <TextWrapper style={style}>{children}</TextWrapper>
   )
}

export default CustomText
