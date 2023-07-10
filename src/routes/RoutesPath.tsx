import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import ResearchPage from '../pages/ResearchPage/ResearchPage';
import NotificationsPage from '../pages/NotificationsPage/NotificationsPage';
import ChatListPage from '../pages/ChatListPage/ChatListPage';
import styled from 'styled-components';
import CreatorProfilPage from '../pages/CreatorProfilPage/CreatorProfilPage';
import PostDetail from '../components/PostDetail/PostDetail';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { setcloseModal } from '../redux/contextSlice/contextSlice'


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
  </Routes>
  </MainContainer>
)};

const MainContainer = styled.div`
  display: flex; // établit un conteneur flex
  max-width: 680px;
`;

export default RoutesPath;
