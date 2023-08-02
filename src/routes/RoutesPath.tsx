import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import ResearchPage from '../pages/ResearchPage/ResearchPage';
import NotificationsPage from '../pages/NotificationsPage/NotificationsPage';
import ChatListPage from '../pages/ChatListPage/ChatListPage';
import styled from 'styled-components';
import CreatorProfilPage from '../pages/CreatorProfilPage/CreatorProfilPage';
import PostDetail from '../components/PostDetail/PostDetail';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { setcloseModal } from '../redux/contextSlice/contextSlice'
import MyFavsPage from '../pages/MyFavsPage/MyFavsPage';
import MySubsPage from '../pages/MySubsPage/MySubsPage';
import MyBooksPage from '../pages/MyBooksPage/MyBooksPage';
import colors from '../config/colors';
import SettingsScreen from '../pages/SettingsScreen/SettingsScreen';


const RoutesPath = () => {
  const dispatch= useAppDispatch()
  const openModal = useAppSelector(state => state.context.openPublicationId)
  const handleCloseModal = () => {
    if (openModal) dispatch(setcloseModal())
    return
  }
  return (
  <MainContainer onClick={handleCloseModal} >
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/research" element={<ResearchPage />} />
    <Route path="/notifications" element={<NotificationsPage />} />
    <Route path="/chat" element={<ChatListPage />} />
    <Route path="/:username" element={<CreatorProfilPage />} />
    <Route path="/:username/post/:publicationId" element={<PostDetail />} />
    <Route path="/myfavs" element={<MyFavsPage />} />
    <Route path="/mysubs" element={<MySubsPage />} />
    <Route path="/mybooks" element={<MyBooksPage />} />
    <Route path="/settings" element={<SettingsScreen />} />
  </Routes>
  </MainContainer>
)};

const MainContainer = styled.div`
  display: flex; // établit un conteneur flex
  max-width: 680px;
  width: 100%;
  height: 100%;
  border-left: 0.2px solid ${colors.lightDark};
`;

export default RoutesPath;
