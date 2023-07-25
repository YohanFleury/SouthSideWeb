import React, { useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated, config } from '@react-spring/web';
import { IoEarthSharp } from 'react-icons/io5';
import { FaLock } from "react-icons/fa";
import colors from '../../config/colors';

type AudienceBtnProps = {
    onClick: () => void;
}


const AudienceBtn = ({ onClick }: AudienceBtnProps) => {
    const [isPublic, setIsPublic] = useState(false);
    
    const { transform } = useSpring({
        from: { transform: 'rotateY(0deg)' },
        to: { transform: isPublic ? 'rotateY(0deg)' : 'rotateY(180deg)' },
        config: config.wobbly,
    });
    
    const handlePress = () => {
        setIsPublic(!isPublic);
        onClick();
    };
    
    return (
        <Container>
      <AnimatedButton style={{ transform }} onClick={handlePress}>
        {isPublic ? <IoEarthSharp size={24} color={colors.dark.primary} /> : <FaLock size={23} color={colors.dark.primary} />}
      </AnimatedButton>
    </Container>
  );
};

export default AudienceBtn;

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 10px;
`;

const AnimatedButton = styled(animated.div)`
  width: 45px;
  height: 45px;
  margin: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #333;
  cursor: pointer;
`;