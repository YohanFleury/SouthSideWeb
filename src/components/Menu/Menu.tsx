import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../config/colors'
import { setcloseModal, setOpenNewPostModal } from '../../redux/contextSlice/contextSlice'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { CustomButton, CustomText } from '../CustomedComponents'
import { MdOutlineHome,  } from "react-icons/md";
import { BiBell } from "react-icons/bi";
import { BiMessageDetail } from "react-icons/bi";
import { BsPeopleFill, BsBookmark} from "react-icons/bs";
import { useLocation } from 'react-router-dom';
import { IoMdHeartEmpty,  } from "react-icons/io";
import { FaSistrix } from "react-icons/fa";
import { IoWalletOutline } from "react-icons/io5";
import { FiSettings } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";
import logo from '../../assets/logoMvp.png'

const Menu = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const {pathname} = useLocation();

  const currentUser = useAppSelector(state => state.context.currentUser)
  const handleNavigate = (route: string) => {
    navigate(`/${route}`)
  }

  console.log('youhouuu',currentUser)
  return (
    <MainContainer onClick={() => dispatch(setcloseModal())}>
      <LogoContainer>
        <StyledImage src={logo} alt="description of the image" />
      </LogoContainer>
      <Container>
      <MenuItem onClick={() => handleNavigate('')}>
        <IconContainer>
          {pathname === "/" &&
          <RouteSelector />}
          <MdOutlineHome size={24} color='white'  />
        </IconContainer>
        <ResponsiveText>
        <ItemTitle>
          <CustomText style={{fontWeight: 'bold'}}>
            Accueil
          </CustomText>
        </ItemTitle>
        </ResponsiveText>
      </MenuItem>
        <MenuItem onClick={() => handleNavigate('research')}>
          <IconContainer>
          {pathname === "/research" &&
            <RouteSelector />}
            <FaSistrix color='white' size={24} />
          </IconContainer>
          <ResponsiveText>
          <ItemTitle>
            <CustomText style={{fontWeight: 'bold'}}>
              Recherche
            </CustomText>
          </ItemTitle>
          </ResponsiveText>
        </MenuItem>
        <MenuItem onClick={() => handleNavigate('notifications')}>
          <IconContainer>
            {pathname === "/notifications" &&
              <RouteSelector />}
              <BiBell color='white' size={24}/>
          </IconContainer>
          <ResponsiveText>
          <ItemTitle>
            <CustomText style={{fontWeight: 'bold'}}>
              Notifications
            </CustomText>
          </ItemTitle>

          </ResponsiveText>
        </MenuItem>
        <MenuItem onClick={() => handleNavigate('chat')}>
          <IconContainer>
            {pathname === "/chat" &&
              <RouteSelector />}
              <BiMessageDetail color='white' size={24}/>
          </IconContainer>
          <ResponsiveText>
          <ItemTitle>
            <CustomText style={{fontWeight: 'bold'}}>
              Messages
            </CustomText>
          </ItemTitle>

          </ResponsiveText>
        </MenuItem>
        <MenuItem onClick={() => handleNavigate('myfavs')}>
          <IconContainer>
            {pathname === "/myfavs" &&
              <RouteSelector />}
              <IoMdHeartEmpty color='white' size={24}/>
          </IconContainer>
          <ResponsiveText>
          <ItemTitle>
            <CustomText style={{fontWeight: 'bold'}}>
              Favoris
            </CustomText>
          </ItemTitle>

          </ResponsiveText>
        </MenuItem>
        <MenuItem onClick={() => handleNavigate('mysubs')}>
          <IconContainer>
            {pathname === "/mysubs" &&
              <RouteSelector />}
              <BsPeopleFill color='white' size={24}/>
          </IconContainer>
          <ResponsiveText>
          <ItemTitle>
            <CustomText style={{fontWeight: 'bold'}}>
              Abonnements
            </CustomText>
          </ItemTitle>

          </ResponsiveText>
        </MenuItem>
        <MenuItem onClick={() => handleNavigate('mybooks')}>
          <IconContainer>
            {pathname === "/mybooks" &&
              <RouteSelector />}
              <BsBookmark color='white' size={24}/>
          </IconContainer>
          <ResponsiveText>
          <ItemTitle>
            <CustomText style={{fontWeight: 'bold'}}>
              Signets
            </CustomText>
          </ItemTitle>
          </ResponsiveText>
        </MenuItem>
        <MenuItem onClick={() => null}>
          <IconContainer>
            {pathname === "/wallet" &&
              <RouteSelector />}
              <IoWalletOutline color='white' size={24}/>
          </IconContainer>
          <ResponsiveText>
          <ItemTitle>
            <CustomText style={{fontWeight: 'bold'}}>
              Portefeuille
            </CustomText>
          </ItemTitle>
          </ResponsiveText>
        </MenuItem>
        <MenuItem onClick={() => handleNavigate('settings')}>
          <IconContainer>
            {pathname === "/settings" &&
              <RouteSelector />}
              <FiSettings color='white' size={24}/>
          </IconContainer>
          <ResponsiveText>
          <ItemTitle>
            <CustomText style={{fontWeight: 'bold'}}>
              Paramètres
            </CustomText>
          </ItemTitle>
          </ResponsiveText>
        </MenuItem>
      {currentUser.creator && 
      <>
        <ButtonContainer>
          <CustomButton title='Publier' onClick={() => dispatch(setOpenNewPostModal())} />
        </ButtonContainer>
        <PostBtn onClick={() => dispatch(setOpenNewPostModal())}>
          <AiOutlinePlus color='white' size={24} />
        </PostBtn>
      </>}
      </Container>
    </MainContainer>
  )
}

const MainContainer = styled.div`
  width: 20%;
  min-width: 15%;
  background-color: ${colors.dark.background};
  border-left: 0.2px solid ${colors.lightDark};
  border-right: 0.2px solid ${colors.lightDark};
  position: sticky;
  top: 0;
  height: 100vh; // sets the maximum height to the view height
  overflow-y: auto; // enables scrolling within the container
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  @media (max-width: 1000px) {
    display: none;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  @media (max-width: 1000px) {
    display: none;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 10px;
`;


const ResponsiveText = styled.div`
  @media (max-width: 1000px) {
    display: none;
  }
`;

const PostBtn = styled.div`
  @media (min-width: 1000px) {
    display: none;
  }
  width: 50px;
  height: 50px;
  border-radius: 50%;
  align-self: flex-end;
  background-color: #1E6CD0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  cursor: pointer;
`;

const MenuItem = styled.div`
  display: flex;
  padding: 15px;
  align-items: center;
  margin-left: 15px;
  cursor: pointer;
  position: relative;
  @media (max-width: 1000px) {
    justify-content: flex-end;
  }
`;

const ItemTitle = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 15px;
  margin-top: -5px;
  @media (max-width: 1000px) {
    justify-content: flex-end;
  }
`;

const IconContainer = styled.div`
  position: relative;
`;

const RouteSelector = styled.div`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: ${colors.dark.primary};
  position: absolute;
  top: 50%;
  left: -15px; 
  transform: translateY(-50%); 
`;

const Divider = styled.div`
  width: 100%;
  height: 0.5px;
  background-color: ${colors.dark.primary};
`;

export default Menu