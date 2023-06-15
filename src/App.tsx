import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { BrowserRouter as Router } from 'react-router-dom';
import RoutesPath from './routes/RoutesPath';
import './App.css';
import Menu from './components/Menu/Menu';
import styled from 'styled-components';

const RedDiv = styled.div`
  display: flex;
  background-color: red;
  height: 100%;
  flex-direction: row;
  max-width: 820px;  // ajustez cette valeur en fonction de vos besoins
  margin: auto;
`;

function App() {
  return (
  <Provider store={store}>  
    <Router>
      <RedDiv>
        <Menu />
        <RoutesPath />
      </RedDiv>
    </Router>
  </Provider>
  );
}

export default App;
