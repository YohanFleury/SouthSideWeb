import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../config/colors'
import { setcloseModal } from '../../redux/contextSlice/contextSlice'
import { useAppDispatch } from '../../redux/store'
import { CustomText } from '../CustomedComponents'
import { MdOutlineHome,  } from "react-icons/md";
import { BiBell } from "react-icons/bi";
import { BiMessageDetail } from "react-icons/bi";
import { BsPeopleFill, BsBookmark} from "react-icons/bs";
import { useLocation } from 'react-router-dom';
import { IoMdHeartEmpty,  } from "react-icons/io";
import { FaSistrix } from "react-icons/fa";
import { IoWalletOutline } from "react-icons/io5";

const Menu = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const {pathname} = useLocation();

  const handleNavigate = (route: string) => {
    navigate(`/${route}`)
  }
  return (
    <MainContainer onClick={() => dispatch(setcloseModal())}>
      <Container>
        <MenuItem onClick={() => handleNavigate('')}>
          {pathname === "/" &&
          <RouteSelector />}
          <MdOutlineHome  style={{ minHeight: 29, minWidth:29}} size={32} color='white'  />
          <ResponsiveText>
          <CustomText style={{marginLeft: 15}}>
            Accueil
          </CustomText>

          </ResponsiveText>
        </MenuItem>
        <MenuItem onClick={() => handleNavigate('research')}>
        {pathname === "/research" &&
          <RouteSelector />}
          <FaSistrix style={{  minHeight: 26, minWidth:26}} color='white' size={24} />
          <ResponsiveText>
          <CustomText style={{marginLeft: 15}}>
            Recherche
          </CustomText>
          </ResponsiveText>
        </MenuItem>
        <MenuItem onClick={() => handleNavigate('notifications')}>
        {pathname === "/notifications" &&
          <RouteSelector />}
          <BiBell style={{  minHeight: 29, minWidth:29}} color='white' size={31}/>
          <ResponsiveText>
          <CustomText style={{marginLeft: 15}}>
            Notifications
          </CustomText>

          </ResponsiveText>
        </MenuItem>
        <MenuItem onClick={() => handleNavigate('chat')}>
        {pathname === "/chat" &&
          <RouteSelector />}
          <BiMessageDetail style={{  minHeight: 29, minWidth:29}} color='white' size={30}/>
          <ResponsiveText>
          <CustomText style={{marginLeft: 15}}>
            Messages
          </CustomText>

          </ResponsiveText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleNavigate('favorites')}>
        {pathname === "/favorites" &&
          <RouteSelector />}
          <IoMdHeartEmpty style={{  minHeight: 29, minWidth:29}} color='white' size={30}/>
          <ResponsiveText>
          <CustomText style={{marginLeft: 15}}>
            Favoris
          </CustomText>

          </ResponsiveText>
        </MenuItem>
        <MenuItem onClick={() => handleNavigate('subscriptions')}>
        {pathname === "/subscriptions" &&
          <RouteSelector />}
          <BsPeopleFill style={{  minHeight: 26, minWidth:26}} color='white' size={26}/>
          <ResponsiveText>
          <CustomText style={{marginLeft: 15}}>
            Abonnements
          </CustomText>

          </ResponsiveText>
        </MenuItem>
        <MenuItem onClick={() => handleNavigate('bookmarks')}>
        {pathname === "/bookmarks" &&
          <RouteSelector />}
          <BsBookmark style={{  minHeight: 25, minWidth:25}} color='white' size={25}/>
          <ResponsiveText>
          <CustomText style={{marginLeft: 15}}>
            Signets
          </CustomText>

          </ResponsiveText>
        </MenuItem>
        <MenuItem onClick={() => handleNavigate('wallet')}>
        {pathname === "/wallet" &&
          <RouteSelector />}
          <IoWalletOutline style={{  minHeight: 29, minWidth:29}} color='white' size={30}/>
          <ResponsiveText>
          <CustomText style={{marginLeft: 15}}>
            Portefeuille
          </CustomText>

          </ResponsiveText>
        </MenuItem>
      </Container>
    </MainContainer>
  )
}

const MainContainer = styled.div`
  width: 20%;
  min-width: 15%;
  background-color: ${colors.dark.background};
  padding-top: 30px;
  border-left: 0.5px solid ${colors.lightDark};
  position: sticky;
  top: 0;
  height: 100%; // sets the maximum height to the view height
  overflow-y: auto; // enables scrolling within the container
`;


const Container = styled.div`
  display: flex;
  flex-direction: column;
`;


const ResponsiveText = styled.div`
  @media (max-width: 950px) {
    display: none;
  }
`;

const MenuItem = styled.div`
  display: flex;
  padding: 15px;
  align-items: center;
  margin-left: 15px;
  cursor: pointer;
  position: relative;
  @media (max-width: 950px) {
    justify-content: flex-end;
  }
`;


const RouteSelector = styled.div`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: ${colors.dark.primary};
  position: absolute;
  top: 50%;
  left: 0px;
`;
const Divider = styled.div`
  width: 100%;
  height: 0.5px;
  background-color: ${colors.dark.primary};
`;

export default Menu