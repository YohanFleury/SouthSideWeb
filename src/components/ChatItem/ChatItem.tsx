import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../config/colors';
import { useAppSelector } from '../../redux/store';
import { CustomText } from '../CustomedComponents';
import ProfilPicture from '../ProfilPicture/ProfilPicture';

interface ChatItemProps {
    chatname: string;
    username: string;
    lastMessage: string;
    onDelete?: () => void;
    convId: number;
    idLastSender: number;
}

const ChatItem: React.FC<ChatItemProps> = ({ chatname,lastMessage, onDelete, convId, username, idLastSender }) => {
  // Redux
  const currentUser = useAppSelector(state => state.context.currentUser)

  // Navigation
  const navigate = useNavigate();

  const handlePress = () => {
    navigate(`/chat/${username}/${convId}`)
  }

  const truncateMessage = (message: string) => {
    if (message.length > 65) return message.substring(0, 65) + "...";
    return message;
  }



  return (
    <Container onClick={handlePress}>
      <ProfilPicture size={45} source='https://usersaccountphotos.s3.eu-west-3.amazonaws.com/f3aee6ec-1c55-4230-b6bd-875e7f2c57ef-198_profil.jpeg' />
      <Body>
        <Infos>
          <CustomText style={{fontWeight: 'bold'}}>{chatname}</CustomText>
          <CustomText style={{fontSize: 15, color: colors.medium}}>10:44</CustomText>
        </Infos>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 5}}>
          <Message>
            <CustomText style={{fontSize: 15, color: colors.medium}}>{`Vous : `+ truncateMessage(lastMessage)}</CustomText>
          </Message>
          <Pastille>
            <CustomText style={{fontSize: 14, color: colors.dark.background}}>1</CustomText>
          </Pastille> 
        </div>
      </Body>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
  height: 80px;
  width: 80%;
  padding: 10px;
  cursor: pointer;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  align-self: center;

`;

const Infos = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 0px;
`;

const Message = styled.div`
  display: flex;
  margin-top: 5px;
  width: 90%;
`;

const Pastille = styled.div`
  display: flex;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #1D62B9;
  justify-content: center;
  align-items: center;

`;

export default ChatItem