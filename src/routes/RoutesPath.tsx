import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import ResearchPage from '../pages/ResearchPage/ResearchPage';
import NotificationsPage from '../pages/NotificationsPage/NotificationsPage';
import ChatListPage from '../pages/ChatListPage/ChatListPage';

const RoutesPath = () => (
  <div className='RoutesPath'>
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/research" element={<ResearchPage />} />
    <Route path="/notifications" element={<NotificationsPage />} />
    <Route path="/chat" element={<ChatListPage />} />
  </Routes>
  </div>
);

export default RoutesPath;
