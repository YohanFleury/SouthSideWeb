import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store, useAppDispatch, useAppSelector } from './redux/store';
import { HashRouter as Router } from 'react-router-dom';
import RoutesPath from './routes/RoutesPath';
import './App.css';
import Menu from './components/Menu/Menu';
import styled from 'styled-components';
import useApi from './hooks/useApi/useApi';
import users from './api/users';
import publications from './api/publications';
import { setCurrentUser, setFavoritesList, setLanguage, setSavedPublicationsList, setSubsList } from './redux/contextSlice/contextSlice';
import CreatePostModal from './components/CreatePostModal/CreatePostModal';

const RedDiv = styled.div`
  display: flex;
  justify-content: center;
  max-height: 100%;
  overflow: auto;
  `;

  function InnerApp() {
    const email = "tata@example.com"
    // Redux
    const dispatch = useAppDispatch()
    // API 
    const getUserByEmailApi = useApi(users.getUserByEmail)
    const getFavoritesListApi = useApi(users.getFavoritesList)
    const getSavedPublicationsApi = useApi(publications.getSavedPublications)
    const getSubscriptionsApi = useApi(users.getSubscriptions)

    // Effects
    useEffect(() => {
      getUserByEmailApi.request(email)
    }, [])

    useEffect(() => {
      console.log('Voici le user connecté : ', getUserByEmailApi.data)
      if (getUserByEmailApi.success) {
        dispatch(setCurrentUser(getUserByEmailApi.data))
        getFavoritesListApi.request(getUserByEmailApi.data.id)
        getSavedPublicationsApi.request(getUserByEmailApi.data.id)
        getSubscriptionsApi.request(getUserByEmailApi.data.id)

      } else if (getUserByEmailApi.error) {
      console.log('Problème pour récupérer les infos du user connecté.')
      }
  }, [getUserByEmailApi.success, getUserByEmailApi.error,])

  
  useEffect(() => {
    if(getSavedPublicationsApi.success) {
      dispatch(setSavedPublicationsList(getSavedPublicationsApi.data))
    } else if(getSavedPublicationsApi.error) {
      console.log('PROBLEME [Get Saved Publications]')
    }
  }, [getSavedPublicationsApi.success, getSavedPublicationsApi.error, getSavedPublicationsApi.data])
  
  useEffect(() => {
    if (getFavoritesListApi.success) {
      dispatch(setFavoritesList(getFavoritesListApi.data))
    } else if (getFavoritesListApi.error) {
      
    }
  }, [getFavoritesListApi.data, getFavoritesListApi.success, getFavoritesListApi.error])

  useEffect(() => {
    dispatch(setSubsList(getSubscriptionsApi.data.subscriptions))
  }, [getSubscriptionsApi.data])

  useEffect(() => {
    const language = navigator.language.split("-")[0]
    dispatch(setLanguage(language))
  }, [])

    return (
      <Router>
        <RedDiv>
          <Menu />
          <RoutesPath />
          <CreatePostModal />
        </RedDiv>
      </Router>
    );
  }

function App() {
  return (
  <Provider store={store}>  
    <InnerApp />
  </Provider>
  );
}

export default App;
