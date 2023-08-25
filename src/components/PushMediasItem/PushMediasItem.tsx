import React from 'react'
import styled from 'styled-components';
import colors from '../../config/colors';
import ProfilPicture from '../ProfilPicture/ProfilPicture';
import { FaLock, FaImage, FaVideo } from "react-icons/fa";
import { AiOutlinePicture, AiOutlineVideoCamera } from "react-icons/ai";

import { CustomButton, CustomText } from '../CustomedComponents';

interface PushMediasItemProps {
  price: string,
  nbPictures: number,
  nbVideos: number,
  message: string,
}

const PushMediasItem = ({ price, nbPictures, nbVideos, message }: PushMediasItemProps) => {
  return (
    <Container>
      <ProfilPictureContainer>
        <ProfilPicture 
          source={'https://usersaccountphotos.s3.eu-west-3.amazonaws.com/f3aee6ec-1c55-4230-b6bd-875e7f2c57ef-198_profil.jpeg'} 
          size={50} />
      </ProfilPictureContainer>
      <Body>
        <LockContainer>
          <LockView>
            <FaLock size={22} color={colors.dark.primary} />
          </LockView>
        </LockContainer>
        <PayView>
          <Medias>
            {nbPictures > 0 &&
            <div style={{display: 'flex', alignItems:'center', marginRight: 15}}>
              <AiOutlinePicture size={22} color={"white"} style={{marginRight: 10}} />
              <CustomText style={{fontSize: 15}}>{nbPictures}</CustomText>
            </div>}
            {nbVideos > 0 &&
            <div style={{display: 'flex', alignItems:'center'}}>
              <AiOutlineVideoCamera size={22} color={"white"} style={{marginRight: 10}} />
              <CustomText style={{fontSize: 15}}>{nbVideos}</CustomText>
            </div>}
          </Medias>
          <div style={{display: 'flex'}}>
            <CustomButton title={`Déverrouiller pour ${price} €`} onClick={() => null} />
          </div>
        </PayView>
      </Body>
      <MessageView>
        <CustomText style={{fontSize: 17}}>{message}</CustomText>
      </MessageView>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  border-radius: 10px;
  border-bottom-left-radius: 0px;
  padding: 10px;
  width: 70%;
  background-color: #2D2E30;
  flex-direction: column;
`;

const ProfilPictureContainer = styled.div`
  position: absolute;
  top: 5,
  margin-left: 5px;
`;

const Body = styled.div`
  height: 300px;
  width: 100%;
`;

const Medias = styled.div`
  display: flex;
`;

const LockContainer  = styled.div`
  height: 55%;
  display: flex;
  align-items: center;
  justify-content: center;
`;


const LockView = styled.div`
display: flex;
width: 50px;
height: 50px;
border-radius: 50%;
border: 1px solid ${colors.dark.primary};
background-color: ${colors.dark.background};
align-items: center;
justify-content: center;
`;

const PayView = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
border: 0.5px solid ${colors.lightGrey};
padding: 15px;
border-radius: 15px;
height: 35%;
`;

const MessageView = styled.div`
display: flex;
border-top: 1px solid ${colors.dark.background};
padding: 15px;
background-color: #2D2E30;
margin-top: 10px;
`;

export default PushMediasItem