import React from 'react'
import styled from 'styled-components';
import colors from '../../config/colors';
import { CustomText } from '../CustomedComponents';

interface MessageItemProps {
    message: string;
    isCurrentUser: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, isCurrentUser }) => {
  return (
    <Container isCurrentUser={isCurrentUser}>
        <CustomText style={{fontSize: 15}}>{message}</CustomText>
    </Container>
  )
}

const Container = styled.div<{ isCurrentUser: boolean }>`
  display: flex;
  border-radius: 10px;
  padding: 10px;
  padding-left: 15px;
  padding-right: 15px;
  align-self: flex-start;
  max-width: 65%;
  background-color: ${(props) => (props.isCurrentUser ? '#1E1E1E' : '#2D2E30')};
`;

export default MessageItem