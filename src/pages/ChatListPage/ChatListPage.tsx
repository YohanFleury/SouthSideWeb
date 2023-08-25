import React from 'react'
import styled from 'styled-components'
import ChatItem from '../../components/ChatItem/ChatItem'
import { CustomHeader } from '../../components/CustomedComponents'
import colors from '../../config/colors'

const ChatListPage = () => {
  return (
    <MainContainer>
      <div style={{width: '83%'}}>
         <CustomHeader title='Messages' />
        </div>
      <ChatItem 
        username="kaaris93270" 
        convId={129657268} 
        chatname='Kaaris' 
        lastMessage="Wesh ma gueule ! Alors t'as pensé quoi du showcase à Marbella ? " 
        idLastSender={197}
        />
    </MainContainer>
  )
}

export default ChatListPage

const MainContainer = styled.div`
background-color: ${colors.dark.background};
display: flex;
flex-direction: column;
flex: 1;
margin: auto;
position: relative;
height: 100%;
`;
