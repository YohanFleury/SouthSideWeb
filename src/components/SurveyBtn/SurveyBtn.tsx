import React, { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { AiOutlineClose, AiOutlineOrderedList } from 'react-icons/ai';

import styled from 'styled-components';
import colors from '../../config/colors';

const Container = styled.div`
  cursor: pointer;
`;

const StyledDiv = styled(animated.div)`
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 17.5px;
  background-color: #333;
`;

type SurveyBtnProp = {
    onPress: () => void;
    isSurvey: boolean;
    disabled: boolean;
}

const SurveyBtn = ({ onPress, isSurvey, disabled }: SurveyBtnProp) => {
  const [rotate, setRotate] = useState(0);
  
  useEffect(() => {
    setRotate(isSurvey ? 90 : 0);
  }, [isSurvey]);

  const { transform } = useSpring({
    from: { transform: `rotate(0deg)` },
    to: { transform: `rotate(${rotate}deg)` },
    config: { duration: 400 },
  });

  return (
    <Container style={{cursor: disabled ? 'default' : 'pointer'}} onClick={disabled ? () => null : onPress}>
      <StyledDiv style={{ transform }}>
        {!isSurvey && <AiOutlineOrderedList size={20} color={disabled ? colors.medium : "white"} />}
        {isSurvey && <AiOutlineClose size={20} color={colors.danger} />}
      </StyledDiv>
    </Container>
  );
};

export default SurveyBtn;
