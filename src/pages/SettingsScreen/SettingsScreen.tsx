import React from 'react'
import styled from 'styled-components';
import { CustomHeader } from '../../components/CustomedComponents';
import colors from '../../config/colors';

const SettingsScreen = () => {
  return (
    <MainContainer>
        <CustomHeader title='Paramètres' />
    </MainContainer>
  )
}
const MainContainer = styled.div`
  background-color: ${colors.dark.background};
  display: flex;
  flex-direction: column;
  flex: 1;
  border-left: 0.5px solid ${colors.lightDark};
  border-right: 0.5px solid ${colors.lightDark};
  margin: auto;
  position: relative;
`;
export default SettingsScreen