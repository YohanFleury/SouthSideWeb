import React, { useState } from 'react'
import styled from 'styled-components';
import { CustomButton, CustomText } from '../../components/CustomedComponents'
import MessageItem from '../../components/MessageItem/MessageItem';
import PrivateGallerie from '../../components/PrivateGallerie/PrivateGallerie';
import colors from '../../config/colors';
import { useAppSelector } from '../../redux/store';
import TextareaAutosize from 'react-textarea-autosize';
import { useEffect } from 'react';
import PushMediasItem from '../../components/PushMediasItem/PushMediasItem';


const ChatDetailPage = () => {
  
  const currentUser = useAppSelector(state => state.context.currentUser)

  const conversation = [
    {
      authorId: 101,
      message: 'Ma dernière séance studio',
      date: '2023-08-11T12:20:10.112Z[UTC]',
      id: 21,
      nbPicture: 8,
      nbVideos: 3,
      price: '25'
    },
    {
      authorId: currentUser.id,
      message: 'Yo Kaaris ! J\'ai vraiment aimé ton dernier son.',
      date: '2023-08-11T12:20:10.112Z[UTC]',
      id: 20,
    },
    {
      authorId: currentUser.id,
      message: "Tu penses refaire des collaborations avec d'autres rappeurs prochainement ?",
      date: '2023-08-11T12:19:40.112Z[UTC]',
      id: 19,
    },
    {
      authorId: currentUser.id,
      message: 'Toi aussi, à la prochaine !',
      date: '2023-08-11T12:18:00.112Z[UTC]',
      id: 18,
    },
    {
      authorId: 101,
      message: 'Merci, ça fait chaud au cœur. Prends soin de toi.',
      date: '2023-08-11T12:17:45.112Z[UTC]',
      id: 17,
    },
    {
      authorId: currentUser.id,
      message: 'Toujours là pour soutenir ! Force à toi.',
      date: '2023-08-11T12:16:30.112Z[UTC]',
      id: 16,
    },
    {
      authorId: 101,
      message: 'J’espère bien te voir là-bas alors. Merci pour le soutien.',
      date: '2023-08-11T12:15:25.112Z[UTC]',
      id: 15,
    },
    {
      authorId: currentUser.id,
      message: 'Je serai au premier rang !',
      date: '2023-08-11T12:14:20.112Z[UTC]',
      id: 14,
    },
    {
      authorId: 101,
      message: 'C’est dans les plans. On verra comment ça se passe après la sortie.',
      date: '2023-08-11T12:13:10.112Z[UTC]',
      id: 13,
    },
    {
      authorId: currentUser.id,
      message: 'Je n’en doute pas. Sinon, tu prévois une tournée après ?',
      date: '2023-08-11T12:12:00.112Z[UTC]',
      id: 12,
    },
    {
      authorId: 101,
      message: 'Content de l’entendre ! On travaille dur en studio.',
      date: '2023-08-11T12:11:15.112Z[UTC]',
      id: 11,
    },
    {
      authorId: currentUser.id,
      message: 'Haha, je comprends. J’attends ça avec impatience.',
      date: '2023-08-11T12:10:00.112Z[UTC]',
      id: 10,
    },
    {
      authorId: 101,
      message: 'Bien sûr, quelques surprises. Mais je peux pas tout dévoiler maintenant.',
      date: '2023-08-11T12:09:30.112Z[UTC]',
      id: 9,
    },
    {
      authorId: currentUser.id,
      message: 'T’as prévu des featurings sur le prochain album?',
      date: '2023-08-11T12:08:15.112Z[UTC]',
      id: 8,
    },
    {
      authorId: 101,
      message: 'Lourd, celui-là est un classique.',
      date: '2023-08-11T12:07:20.112Z[UTC]',
      id: 7,
    },
    {
      authorId: currentUser.id,
      message: 'Difficile à dire... J’ai kiffé "Or Noir".',
      date: '2023-08-11T12:05:30.112Z[UTC]',
      id: 6,
    },
    {
      authorId: 101,
      message: "Merci mon gars, ça fait plaisir ! T'as un son préféré ?",
      date: '2023-08-11T12:04:20.112Z[UTC]',
      id: 5,
    },
    {
      authorId: currentUser.id,
      message: "Je suis content de te parler ! J'ai écouté tous tes sons.",
      date: '2023-08-11T12:02:50.112Z[UTC]',
      id: 4,
    },
    {
      authorId: 101,
      message: 'Tranquille, et toi?',
      date: '2023-08-11T12:01:30.112Z[UTC]',
      id: 3,
    },
    {
      authorId: currentUser.id,
      message: 'Salut Kaaris ça va ?',
      date: '2023-08-11T11:59:20.112Z[UTC]',
      id: 2,
    },
    {
      authorId: 101,
      message: 'Yo mon gars !',
      date: '2023-08-11T11:58:20.112Z[UTC]',
      id: 1,
    }
  ];

  const [selectedMenu, setSelectedMenu] = useState("conversation");
  const [message, setMessage] = useState<string>('')
  
  

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
  }

  const handleTextChange = (e: any) => {
    setMessage(e.target.value);
  }

  return (
  <MainContainer>
    <StickyContainer>
      <div style={{height: 30, padding: 10}}>
        <CustomText>@kaaris93270</CustomText>
      </div>
      <ContentDiv>
        <StyledMenuLeft 
          onClick={() => handleMenuClick("conversation")}
          selected={selectedMenu === "conversation"}>
            <CustomText style={{ fontSize: 'clamp(15px, 2.0vw, 17px)'}}>Conversation</CustomText>
        </StyledMenuLeft>
        <StyledMenuRight onClick={() => handleMenuClick("privateGallerie")} selected={selectedMenu === "privateGallerie"}>
            <CustomText style={{ fontSize: 'clamp(15px, 2.0vw, 17px)'}}>Galerie privée</CustomText>
        </StyledMenuRight>
      </ContentDiv>
    </StickyContainer>
    {selectedMenu === "privateGallerie" && <PrivateGallerie />}
    {selectedMenu === "conversation" && 
    <Conversation>
      {
        conversation.map((element, index) => {
          const isSameAuthorAsPrevious = index < conversation.length - 1 && element.authorId === conversation[index + 1].authorId;
          const isCurrentUser = currentUser.id === element.authorId
          if (element.price) return (
            <ParentContainer isSameAuthorAsPrevious={isSameAuthorAsPrevious} isCurrentUser={isCurrentUser} >
              <PushMediasItem 
                  message={element.message}
                  nbPictures={element.nbPicture}
                  nbVideos={element.nbVideos}
                  price={element.price}
                  />
            </ParentContainer>
          )
          return (
            <ParentContainer isSameAuthorAsPrevious={isSameAuthorAsPrevious} isCurrentUser={isCurrentUser}>
              <MessageItem
                message={element.message}
                isCurrentUser={isCurrentUser}
              />
            </ParentContainer>
          )
        })
      }
    </Conversation>}
    {selectedMenu === "conversation" &&
    <StyledInputContainer>
      <div style={{display: 'flex', justifyContent:'flex-end'}}>
        <CustomButton disabled={message.length === 0} title='Envoyer' onClick={() => null} textStyle={{fontSize: 15}} buttonStyle={{width: 100}} />
      </div>
      <TextareaAutosize
        style={{
            backgroundColor: "transparent",
            color: "white",
            border: "none",
            outline: "none",
            width: "90%",
            overflow: "auto",
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
            fontSize: "16.5px",
            resize: "none",
            padding: 10,
        }}
        minRows={1}
        maxRows={3}
        placeholder="Taper un message..."
        autoFocus
        onChange={handleTextChange}
        />
    </StyledInputContainer>}
  </MainContainer>
  )
}

const MainContainer = styled.div`
background-color: ${colors.dark.background};
display: flex;
flex-direction: column;
border-left: 0.5px solid ${colors.lightDark};
margin: auto;
position: relative;
height: 100%;
width: 100%;
`;

const StickyContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: inherit;
  width: 75%;

  @media (max-width: 1000px) {
    width: 100%;
  }
`;

const Conversation = styled.div`
display: flex;
padding: 10px;
flex-direction: column-reverse;
align-items: stretch;
justify-content: flex-start; 
height: 75%;
width: 75%;
overflow-y: scroll;
position: relative;
border-right: 0.5px solid ${colors.lightDark};

@media (max-width: 650px) {
  width: 95%;
}


`;

const ParentContainer = styled.div<{ isCurrentUser: boolean, isSameAuthorAsPrevious: boolean }>`
  display: flex;
  justify-content: ${(props) => (props.isCurrentUser ? 'flex-end' : 'flex-start')};
  width: 100%;
  margin-top: ${(props) => (props.isSameAuthorAsPrevious ? '2px' : '10px')};
`;

const ContentDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 5px 10px;
  width: 80%;
`;

interface StyledMenuProps {
  selected: boolean;
}

const StyledMenuLeft = styled.div<StyledMenuProps>`
  cursor: pointer;
  border-bottom: ${props => props.selected ? `2px solid ${colors.dark.primary}` : 'none'};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 5px
`;
const StyledMenuRight = styled.div<StyledMenuProps>`
  cursor: pointer;
  border-bottom: ${props => props.selected ? `2px solid ${colors.dark.primary}` : 'none'};
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 5px;
`;

const StyledInputContainer = styled.div`
  position: absolute;  // Position absolue par rapport à MainContainer
  bottom: 0;
  width: 75%;
  min-height: 9%;
  max-height: 16%;
  padding: 10px;
  border-top: 0.5px solid ${colors.lightDark};
  border-right: 0.5px solid ${colors.lightDark};
  z-index: 2; 
  display: flex;
  flex-direction: column-reverse;
  background-color: ${colors.dark.background};

  @media (max-width: 650px) {
    width: 95%;
  }
`;


export default ChatDetailPage